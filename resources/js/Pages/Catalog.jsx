import React, { useState, useEffect } from 'react';
import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import { Head, router, usePage } from '@inertiajs/react';

const PlayIcon = () => (
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.071 3.292a1 1 0 00.95.69h3.461c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
    </svg>
);

function Catalog({ catalogs, auth }) {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(null);

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

    const handleAddToCart = (catalogToAdd) => {
        router.post(route('cart.add'), {
            catalog_id: catalogToAdd.id,
            quantity: 1,
        }, {
            onSuccess: () => {
                router.reload({
                    only: ['cartItemCount'],
                    onSuccess: () => {
                        console.log('Keranjang diperbarui di Navbar!');
                    }
                });
                console.log('Item berhasil ditambahkan ke keranjang!');
            },
            onError: (errors) => {
                console.error('Gagal menambahkan item ke keranjang:', errors);
                if (errors.message) {
                    setMessage({ type: 'error', text: errors.message });
                } else if (errors.catalog_id) {
                    setMessage({ type: 'error', text: 'Produk tidak valid.' });
                } else {
                    setMessage({ type: 'error', text: 'Terjadi kesalahan saat menambahkan item ke keranjang.' });
                }
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    if (!catalogs) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-700 bg-[#F6F6F6]">
                Memuat katalog...
            </div>
        );
    }

    return (
        <>
             <Head title="Catalog" />
            <div className="bg-[#F6F6F6] min-h-screen font-sans antialiased text-gray-900">
                <div className='bg-white'>
                    <Navbar auth={auth} />
                </div>

                <div className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center shadow-sm mb-10">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Apa yang akan Kamu Dapatkan?
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            Pada practice ini kamu akan mendapatkan pengalaman praktik mengolah data secara langsung dengan beragam studi kasus dan data yang disediakan
                        </p>
                    </div>
                </div>

                {message && (
                    <div className={`container mx-auto px-4 mb-4 p-3 rounded-md text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Data Science Practice</h2>

                    {catalogs.length === 0 ? (
                        <p className="text-center text-gray-600 mt-10">Belum ada katalog yang tersedia.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {catalogs.map((catalog) => (
                                <div
                                    key={catalog.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
                                >
                                    {catalog.file_url && (
                                        <div className="relative w-full h-48 overflow-hidden">
                                            <img
                                                src={catalog.file_url}
                                                alt={catalog.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white rounded-full px-2 py-1 text-xs font-semibold flex items-center">
                                                <PlayIcon />
                                            </div>
                                            <div className="absolute top-2 right-2 bg-white text-gray-700 rounded-full px-2 py-1 text-xs font-semibold flex items-center shadow-sm">
                                                <StarIcon />
                                                <span className="ml-1">4.5</span>
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button className="bg-white rounded-full p-3 text-[#161D6F] hover:bg-gray-100 transition-all duration-200 transform scale-0 group-hover:scale-100">
                                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                                            {catalog.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-3">
                                            {catalog.description ? catalog.description.substring(0, 100) + (catalog.description.length > 100 ? '...' : '') : ''}
                                        </p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <p className="text-2xl font-bold text-[#161D6F]">
                                                Rp {parseFloat(catalog.price).toLocaleString('id-ID')}
                                            </p>
                                            <button
                                                onClick={() => handleAddToCart(catalog)}
                                                className="bg-[#C7FFD8] text-[#161D6F] font-semibold rounded-full px-5 py-2 text-sm hover:bg-[#98DED9] transition duration-200 shadow-md"
                                            >
                                                Ambil Paket Ini
                                            </button>
                                        </div>
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

export default Catalog;
