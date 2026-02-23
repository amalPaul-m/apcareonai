'use client';

import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/components/ui/Button';

export default function Home() {
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const disclaimerText = 'ഈ ആപ്പ് നൽകുന്ന വിവരങ്ങൾ വിദ്യാഭ്യാസ ആവശ്യങ്ങൾക്കായി മാത്രമാണ്. ഇത് മെഡിക്കൽ ഉപദേശം, രോഗനിർണ്ണയം, അല്ലെങ്കിൽ ചികിത്സയ്ക്ക് പകരമല്ല. മരുന്നുകളുമായി ബന്ധപ്പെട്ട തീരുമാനങ്ങൾ എടുക്കുന്നതിന് മുമ്പ് യോഗ്യനായ ഡോക്ടറെയോ ഫാർമസിസ്റ്റിനെയോ സമീപിക്കുക.';

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Identify Your <span className="text-[var(--primary)]">Medicine</span>
          </h1>
          <p className="text-[var(--foreground)]/70 text-base sm:text-lg">
            Scan any pill, bottle, or prescription to get detailed information instantly in English or Malayalam.
          </p>
        </div>

        <div className="grid gap-4 mt-8">
          <DefaultButton
            size="lg"
            className="w-full h-14 sm:h-16 text-lg sm:text-xl gap-3 shadow-[var(--primary)]/25"
            onClick={() => setShowDisclaimer(true)}
          >
            <Camera className="w-6 h-6" />
            Scan Medicine
          </DefaultButton>
        </div>

        <p className="text-xs text-[var(--foreground)]/50 mt-8">
          By using this app, you agree to our medical disclaimer. Results are for educational purposes only.
        </p>
      </motion.div>

      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--primary)]/15 bg-[var(--background)] p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">⚠️ ഡിസ്ക്ലൈമർ (Disclaimer)</h2>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/85 mb-6">{disclaimerText}</p>
            <div className="flex items-center justify-end gap-3">
              <DefaultButton variant="outline" size="sm" onClick={() => setShowDisclaimer(false)}>
                Cancel
              </DefaultButton>
              <DefaultButton
                size="sm"
                onClick={() => {
                  setShowDisclaimer(false);
                  router.push('/scan');
                }}
              >
                Accept
              </DefaultButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
