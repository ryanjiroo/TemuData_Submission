import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { laravelVersion, phpVersion } = usePage().props;

    return (
        <footer className="py-10 text-center text-sm text-[#F6F6F6] bg-[#161D6F]">
            Ryan Nugroho © {new Date().getFullYear()} - Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>
    );
}