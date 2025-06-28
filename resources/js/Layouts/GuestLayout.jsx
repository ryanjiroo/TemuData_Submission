import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F6F6F6] flex justify-center items-center p-4 sm:p-0">
            <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden min-h-[600px]">
                {/* Left Section: Form Content */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="mb-8 text-center">
                        <Link href="/">
                            <ApplicationLogo className="w-auto h-36 mx-auto text-[#161D6F]" />
                        </Link>
                    </div>
                    {children}
                </div>

                {/* Right Section: Abstract Design */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#98DED9] to-[#161D6F] justify-center items-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <circle cx="20" cy="80" r="15" fill="rgba(255,255,255,0.1)"></circle>
                            <circle cx="80" cy="20" r="20" fill="rgba(255,255,255,0.1)"></circle>
                            <rect x="10" y="10" width="30" height="30" rx="5" ry="5" fill="rgba(255,255,255,0.05)"></rect>
                            <rect x="60" y="60" width="35" height="35" rx="10" ry="10" fill="rgba(255,255,255,0.08)"></rect>
                        </svg>
                    </div>

                    <div className="relative z-10 text-white text-center">
                        <h2 className="text-4xl font-bold mb-4">Mulai Proyek Baru Anda.</h2>
                        <p className="text-lg opacity-80 mb-6">
                            Transformasi ide menjadi kenyataan dengan platform pengembangan terdepan.
                        </p>
                        <div className="flex justify-center space-x-6">
                            <svg className="w-12 h-12 text-[#C7FFD8]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 8a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1z"></path></svg>
                            <svg className="w-12 h-12 text-[#C7FFD8]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm10 2a1 1 0 00-1-1h-2a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1V7zM7 7a1 1 0 00-1-1H4a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1V7z"></path></svg>
                            <svg className="w-12 h-12 text-[#C7FFD8]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v2a1 1 0 102 0v-2a1 1 0 00-1-1z"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}