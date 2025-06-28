import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />

            <div className="relative min-h-screen bg-gray-100 font-sans antialiased text-gray-900">
                <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://raw.githubusercontent.com/ryanjiroo/TemuData_Submission/refs/heads/main/public/images/works.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>

                    <div className="relative z-10 flex flex-col h-full">
                        <Navbar auth={auth} />

                        <div className="flex-1 flex flex-col justify-center items-center text-center text-white p-6">
                            <p className="text-xl md:text-2xl mb-4">
                                Bosan Belajar Data Science Sendirian?
                            </p>
                            <h1 className="text-5xl md:text-7xl font-playfair-display font-bold mb-8">
                                Yuk, Temu Mentor di TemuDataku!
                            </h1>
                            <Link href="/catalogs" className="bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition duration-300">
                                Coba Sekarang
                            </Link>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F6F6F6] py-20 px-6 sm:px-10 lg:px-20">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <p className="text-[#161D6F] font-semibold mb-2">Belajar lebih efektif & latihan langsung dari ahlinya</p>
                            <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-[#161D6F] mb-6">
                                Terbaik dalam Mentoring Data Science
                            </h2>
                            <p className="mt-16 text-gray-700 leading-relaxed">
                                Dapatkan bimbingan langsung dari mentor berpengalaman untuk menjawab semua keraguanmu dalam belajar data science. Khusus untuk kamu yang belajar secara otodidak, kami menyediakan sesi mentoring 1-on-1 maupun kelompok yang fleksibel dan disesuaikan dengan kebutuhanmu. Kamu bisa berdiskusi langsung tentang topik yang sulit, mendapatkan feedback atas progres belajarmu, serta diarahkan membangun portofolio yang relevan. Dengan biaya yang lebih terjangkau dibandingkan bootcamp, mentoring ini adalah solusi efektif dan hemat untuk membantumu berkembang. Kamu juga akan mendapat akses ke komunitas belajar, materi tambahan, dan studi kasus nyata untuk memperkuat pemahaman dan kepercayaan dirimu.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-[#C7FFD8] rounded-lg overflow-hidden shadow-md">
                                <img
                                    src="https://raw.githubusercontent.com/ryanjiroo/TemuData_Submission/refs/heads/main/public/images/teamlearning.jpg"
                                    alt="Team Learning"
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-3xl font-bold text-[#161D6F]">1.5</h3>
                                    <p className="text-gray-600">Years Experience</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-3xl font-bold text-[#161D6F]">23</h3>
                                    <p className="text-gray-600">Project Challenge</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-3xl font-bold text-[#161D6F]">830+</h3>
                                    <p className="text-gray-600">Positive Reviews</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <h3 className="text-3xl font-bold text-[#161D6F]">100K</h3>
                                    <p className="text-gray-600">Trusted Students</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
