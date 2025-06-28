import React, { useState, useEffect } from 'react';
import { Head,Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import axios from 'axios';

export default function OrderHistory({ auth }) {
    const { orders } = usePage().props;
    const [message, setMessage] = useState(null);

    const { flash } = usePage().props;
    useEffect(() => {
        if (flash && flash.success) {
            setMessage({ type: 'success', text: flash.success });
        } else if (flash && flash.error) {
            setMessage({ type: 'error', text: flash.error });
        } else if (flash && flash.message) {
            setMessage({ type: 'info', text: flash.message });
        } else if (flash && flash.errors && Object.keys(flash.errors).length > 0) {
            const validationErrors = Object.values(flash.errors).map(e => e[0]).join(', ');
            setMessage({ type: 'error', text: `Validasi gagal: ${validationErrors}` });
        }

        const timer = setTimeout(() => setMessage(null), 5000);
        return () => clearTimeout(timer);
    }, [flash]);

    const handleBuyAgain = async (catalogId, quantity) => {
        if (!window.confirm(`Apakah Anda yakin ingin menambahkan ${quantity} item ini kembali ke keranjang?`)) {
            return;
        }

        try {
            const response = await axios.post(route('api.reAddToCart'), {
                catalog_id: catalogId,
                quantity: quantity
            });
            setMessage({ type: 'success', text: response.data.message });
        } catch (error) {
            console.error('Gagal menambahkan kembali ke keranjang:', error);
            setMessage({ type: 'error', text: 'Gagal menambahkan kembali ke keranjang. Silakan coba lagi.' });
        } finally {
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <>
            <Head title="Riwayat Pesanan" />
            <div className="bg-[#F6F6F6] min-h-screen font-sans antialiased text-gray-900">
                <div className='bg-white'>
                    <Navbar auth={auth} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Pesanan</h1>
                    <p className="text-gray-600 mb-8">Periksa status pesanan terkini, kelola pengembalian, dan temukan produk serupa.</p>

                    {message && (
                        <div className={`p-4 mb-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    {orders && orders.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600 text-lg mb-4">Anda belum memiliki pesanan.</p>
                            <p className="text-gray-500">Mulai belanja dari <Link href={route('catalogs')} className="text-[#161D6F] hover:underline">katalog</Link> kami!</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {orders && orders.map((order) => (
                                <div key={order.id} className="bg-white rounded-lg shadow-sm">
                                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase">Nomor pesanan</p>
                                                <p className="mt-1 text-sm font-semibold text-gray-900">{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase">Tanggal ditempatkan</p>
                                                <p className="mt-1 text-sm font-semibold text-gray-900">{new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 uppercase">Jumlah total</p>
                                                <p className="mt-1 text-sm font-semibold text-gray-900">Rp {parseFloat(order.total_amount).toLocaleString('id-ID')}</p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161D6F]">Lihat Pesanan</button>
                                                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161D6F]">Lihat Faktur</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {order.items && order.items.map((item) => (
                                            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-b-0">
                                                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-gray-200">
                                                    {item.catalog && item.catalog.file_url ? (
                                                        <img
                                                            src={item.catalog.file_url}
                                                            alt={item.catalog.title}
                                                            className="w-full h-full object-cover object-center"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">Tidak Ada Gambar</div>
                                                    )}
                                                </div>
                                                <div className="ml-0 sm:ml-6 flex-1 mt-4 sm:mt-0">
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {item.catalog ? item.catalog.title : 'Produk Tidak Dikenal'}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.catalog && item.catalog.description ? item.catalog.description : 'Deskripsi tidak tersedia.'}
                                                    </p>
                                                    <p className="mt-2 text-sm font-medium text-gray-900">Rp {parseFloat(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                                    <div className="mt-4 flex items-center text-sm text-green-700">
                                                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                                        </svg>
                                                        Terkirim pada {new Date(order.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                </div>
                                                <div className="mt-4 sm:mt-0 flex flex-col space-y-2 sm:space-y-0 sm:space-x-3 sm:flex-row sm:items-center">
                                                    <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161D6F]">Lihat Produk</button>
                                                    <button
                                                        onClick={() => handleBuyAgain(item.catalog_id, item.quantity)}
                                                        className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#161D6F] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#161D6F]"
                                                    >
                                                        Beli Lagi
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
