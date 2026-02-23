'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
import AppLogo from '@/components/AppLogo';

function isStandaloneMode() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export default function Navbar() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        setIsInstalled(isStandaloneMode());

        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };

        const handleAppInstalled = () => {
            setInstallPrompt(null);
            setIsInstalled(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;

        installPrompt.prompt();
        await installPrompt.userChoice;
        setInstallPrompt(null);
    };

    const showInstallButton = Boolean(installPrompt) && !isInstalled;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--primary)]/15">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <AppLogo />
                    <span className="font-bold text-xl text-[var(--foreground)] tracking-tight">apcareon ai</span>
                </Link>

                <div className="flex items-center">
                    {showInstallButton && (
                        <button
                            type="button"
                            onClick={handleInstall}
                            className="inline-flex items-center gap-2 rounded-lg border border-[var(--primary)]/25 bg-[var(--accent)]/10 px-3 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--accent)]/20"
                        >
                            <Download size={16} />
                            Install
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
