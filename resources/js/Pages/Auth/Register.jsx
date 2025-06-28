import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <h2 className="text-2xl font-bold leading-9 tracking-tight text-[#161D6F] text-center mb-6">
                Daftar Akun Baru
            </h2>

            <form className="space-y-6" onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" className="block text-sm font-medium leading-6 text-[#161D6F]" />
                    <div className="mt-2">
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#98DED9] sm:text-sm sm:leading-6"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" className="block text-sm font-medium leading-6 text-[#161D6F]" />
                    <div className="mt-2">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#98DED9] sm:text-sm sm:leading-6"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="block text-sm font-medium leading-6 text-[#161D6F]" />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#98DED9] sm:text-sm sm:leading-6"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" className="block text-sm font-medium leading-6 text-[#161D6F]" />
                    </div>
                    <div className="mt-2">
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#98DED9] sm:text-sm sm:leading-6"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div>
                    <PrimaryButton
                        className="flex w-full justify-center rounded-md bg-[#98DED9] px-3 py-1.5 text-sm font-semibold leading-6 text-[#161D6F] shadow-sm hover:bg-[#C7FFD8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98DED9]"
                        disabled={processing}
                    >
                        Daftar
                    </PrimaryButton>
                </div>
            </form>

            {/* OR and Social Login Section */}

            <p className="mt-10 text-center text-sm text-gray-500">
                Sudah punya akun?{' '}
                <Link
                    href={route('login')}
                    className="font-semibold leading-6 text-[#98DED9] hover:text-[#C7FFD8]"
                >
                    Masuk di sini
                </Link>
            </p>
        </GuestLayout>
    );
}