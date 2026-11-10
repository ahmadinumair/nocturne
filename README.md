# ⌚ HORLOGERIE NOCTURNE — Toko Jam Tangan Minimalis & Elegan

Aplikasi web toko jam tangan mekanis mewah (*haute horlogerie*) dengan desain minimalis elegan bernuansa monokromatik abu-abu arang dan aksen emas sampanye (*champagne gold*), dibangun menggunakan **Rust (Axum)** di sisi backend dan **React** di sisi frontend.

---

## 🌟 Fitur Utama

- **Estetika Minimalis & Mewah**: Tipografi serif *Cormorant Garamond* berpadu dengan sans-serif modern *Plus Jakarta Sans*, tata letak bersih (*clean architectural grid*), dan animasi mikro yang halus.
- **Katalog Jam Tangan Lengkap**: 8 mahakarya horologi (Tourbillon, Chronograph, Diver 300M, Bauhaus Ultra-thin, GMT Traveler, Open Heart Guilloché) dengan spesifikasi teknis lengkap (kaliber mesin, diameter, ketebalan, daya cadangan, material kaca safir, ketahanan air).
- **Pencarian & Penyaringan Interaktif**: Filter berdasarkan kategori koleksi, sortir harga (terendah/tertinggi) dan rating, serta live search.
- **Modal Spesifikasi Cepat (Quick View)**: Tampilan visual beresolusi tinggi, rincian teknis, dan pemilihan kuantitas langsung.
- **Peti Belanja (Cart Drawer Slide-over)**: Panel keranjang mengambang dari sisi kanan dengan kalkulasi otomatis subtotal dan status asuransi brankas gratis.
- **Formulir Checkout & Pelacakan**: Pilihan metode pembayaran (BCA, Mandiri, Kartu Kredit, QRIS Instant) yang terhubung langsung ke REST API Rust untuk mencetak tanda terima pesanan resmi dengan kode pelacakan unik (`NOCT-XXXXXX`).
- **Indikator Status Rust API**: Indikator otomatis yang mendeteksi apakah backend Rust sedang aktif di port 8080. Jika belum dijalankan, website secara mulus beralih ke *Client Simulation Mode* sehingga seluruh fungsionalitas tetap 100% dapat dicoba langsung.

---

## 📂 Struktur Proyek

```
reactrust/
├── index.html              # Pratinjau langsung mandiri (Klik ganda untuk membuka di browser)
├── open-preview.bat        # Skrip instan untuk membuka website di browser
├── run-frontend.bat        # Skrip otomatis untuk menjalankan React Vite Server
├── run-backend.bat         # Skrip otomatis untuk menjalankan Rust Axum Backend
│
├── backend/                # Layanan REST API Rust (Axum)
│   ├── Cargo.toml          # Dependensi Rust: axum, tokio, serde, tower-http, uuid, chrono
│   └── src/
│       ├── main.rs         # Router API, CORS middleware, listener port 8080
│       ├── models.rs       # Definisi struct Watch, Category, Order, API Response
│       └── data.rs         # Data awal katalog jam tangan dan kategori
│
└── frontend/               # Aplikasi Modern React + Vite
    ├── package.json        # Dependensi npm: react, react-dom, lucide-react, vite
    ├── vite.config.js      # Konfigurasi Vite & proxy ke http://localhost:8080
    ├── index.html          # Template HTML Vite
    └── src/
        ├── main.jsx        # Titik masuk React
        ├── App.jsx         # State global, filter, keranjang, sinkronisasi API
        ├── index.css       # Desain tema gelap, font, dan glassmorphism
        ├── data/
        │   └── watches.js  # Data seed dan fungsi format mata uang Rupiah/USD
        └── components/
            ├── Navbar.jsx          # Navigasi, status Rust API, wishlist & cart badge
            ├── Hero.jsx            # Banner visual editorial luxury
            ├── WatchCard.jsx       # Kartu produk dengan efek hover dan tombol aksi
            ├── QuickViewModal.jsx  # Modal rincian spesifikasi teknis kaliber
            ├── CartDrawer.jsx      # Panel laci keranjang belanja geser
            ├── CheckoutModal.jsx   # Formulir pemesanan & nota bukti transaksi
            ├── FeaturesSection.jsx # 4 pilar standar Haute Horlogerie
            └── Footer.jsx          # Informasi atelier, buletin jurnal, & hak cipta
```

---

## 🚀 Cara Menjalankan

### Cara 1: Buka Langsung (Paling Cepat / Zero Setup)
1. Cukup klik ganda file **`open-preview.bat`** atau buka file **`index.html`** langsung di browser Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).
2. Website langsung tampil dengan seluruh animasi, filter, pencarian, keranjang, dan formulir checkout yang sudah berfungsi penuh!

---

### Cara 2: Menjalankan Frontend React (Vite)
Pastikan Node.js sudah terpasang di komputer Anda:
```bash
# Buka folder frontend
cd frontend

# Pasang dependensi
npm install

# Jalankan server pengembangan Vite
npm run dev
```
Buka browser pada alamat: **`http://localhost:5173`**

---

### Cara 3: Menjalankan Backend Rust (Axum)
Jika Rust sudah terpasang (dapat dicek dengan `cargo --version`):
```bash
# Buka folder backend
cd backend

# Kompilasi dan jalankan server
cargo run
```
Server Rust akan berjalan di **`http://localhost:8080`**.

> **Tips Instalasi Rust:** Jika komputer Anda belum memiliki Rust, Anda dapat menginstalnya dengan mudah melalui [https://rustup.rs](https://rustup.rs) atau via terminal PowerShell:
> ```powershell
> winget install Rustlang.Rustup
> ```

---

## 🔌 Dokumentasi REST API Rust

| Metode | Rute Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/api/health` | Pemeriksaan kesehatan server dan status runtime |
| `GET` | `/api/watches` | Mengambil seluruh katalog (mendukung parameter `?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/watches/:id` | Mengambil data detail 1 model jam berdasarkan ID |
| `GET` | `/api/categories` | Mengambil daftar kategori beserta jumlah modelnya |
| `POST` | `/api/orders` | Membuat pesanan baru, menghitung total nilai, dan menghasilkan nomor pelacakan unik |

### Contoh Request Pemesanan (`POST /api/orders`):
```json
{
  "customer_name": "Alexander Pratama",
  "customer_email": "alexander@domain.com",
  "customer_phone": "081234567890",
  "shipping_address": "Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan",
  "payment_method": "BCA Virtual Account",
  "items": [
    {
      "watch_id": 1,
      "name": "Nocturne Chronographe 01",
      "quantity": 1,
      "price_idr": 28500000
    }
  ]
}
```

---

Dibuat dengan dedikasi terhadap presisi, elegansi, dan performa tinggi.

