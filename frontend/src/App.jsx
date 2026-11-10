import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WatchCard from './components/WatchCard';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import { INITIAL_WATCHES, CATEGORIES } from './data/watches';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

export default function App() {
  const [watches, setWatches] = useState(INITIAL_WATCHES);
  const [backendOnline, setBackendOnline] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewWatch, setQuickViewWatch] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nocturne_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nocturne_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nocturne_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nocturne_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Check Rust backend status & fetch data
  const checkBackend = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        setBackendOnline(true);
        // Load data from Rust API
        const watchRes = await fetch('/api/watches');
        if (watchRes.ok) {
          const json = await watchRes.json();
          if (json.data && json.data.length > 0) {
            setWatches(json.data);
          }
        }
      } else {
        setBackendOnline(false);
      }
    } catch {
      setBackendOnline(false);
    }
  };

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  // Filter & Sort calculation
  const filteredWatches = useMemo(() => {
    let result = [...watches];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (w) => w.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.series.toLowerCase().includes(q) ||
          w.movement.toLowerCase().includes(q) ||
          w.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price_idr - b.price_idr);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price_idr - a.price_idr);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [watches, selectedCategory, searchQuery, sortBy]);

  // Cart actions
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAddToCart = (watch, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.watch.id === watch.id);
      if (existing) {
        return prev.map((item) =>
          item.watch.id === watch.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { watch, quantity: qty }];
    });
    showToast(`${watch.name} ditambahkan ke keranjang`);
  };

  const handleUpdateQty = (watchId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(watchId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.watch.id === watchId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (watchId) => {
    setCart((prev) => prev.filter((item) => item.watch.id !== watchId));
  };

  const handleToggleWishlist = (watchId) => {
    setWishlist((prev) =>
      prev.includes(watchId) ? prev.filter((id) => id !== watchId) : [...prev, watchId]
    );
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#f3f4f6] flex flex-col">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161a22] border border-[#c5a880]/40 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-[#c5a880] text-black flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        backendOnline={backendOnline}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero */}
      <Hero
        onExploreClick={() => {
          document.getElementById('koleksi')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Section */}
      <main id="koleksi" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Section Header & Filters */}
        <div className="space-y-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-medium">
                Koleksi Galeri
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                Katalog Mahakarya Waktu
              </h2>
            </div>

            {/* Sort & Filter controls */}
            <div className="flex items-center space-x-3">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#14171f] text-xs text-gray-200 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-[#c5a880]"
              >
                <option value="featured">Urutan Unggulan</option>
                <option value="price_asc">Harga: Terendah ke Tertinggi</option>
                <option value="price_desc">Harga: Tertinggi ke Terendah</option>
                <option value="rating">Rating Kepuasan</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#c5a880] text-black shadow-md shadow-[#c5a880]/20'
                      : 'bg-[#14171f] hover:bg-[#1b202a] text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Watch Grid */}
        {filteredWatches.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <h3 className="font-serif text-2xl text-white">Tidak ada jam tangan yang cocok</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Cobalah mengganti kata kunci pencarian atau memilih kategori koleksi yang lain.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 bg-[#181d25] border border-white/10 text-xs text-[#c5a880] rounded-full hover:bg-white/5"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredWatches.map((watch) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                onQuickView={(w) => setQuickViewWatch(w)}
                onAddToCart={(w) => handleAddToCart(w, 1)}
                isWishlisted={wishlist.includes(watch.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Brand Craftsmanship Pillars */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        watch={quickViewWatch}
        onClose={() => setQuickViewWatch(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Order Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onClearCart={() => setCart([])}
        backendOnline={backendOnline}
      />
    </div>
  );
}

