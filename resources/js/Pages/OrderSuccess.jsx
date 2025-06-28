import React, { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function OrderSuccess({ auth }) {
    const { orderId } = usePage().props;
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (orderId) {
            setMessage(`Pesanan Anda dengan nomor #${orderId} berhasil ditempatkan!`);
        } else {
            setMessage('Pesanan Anda berhasil ditempatkan!');
        }
    }, [orderId]);

    return (

        <>
            <Head title="Sukses" />
            <div className="bg-[#F6F6F6] min-h-screen font-sans antialiased text-gray-900">
                <div className='bg-white'>
                    <Navbar auth={auth} />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 text-center">
                    {/* Progress Stepper */}
                    <div className="flex justify-center items-center space-x-2 sm:space-x-4 mb-10">
                        {/* Step 1: Keranjang (Completed) */}
                        <div className="flex items-center text-[#161D6F] font-semibold">
                            <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.82-1.554l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                            </span>
                            Keranjang
                        </div>
                        <div className="h-0.5 w-8 sm:w-16 bg-[#161D6F]"></div> {/* Active line */}

                        {/* Step 2: Checkout (Completed) */}
                        <div className="flex items-center text-[#161D6F] font-semibold">
                            <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9a1 1 0 00-1 1v4a1 1 0 11-2 0v-4a1 1 0 10-2 0v4a1 1 0 11-2 0v-4a1 1 0 10-2 0v4a1 1 0 11-2 0v-4a1 1 0 10-2 0V9a1 1 0 00-1-1h14z" clipRule="evenodd" /></svg>
                            </span>
                            Checkout
                        </div>
                        <div className="h-0.5 w-8 sm:w-16 bg-[#161D6F]"></div> {/* Active line */}

                        {/* Step 3: Pesanan (Current/Completed) */}
                        <div className="flex items-center text-[#161D6F] font-semibold"> {/* Changed to active color */}
                            <span className="bg-[#161D6F] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2"> {/* Changed to active color */}
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3v.101a2.00 2.00 0 01.376.082l3 1A2 2 0 0116 8v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h.01a1 1 0 000-2H7zm3 0a1 1 0 000 2h.01a1 1 0 000-2H10zm3 0a1 1 0 000 2h.01a1 1 0 100-2H13zm0 3a1 1 0 100 2h.01a1 1 0 100-2H13z" clipRule="evenodd" /></svg>
                            </span>
                            Pesanan
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 lg:p-16 max-w-2xl mx-auto">
                        <svg className="mx-auto h-24 w-24 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#161D6F] mb-4">
                            Terima Kasih!
                        </h1>
                        <p className="text-lg text-gray-700 mb-6">
                            {message}
                        </p>
                        <p className="text-gray-600 mb-8">
                            Kami telah mengirimkan detail pesanan Anda ke email terdaftar.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link
                                href={route('catalogs')}
                                className="bg-[#161D6F] text-white font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200"
                            >
                                Lanjutkan Belanja
                            </Link>
                            <Link
                                href={route('orders')}
                                className="border border-[#161D6F] text-[#161D6F] font-semibold py-3 px-6 rounded-md hover:bg-[#C7FFD8] transition duration-200"
                            >
                                Lihat Pesanan Saya
                            </Link>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>

    );
}