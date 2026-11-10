import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, Building2, QrCode, Copy, Check, Loader2 } from 'lucide-react';
import { formatIDR } from '../data/watches';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  backendOnline,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'BCA Virtual Account',
  });

  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.watch.price_idr * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderPayload = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
      payment_method: formData.paymentMethod,
      items: cartItems.map((item) => ({
        watch_id: item.watch.id,
        name: item.watch.name,
        quantity: item.quantity,
        price_idr: item.watch.price_idr,
      })),
    };

    try {
      if (backendOnline) {
        // Send request to Rust backend
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });

        if (!res.ok) {
          throw new Error('Gagal menghubungi API Rust');
        }

        const data = await res.json();
        setOrderResult(data.data);
      } else {
        // Offline / Simulation fallback
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockOrderId = `NOCT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        setOrderResult({
          order_id: mockOrderId,
          customer_name: formData.name,
          customer_email: formData.email,
          items_count: cartItems.length,
          total_idr: totalAmount,
          payment_method: formData.paymentMethod,
          status: 'Terkonfirmasi (Mode Mandiri)',
          created_at: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          estimated_delivery: '3 - 5 Hari Kerja (Kurir Berasuransi Penuh)',
          message: `Pesanan Anda berhasil dicatat dengan ID ${mockOrderId}`,
        });
      }

      onClearCart();
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memproses pesanan. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOrder = () => {
    if (orderResult?.order_id) {
      navigator.clipboard.writeText(orderResult.order_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-2xl bg-[#12151b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-medium">
              Atelier Checkout
            </span>
            <h2 className="font-serif text-2xl font-medium text-white">
              {orderResult ? 'Konfirmasi Pemesanan' : 'Formulir Pemesanan Resmi'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {orderResult ? (
            /* Order Success Receipt View */
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-white font-medium">
                  Pesanan Terdaftar di Brankas Atelier
                </h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
                  Terima kasih, <strong className="text-gray-200">{orderResult.customer_name}</strong>. 
                  Sertifikat kepemilikan dan panduan pembayaran telah dikirimkan ke{' '}
                  <span className="text-[#c5a880]">{orderResult.customer_email}</span>.
                </p>
              </div>

              {/* Order Card Receipt */}
              <div className="bg-[#171b23] border border-white/10 rounded-xl p-5 text-left space-y-3 font-sans text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Nomor Pesanan / Pelacakan</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-[#e5cbab] font-bold">
                      {orderResult.order_id}
                    </span>
                    <button
                      onClick={handleCopyOrder}
                      className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Salin Nomor"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Metode Pembayaran</span>
                  <span className="text-white font-medium">{orderResult.payment_method}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Estimasi Pengiriman</span>
                  <span className="text-white font-medium">{orderResult.estimated_delivery}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>Status Verifikasi</span>
                  <span className="text-emerald-400 font-medium">{orderResult.status}</span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/10 text-sm font-semibold">
                  <span className="text-white">Total Nilai Pesanan</span>
                  <span className="font-mono text-[#e5cbab] text-base">
                    {formatIDR(orderResult.total_idr)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-[#c5a880] hover:bg-[#d4b992] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all"
                >
                  Selesai & Kembali ke Galeri
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order summary banner */}
              <div className="bg-[#171b23] border border-white/5 p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400">Ringkasan Koleksi ({cartItems.length} model):</span>
                  <div className="text-white font-medium mt-0.5 line-clamp-1">
                    {cartItems.map((i) => `${i.watch.name} (${i.quantity}x)`).join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400">Total:</span>
                  <div className="font-mono text-sm font-bold text-[#e5cbab]">
                    {formatIDR(totalAmount)}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-medium">
                  Informasi Penerima & Alamat
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nama Lengkap *</label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Alexander Prasetyo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#181d25] border border-white/10 focus:border-[#c5a880] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Email Resmi *</label>
                    <input
                      required
                      type="email"
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181d25] border border-white/10 focus:border-[#c5a880] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nomor WhatsApp / HP *</label>
                    <input
                      required
                      type="tel"
                      placeholder="0812-xxxx-xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181d25] border border-white/10 focus:border-[#c5a880] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Kota / Wilayah *</label>
                    <input
                      required
                      type="text"
                      placeholder="Jakarta Selatan"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#181d25] border border-white/10 focus:border-[#c5a880] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Alamat Lengkap Pengiriman *</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Nama Jalan, Nomor Gedung/Rumah, RT/RW, Kecamatan"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#181d25] border border-white/10 focus:border-[#c5a880] rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-medium">
                  Metode Pembayaran
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'BCA Virtual Account', icon: Building2, desc: 'Verifikasi Otomatis 24/7' },
                    { id: 'Kartu Kredit (Visa/Mastercard)', icon: CreditCard, desc: 'Cicilan 0% hingga 12 bln' },
                    { id: 'QRIS Instant Payment', icon: QrCode, desc: 'BCA, GoPay, Mandiri, OVO' },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = formData.paymentMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#c5a880]/10 border-[#c5a880] text-white'
                            : 'bg-[#181d25] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-[#c5a880]' : 'text-gray-400'}`} />
                          <span className="text-xs font-semibold">{method.id}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 mt-2">{method.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 bg-[#c5a880] hover:bg-[#d4b992] text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#c5a880]/15"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menghubungi Brankas Verifikasi...</span>
                    </>
                  ) : (
                    <span>Konfirmasi Pemesanan • {formatIDR(totalAmount)}</span>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>
                    {backendOnline ? 'Divalidasi langsung oleh Rust REST API (Axum)' : 'Mode Klien Cepat Aktif'}
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

