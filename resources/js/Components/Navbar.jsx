import { Link, usePage } from '@inertiajs/react'; 
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';


export default function Navbar({ auth }) {
    const { props } = usePage(); 
    const cartItemCount = props.cartItemCount || 0;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <header className="flex justify-between items-center px-6 py-4 lg:px-10 text-[#161D6F] ">
            {/* Logo TemuDataku */}
            <Link href="/">
                <ApplicationLogo className="w-auto h-32 mx-auto text-[#98DED9]" />
            </Link>

            {/* Navigasi Utama */}
            <nav className="hidden md:flex space-x-8 uppercase">
                <Link href="/" className="hover:text-white">HOME</Link>
                <Link href="/catalogs" className="hover:text-white">CATALOG</Link>
            </nav>

            {/* Bagian Kanan Navigasi: Profil User / Login/Register */}
            <div className="flex items-center space-x-4">
                {/* Shopping Cart Icon dengan badge */}
                <Link href={route('cart')} className="text-[#161D6F] hover:text-white transition relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.183 1.71.707 1.71H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#98DED9] text-[#161D6F] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </Link>

                {auth.user ? (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 rounded-full px-3 py-2 text-[#161D6F] transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white uppercase"
                        >
                            {/* Icon Profil (Placeholder SVG) */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A11.952 11.952 0 0112 15c2.956 0 5.617.848 8.016 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{auth.user.name}</span> {/* Nama Pengguna */}
                            {/* Panah Dropdown */}
                            <svg className={`w-4 h-4 ml-1 transform transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-4 py-2 text-sm text-[#161D6F] hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <Link href={route('orders')} className="block px-4 py-2 text-sm text-[#161D6F] hover:bg-gray-100">
                                    Pesanan Saya
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-sm text-[#161D6F] hover:bg-gray-100"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <Link
                            href={route('login')}
                            className="rounded-full px-4 py-2 border-2 border-[#98DED9] text-[#98DED9] font-semibold transition hover:bg-white hover:text-[#161D6F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98DED9] uppercase"
                        >
                            LOGIN
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-full px-4 py-2 bg-[#98DED9] text-[#161D6F] font-semibold transition hover:bg-[#C7FFD8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98DED9] uppercase"
                        >
                            REGISTER
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}