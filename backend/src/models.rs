use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Watch {
    pub id: u32,
    pub name: String,
    pub series: String,
    pub category: String,
    pub price_idr: u64,
    pub price_usd: u32,
    pub image_url: String,
    pub description: String,
    pub movement: String,
    pub case_diameter: String,
    pub thickness: String,
    pub water_resistance: String,
    pub power_reserve: String,
    pub dial_color: String,
    pub strap_material: String,
    pub in_stock: bool,
    pub badge: Option<String>,
    pub rating: f32,
    pub reviews_count: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Category {
    pub id: String,
    pub name: String,
    pub count: usize,
}

#[derive(Debug, Deserialize)]
pub struct WatchFilterQuery {
    pub category: Option<String>,
    pub search: Option<String>,
    pub sort: Option<String>, // "price_asc", "price_desc", "name", "rating"
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OrderItem {
    pub watch_id: u32,
    pub name: String,
    pub quantity: u32,
    pub price_idr: u64,
}

#[derive(Debug, Deserialize)]
pub struct CreateOrderRequest {
    pub customer_name: String,
    pub customer_email: String,
    pub customer_phone: String,
    pub shipping_address: String,
    pub payment_method: String,
    pub items: Vec<OrderItem>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OrderRecord {
    pub order_id: String,
    pub customer_name: String,
    pub customer_email: String,
    pub customer_phone: String,
    pub shipping_address: String,
    pub items: Vec<OrderItem>,
    pub total_idr: u64,
    pub payment_method: String,
    pub status: String,
    pub created_at: String,
    pub estimated_delivery: String,
}

#[derive(Debug, Serialize)]
pub struct OrderResponse {
    pub order_id: String,
    pub customer_name: String,
    pub customer_email: String,
    pub items_count: usize,
    pub total_idr: u64,
    pub payment_method: String,
    pub status: String,
    pub created_at: String,
    pub estimated_delivery: String,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Review {
    pub id: u32,
    pub watch_id: u32,
    pub author: String,
    pub city: String,
    pub rating: u8,
    pub comment: String,
    pub date: String,
    pub verified_purchase: bool,
}

#[derive(Debug, Deserialize)]
pub struct CreateReviewRequest {
    pub author: String,
    pub city: String,
    pub rating: u8,
    pub comment: String,
}

#[derive(Debug, Deserialize)]
pub struct NewsletterRequest {
    pub email: String,
}

#[derive(Debug, Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: T,
}
