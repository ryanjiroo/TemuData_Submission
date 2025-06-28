import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Cart({ auth }) {
    // Mengambil semua props dari usePage().props
    const { cartItems, subtotal, vat, total, flash } = usePage().props;

    const [checkoutMessage, setCheckoutMessage] = useState(null);
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    useEffect(() => {
        if (flash && flash.success) {
            setCheckoutMessage({ type: 'success', message: flash.success });
        } else if (flash && flash.error) {
            setCheckoutMessage({ type: 'error', message: flash.error });
        } else if (flash && flash.message) {
            setCheckoutMessage({ type: 'info', message: flash.message });
        } else if (flash && flash.errors && Object.keys(flash.errors).length > 0) {
            const validationErrors = Object.values(flash.errors).map(e => e[0]).join(', ');
            setCheckoutMessage({ type: 'error', message: `Validasi gagal: ${validationErrors}` });
        }

        const timer = setTimeout(() => setCheckoutMessage(null), 5000);
        return () => clearTimeout(timer);
    }, [flash]);

    const handleQuantityChange = (cartItemId, newQuantity) => {
        let updatedQuantity = parseInt(newQuantity);
        if (isNaN(updatedQuantity) || updatedQuantity < 1) {
            updatedQuantity = 1;
        }

        router.patch(route('cart.updateItem', cartItemId), {
            quantity: updatedQuantity
        }, {
            onSuccess: () => {
                // Inertia akan otomatis memuat ulang props terbaru setelah PATCH berhasil.
                // Tidak perlu manipulasi state lokal cartItems di sini.
            },
            onError: (errors) => {
                console.error('Gagal memperbarui kuantitas:', errors);
                if (errors.message) {
                    setCheckoutMessage({ type: 'error', message: errors.message });
                }
            },
            preserveScroll: true,
            // PENTING: Hapus preserveState: true agar komponen di-render ulang sepenuhnya
            // dengan props terbaru dari server.
            // preserveState: true, // <-- HAPUS BARIS INI
        });
    };

    const removeItem = (cartItemId) => {
        if (confirm('Apakah Anda yakin ingin menghapus item ini dari keranjang?')) {
            router.delete(route('cart.removeItem', cartItemId), {
                onSuccess: () => {
                    // Inertia akan otomatis memuat ulang props terbaru.
                },
                onError: (errors) => {
                    console.error('Gagal menghapus item:', errors);
                    if (errors.message) {
                        setCheckoutMessage({ type: 'error', message: errors.message });
                    }
                },
                preserveScroll: true,
                // PENTING: Hapus preserveState: true
                // preserveState: true, // <-- HAPUS BARIS INI
            });
        }
    };

    const clearCart = () => {
        if (confirm('Apakah Anda yakin ingin mengosongkan seluruh keranjang?')) {
            router.delete(route('cart.clear'), {
                onSuccess: () => {
                    // Inertia akan otomatis memuat ulang props terbaru.
                },
                onError: (errors) => {
                    console.error('Gagal mengosongkan keranjang:', errors);
                    if (errors.message) {
                        setCheckoutMessage({ type: 'error', message: errors.message });
                    }
                },
                preserveScroll: true,
                // PENTING: Hapus preserveState: true
                // preserveState: true, // <-- HAPUS BARIS INI
            });
        }
    };

    const handleCheckout = () => {
        if (!auth.user) {
            setCheckoutMessage({ type: 'error', message: 'Anda harus login untuk melanjutkan ke checkout.' });
            return;
        }
        if (!cartItems || cartItems.length === 0) { // Pastikan cartItems tidak null/undefined
            setCheckoutMessage({ type: 'error', message: 'Keranjang Anda kosong. Tambahkan item terlebih dahulu.' });
            return;
        }

        setIsProcessingCheckout(true);
        setCheckoutMessage(null);

        router.post(route('checkout'), {}, {
            onSuccess: (page) => {
                setIsProcessingCheckout(false);
            },
            onError: (errors) => {
                console.error('Checkout error:', errors);
                if (errors.message) {
                    setCheckoutMessage({ type: 'error', message: errors.message });
                } else if (errors.totalAmount) {
                    setCheckoutMessage({ type: 'error', message: errors.totalAmount[0] });
                } else {
                    setCheckoutMessage({ type: 'error', message: 'Terjadi kesalahan saat checkout.' });
                }
                setIsProcessingCheckout(false);
            },
            preserveScroll: true,
            // PENTING: Hapus preserveState: true
            // preserveState: true, // <-- HAPUS BARIS INI
        });
    };

    return (
        <>
            <div className="bg-[#F6F6F6] min-h-screen font-sans antialiased text-gray-900">
                <Head title="Keranjang Belanja" />
                <div className='bg-white'>
                    <Navbar auth={auth} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 lg:p-10">
                        {/* Progress Stepper */}
                        <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-10">
                            <div className="flex items-center text-[#161D6F] font-semibold">
                                <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.82-1.554l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                </span>
                                Keranjang
                            </div>
                            <div className="h-0.5 w-8 sm:w-16 bg-gray-300"></div>
                            <div className="flex items-center text-gray-500">
                                <span className="bg-gray-300 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9a1 1 0 00-1 1v4a1 1 0 11-2 0v-4a1 1 0 10-2 0v4a1 1 0 11-2 0v-4a1 1 0 10-2 0v4a1 1 0 11-2 0v-4a1 1 0 10-2 0V9a1 1 0 00-1-1h14z" clipRule="evenodd" /></svg>
                                </span>
                                Checkout
                            </div>
                            <div className="h-0.5 w-8 sm:w-16 bg-gray-300"></div>
                            <div className="flex items-center text-gray-500">
                                <span className="bg-gray-300 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3v.101a2.00 2.00 0 01.376.082l3 1A2 2 0 0116 8v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h.01a1 1 0 000-2H7zm3 0a1 1 0 000 2h.01a1 1 0 000-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm0 3a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>
                                </span>
                                Pesanan
                            </div>
                        </div>

                        {/* Pesan Checkout (Sukses/Gagal) */}
                        {checkoutMessage && (
                            <div className={`p-4 mb-4 rounded-md ${checkoutMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {checkoutMessage.message}
                            </div>
                        )}

                        {(!cartItems || cartItems.length === 0) ? (
                            <div className="text-center mt-48 mb-52">
                                <p className="text-gray-600 text-lg mb-4">Keranjang Anda kosong.</p>
                                <p className="text-gray-500">Tambahkan beberapa kursus dari <Link href={route('catalogs')} className="text-[#161D6F] hover:underline">katalog</Link>!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Kolom Kiri: Daftar Produk */}
                                <div className="lg:col-span-2">
                                    {/* Header Tabel */}
                                    <div className="flex justify-between items-center px-4 py-2 text-gray-500 font-semibold border-b border-gray-200">
                                        <span className="w-2/3">Produk</span>
                                        <span className="w-1/3 text-right">Total</span>
                                    </div>

                                    {/* Item-item Daftar Produk */}
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                                            {/* Detail Produk */}
                                            <div className="flex items-center space-x-4 w-2/3">
                                                {/* Pastikan item.catalog dan item.catalog.file_url ada */}
                                                {item.catalog && item.catalog.file_url && (
                                                    <img
                                                        src={item.catalog.file_url}
                                                        alt={item.catalog.title}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-gray-800">{item.catalog ? item.catalog.title : 'Item Tidak Dikenal'}</p>
                                                    <p className="text-sm text-gray-500">Rp {parseFloat(item.price).toLocaleString('id-ID')}</p>
                                                    {/* Tombol Hapus item individu */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-500 text-xs mt-1 self-start hover:underline"
                                                        title="Hapus item"
                                                        disabled={isProcessingCheckout}
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Kuantitas dan Total Item */}
                                            <div className="flex items-center justify-end space-x-4 w-1/3">
                                                {/* Kontrol Kuantitas */}
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                                                        disabled={isProcessingCheckout}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity || 1} // PENTING: Pastikan ini selalu mengambil dari props item.quantity
                                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        className="w-12 text-center border-l border-r border-gray-300 focus:outline-none text-gray-800"
                                                        min="1"
                                                        disabled={isProcessingCheckout}
                                                    />
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                                                        disabled={isProcessingCheckout}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {/* Total Harga Item */}
                                                <span className="font-semibold text-gray-900 w-24 text-right">
                                                    Rp {(parseFloat(item.price) * (item.quantity || 1)).toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Bantuan dan Kembali ke Belanja */}
                                    <div className="mt-8 flex justify-between items-center text-sm">
                                        <Link href={route('catalogs')} className="flex items-center text-gray-600 hover:text-gray-800 transition" disabled={isProcessingCheckout}>
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                            Kembali berbelanja
                                        </Link>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Ringkasan Pesanan */}
                                <div className="lg:col-span-1 bg-[#161D6F] rounded-lg p-6 md:p-8 text-white">
                                    <h2 className="text-xl font-bold mb-6">Ringkasan Pesanan</h2>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>PPN</span>
                                            <span>Rp {vat.toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>

                                    {/* Bagian Tambah Kupon */}
                                    <div className="bg-[#98DED9] bg-opacity-20 rounded-md p-4 mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-semibold">Tambah kupon</span>
                                            <button className="text-white hover:text-gray-200" title="Tambah Kupon" disabled={isProcessingCheckout}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m0 0l3-3m-3 3l3 3m6-1.5a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </button>
                                        </div>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                placeholder="Masukkan kode Anda"
                                                className="flex-grow bg-white bg-opacity-20 rounded-l-md px-3 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white"
                                                disabled={isProcessingCheckout}
                                            />
                                            <button className="bg-[#C7FFD8] text-[#161D6F] rounded-r-md px-4 py-2 hover:bg-[#98DED9] transition duration-200 flex items-center justify-center" title="Terapkan Kupon" disabled={isProcessingCheckout}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-xl font-bold border-t border-gray-700 pt-4">
                                        <span>Total</span>
                                        <span>Rp {total.toLocaleString('id-ID')}</span>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-[#C7FFD8] text-[#161D6F] font-semibold py-3 rounded-md mt-6 hover:bg-[#98DED9] transition duration-200 shadow-md"
                                        disabled={isProcessingCheckout || !cartItems || cartItems.length === 0}
                                    >
                                        {isProcessingCheckout ? 'Memproses...' : 'Lanjutkan ke Checkout'}
                                    </button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full border border-red-500 text-red-500 font-semibold py-2 rounded-md mt-3 hover:bg-red-500 hover:text-white transition duration-200"
                                        disabled={isProcessingCheckout}
                                    >
                                        Kosongkan Keranjang
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}