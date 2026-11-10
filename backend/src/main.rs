use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use std::net::SocketAddr;
use std::sync::{Arc, RwLock};
use tower_http::cors::{Any, CorsLayer};
use uuid::Uuid;

mod data;
mod models;

use models::{
    ApiResponse, Category, CreateOrderRequest, OrderResponse, Watch, WatchFilterQuery,
};

#[derive(Clone)]
struct AppState {
    watches: Arc<RwLock<Vec<Watch>>>,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let initial_watches = data::get_seed_watches();
    let state = AppState {
        watches: Arc::new(RwLock::new(initial_watches)),
    };

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/health", get(health_check))
        .route("/api/watches", get(get_watches))
        .route("/api/watches/:id", get(get_watch_by_id))
        .route("/api/categories", get(get_categories))
        .route("/api/orders", post(create_order))
        .layer(cors)
        .with_state(state);

    let port = 8080;
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("-----------------------------------------------------------");
    println!("  HORLOGERIE NOCTURNE - Rust Backend Service");
    println!("  Status: Running on http://localhost:{}", port);
    println!("  Endpoints:");
    println!("    GET  /api/health");
    println!("    GET  /api/watches (supports ?category=&search=&sort=)");
    println!("    GET  /api/watches/:id");
    println!("    GET  /api/categories");
    println!("    POST /api/orders");
    println!("-----------------------------------------------------------");

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Gagal mengikat port 8080");

    axum::serve(listener, app).await.expect("Server gagal berjalan");
}

async fn health_check() -> impl IntoResponse {
    Json(ApiResponse {
        success: true,
        message: "Rust Axum Watch Store API is online and healthy".to_string(),
        data: serde_json::json!({
            "service": "watch-store-backend",
            "version": "0.1.0",
            "runtime": "Rust / Axum",
            "uptime": "active"
        }),
    })
}

async fn get_watches(
    State(state): State<AppState>,
    Query(query): Query<WatchFilterQuery>,
) -> impl IntoResponse {
    let watches_lock = state.watches.read().unwrap();
    let mut results: Vec<Watch> = watches_lock.clone();

    // Category filter
    if let Some(cat) = query.category {
        if !cat.is_empty() && cat != "all" {
            results.retain(|w| w.category.eq_ignore_ascii_case(&cat));
        }
    }

    // Search filter
    if let Some(search) = query.search {
        let needle = search.trim().to_lowercase();
        if !needle.is_empty() {
            results.retain(|w| {
                w.name.to_lowercase().contains(&needle)
                    || w.series.to_lowercase().contains(&needle)
                    || w.movement.to_lowercase().contains(&needle)
                    || w.category.to_lowercase().contains(&needle)
            });
        }
    }

    // Sort
    if let Some(sort_by) = query.sort {
        match sort_by.as_str() {
            "price_asc" => results.sort_by_key(|w| w.price_idr),
            "price_desc" => results.sort_by_key(|w| std::cmp::Reverse(w.price_idr)),
            "rating" => results.sort_by(|a, b| b.rating.partial_cmp(&a.rating).unwrap()),
            "name" => results.sort_by(|a, b| a.name.cmp(&b.name)),
            _ => {}
        }
    }

    Json(ApiResponse {
        success: true,
        message: format!("Berhasil mengambil {} produk jam tangan", results.len()),
        data: results,
    })
}

async fn get_watch_by_id(
    State(state): State<AppState>,
    Path(id): Path<u32>,
) -> Result<Json<ApiResponse<Watch>>, (StatusCode, Json<serde_json::Value>)> {
    let watches_lock = state.watches.read().unwrap();
    let found = watches_lock.iter().find(|w| w.id == id).cloned();

    match found {
        Some(watch) => Ok(Json(ApiResponse {
            success: true,
            message: "Produk ditemukan".to_string(),
            data: watch,
        })),
        None => Err((
            StatusCode::NOT_FOUND,
            Json(serde_json::json!({
                "success": false,
                "message": format!("Jam tangan dengan ID {} tidak ditemukan", id),
            })),
        )),
    }
}

async fn get_categories(State(state): State<AppState>) -> impl IntoResponse {
    let watches_lock = state.watches.read().unwrap();
    let categories: Vec<Category> = data::get_seed_categories(&watches_lock);

    Json(ApiResponse {
        success: true,
        message: "Kategori berhasil dimuat".to_string(),
        data: categories,
    })
}

async fn create_order(
    State(state): State<AppState>,
    Json(payload): Json<CreateOrderRequest>,
) -> Result<Json<ApiResponse<OrderResponse>>, (StatusCode, Json<serde_json::Value>)> {
    if payload.items.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(serde_json::json!({
                "success": false,
                "message": "Keranjang belanja tidak boleh kosong"
            })),
        ));
    }

    let watches_lock = state.watches.read().unwrap();
    let mut total_calculated: u64 = 0;

    for item in &payload.items {
        if let Some(watch) = watches_lock.iter().find(|w| w.id == item.watch_id) {
            total_calculated += watch.price_idr * (item.quantity as u64);
        } else {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(serde_json::json!({
                    "success": false,
                    "message": format!("Item dengan ID {} tidak valid", item.watch_id)
                })),
            ));
        }
    }

    let order_id = format!("NOCT-{}", Uuid::new_v4().to_string()[..8].to_uppercase());
    let now = chrono::Utc::now().format("%d %B %Y, %H:%M WIB").to_string();
    let estimated_delivery = "3 - 5 Hari Kerja (Kurir Berasuransi Penuh)".to_string();

    let response = OrderResponse {
        order_id: order_id.clone(),
        customer_name: payload.customer_name,
        customer_email: payload.customer_email,
        items_count: payload.items.len(),
        total_idr: total_calculated,
        payment_method: payload.payment_method,
        status: "Terkonfirmasi & Dalam Penyiapan Brankas".to_string(),
        created_at: now,
        estimated_delivery,
        message: format!(
            "Terima kasih atas pesanan Anda. Nomor pelacakan pesanan Anda adalah {}",
            order_id
        ),
    };

    Ok(Json(ApiResponse {
        success: true,
        message: "Pesanan berhasil dibuat dan diverifikasi oleh sistem".to_string(),
        data: response,
    }))
}

