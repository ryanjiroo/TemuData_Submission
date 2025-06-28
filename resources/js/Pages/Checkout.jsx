import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import axios from 'axios';

export default function Checkout({ auth }) {
    const { cartItems, subtotal, vat, total, user } = usePage().props;

    const handleConfirmOrder = async () => {
        try {
            const response = await axios.post(route('process.order'));
            if (response.data.orderId) {
                router.visit(route('order.success', { orderId: response.data.orderId }));
            }
        } catch (error) {
            console.error('Failed to confirm order:', error);
            alert('Gagal memproses pesanan. Silakan coba lagi.');
        }
    };

    return (
        <>
            <Head title="Checkout" />
            <div className='bg-white'>

            </div>
            <Navbar auth={auth} />
            <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-900 flex flex-col items-center">

                <div className="w-full max-w-4xl bg-white shadow-lg my-10 p-8 rounded-lg">
                    {/* Progress Stepper (Tetap seperti sebelumnya atau sesuaikan jika diinginkan) */}
                    <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-10">
                        <div className="flex items-center text-[#161D6F] font-semibold">
                            <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.82-1.554l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                            </span>
                            Keranjang
                        </div>
                        <div className="h-0.5 w-8 sm:w-16 bg-[#161D6F]"></div>
                        <div className="flex items-center text-[#161D6F] font-semibold">
                            <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
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

                    {/* Bagian Invoice Utama */}
                    <div className="flex">
                        {/* Kotak INVOICE Merah Muda */}
                        <div className="bg-[#161D6F] w-40 flex justify-center items-start pt-10">
                            <span className="text-white text-xl font-bold uppercase tracking-wider">INVOICE</span>
                        </div>

                        {/* Konten Utama Invoice */}
                        <div className="flex-1 p-8">
                            {/* Nomor Resi & Tanggal */}
                            <div className="text-right text-gray-500 text-sm mb-10">
                                Resi #01234 - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>

                            {/* Bagian Prepared For & Payment To */}
                            <div className="grid grid-cols-2 gap-8 mb-16">
                                <div>
                                    <p className="text-sm font-semibold uppercase text-[#161D6F] mb-2">PREPARED FOR</p>
                                    <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold uppercase text-[#161D6F] mb-2">PAYMENT TO</p>
                                    <p className="text-lg font-semibold text-gray-800">TemuDataku Shop</p> {/* Anda bisa mengganti ini */}
                                    <p className="text-gray-600">temudataku@example.com</p> {/* Dan ini */}
                                </div>
                            </div>

                            {/* Tabel Item */}
                            <div className="mb-10">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b border-gray-300">
                                            <th className="py-2 text-left text-xs font-semibold uppercase text-gray-500">DESCRIPTION</th>
                                            <th className="py-2 text-right text-xs font-semibold uppercase text-gray-500 w-20">QTY</th>
                                            <th className="py-2 text-right text-xs font-semibold uppercase text-gray-500 w-24">PRICE</th>
                                            <th className="py-2 text-right text-xs font-semibold uppercase text-gray-500 w-28">SUBTOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                                                <td className="py-3 text-sm text-gray-700">
                                                    {item.catalog ? item.catalog.title : 'Produk Tidak Dikenal'}
                                                    {/* Tambahkan deskripsi jika ada di item.catalog */}
                                                    {item.catalog && item.catalog.description && (
                                                        <p className="text-xs text-gray-500">{item.catalog.description}</p>
                                                    )}
                                                </td>
                                                <td className="py-3 text-right text-sm text-gray-700">{item.quantity}</td>
                                                <td className="py-3 text-right text-sm text-gray-700">Rp {parseFloat(item.price).toLocaleString('id-ID')}</td>
                                                <td className="py-3 text-right text-sm text-gray-700">Rp {parseFloat(item.price * item.quantity).toLocaleString('id-ID')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Ringkasan Total */}
                            <div className="flex justify-end">
                                <div className="w-full sm:w-1/2 md:w-2/5">
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-sm text-gray-700">SUBTOTAL</span>
                                        <span className="text-sm text-gray-900 font-semibold">Rp {parseFloat(subtotal).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-sm text-gray-700">PPN (10%)</span>
                                        <span className="text-sm text-gray-900 font-semibold">Rp {parseFloat(vat).toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-base font-semibold text-gray-800">TOTAL</span>
                                        <span className="text-base font-bold text-[#161D6F]">Rp {parseFloat(total).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Konfirmasi Pesanan */}
                            <div className="flex justify-end mt-10">
                                <button
                                    onClick={handleConfirmOrder}
                                    className="bg-[#161D6F] text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-90 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#161D6F] focus:ring-opacity-50"
                                >
                                    Konfirmasi Pesanan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </>

    );
}