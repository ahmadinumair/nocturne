import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Shield } from 'lucide-react';
import { formatIDR } from '../data/watches';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.watch.price_idr * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#12151b] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
              <h2 className="font-serif text-xl font-medium text-white">
                Peti Koleksi Anda
              </h2>
              <span className="text-xs text-gray-400 font-mono">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} item)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400 py-12">
                <div className="w-16 h-16 rounded-full bg-[#181d25] border border-white/5 flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white">Keranjang Kosong</h3>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">
                    Anda belum memilih mahakarya untuk dimasukkan ke dalam daftar pemesanan.
                  </p>
                </div>
              </div>
            ) : (
              cartItems.map(({ watch, quantity }) => (
                <div
                  key={watch.id}
                  className="flex space-x-4 p-3.5 rounded-xl bg-[#171b23] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <img
                    src={watch.image_url}
                    alt={watch.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#0b0d10] border border-white/5 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-medium text-white line-clamp-1">
                          {watch.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(watch.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">
                        {watch.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-white/10 rounded bg-[#101319]">
                        <button
                          onClick={() => onUpdateQty(watch.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-xs text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(watch.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-[#e5cbab]">
                        {formatIDR(watch.price_idr * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0f1217] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-gray-200">{formatIDR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Pengiriman Kurir Brankas</span>
                  <span className="text-[#c5a880] font-medium">GRATIS BERASURANSI</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span>Total Investasi</span>
                  <span className="font-mono text-[#e5cbab] text-base">
                    {formatIDR(subtotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full py-3.5 px-4 bg-[#c5a880] hover:bg-[#d4b992] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#c5a880]/15"
              >
                <span>Lanjut ke Formulir Pemesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                <Shield className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Transaksi Terenkripsi 256-bit & Bergaransi Resmi</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

