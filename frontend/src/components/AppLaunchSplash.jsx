'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppLogo from '@/components/AppLogo';

export default function AppLaunchSplash() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 1300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--background)]"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: 'easeOut' }}
                        className="flex flex-col items-center gap-4"
                    >
                        <motion.div
                            animate={{ rotate: [0, -8, 0], scale: [1, 1.06, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.15 }}
                        >
                            <AppLogo size="w-20 h-20" iconSize={44} rounded="rounded-3xl" />
                        </motion.div>
                        <p className="text-sm font-semibold tracking-wide text-[var(--foreground)]/80">apcareon ai</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
