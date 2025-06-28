import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-[#C7FFD8]">
                    {status}
                </div>
            )}

            <h2 className="text-2xl font-bold leading-9 tracking-tight text-[#161D6F] text-center mb-6">
                Masuk ke akun Anda
            </h2>

            <form className="space-y-6" onSubmit={submit}>
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
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="block text-sm font-medium leading-6 text-[#161D6F]" />
                        {canResetPassword && (
                            <div className="text-sm">
                                <Link
                                    href={route('password.request')}
                                    className="font-semibold text-[#98DED9] hover:text-[#C7FFD8]"
                                >
                                    Lupa kata sandi?
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="mt-2">
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#98DED9] sm:text-sm sm:leading-6"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2 text-red-500" />
                    </div>
                </div>

                <div className="flex items-center">
                    <Checkbox
                        id="remember-me"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-[#98DED9] focus:ring-[#98DED9]"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#161D6F]">
                        Ingat saya
                    </label>
                </div>

                <div>
                    <PrimaryButton
                        className="flex w-full justify-center rounded-md bg-[#98DED9] px-3 py-1.5 text-sm font-semibold leading-6 text-[#161D6F] shadow-sm hover:bg-[#C7FFD8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98DED9]"
                        disabled={processing}
                    >
                        Login
                    </PrimaryButton>
                </div>
            </form>

            {/* OR and Social Login Section */}

            <p className="mt-10 text-center text-sm text-gray-500">
                Belum punya akun?{' '}
                <Link
                    href={route('register')}
                    className="font-semibold leading-6 text-[#98DED9] hover:text-[#C7FFD8]"
                >
                    Daftar di sini
                </Link>
            </p>
        </GuestLayout>
    );
}