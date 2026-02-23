'use client';

import { Pill } from 'lucide-react';

export default function AppLogo({ size = 'w-8 h-8', iconSize = 20, rounded = 'rounded-lg' }) {
    return (
        <div className={`${size} bg-[var(--primary)] ${rounded} flex items-center justify-center text-white`}>
            <Pill size={iconSize} />
        </div>
    );
}
