'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, AlertTriangle, ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useMedicine } from '@/context/MedicineContext';
import Link from 'next/link';

function InfoRow({ label, value }) {
    return (
        <div className="border-b border-[var(--primary)]/15 last:border-0 py-3">
            <dt className="text-sm font-medium text-[var(--foreground)]/70 mb-1">{label}</dt>
            <dd className="text-base text-[var(--foreground)] leading-relaxed">{value || '-'}</dd>
        </div>
    );
}

export default function ResultsPage() {
    const router = useRouter();
    const { medicineData, language, setLanguage } = useMedicine();

    useEffect(() => {
        if (!medicineData) {
            router.replace('/scan');
        }
    }, [medicineData, router]);

    if (!medicineData) return null;

    const data = language === 'ml' ? medicineData.malayalam_translation : medicineData;
    const t = {
        overview: language === 'en' ? 'Overview' : 'അവലോകനം',
        uses: language === 'en' ? 'Uses' : 'ഉപയോഗങ്ങൾ',
        dosage: language === 'en' ? 'Dosage' : 'ഡോസേജ്',
        manufacturer: language === 'en' ? 'Manufacturer' : 'നിർമാതാവ്',
        safety: language === 'en' ? 'Safety' : 'സുരക്ഷ',
        sideEffects: language === 'en' ? 'Side Effects' : 'പാർശ്വഫലങ്ങൾ',
        warnings: language === 'en' ? 'Warnings' : 'മുന്നറിയിപ്പുകൾ',
        interactions: language === 'en' ? 'Interactions' : 'ഇടപെടലുകൾ',
        storage: language === 'en' ? 'Storage' : 'സംഭരണം',
        rx: language === 'en' ? 'Prescription required' : 'ഡോക്ടറുടെ നിർദേശം ആവശ്യമാണ്',
        yes: language === 'en' ? 'Yes' : 'അതെ',
        no: language === 'en' ? 'No' : 'ഇല്ല',
        disclaimer: language === 'en'
            ? 'Warning: This information is AI-generated and may be inaccurate. Please consult a qualified doctor before taking any medicine.'
            : 'മുന്നറിയിപ്പ്: ഈ വിവരം AI സൃഷ്ടിച്ചതാണ്, തെറ്റുകൾ ഉണ്ടായേക്കാം. മരുന്ന് കഴിക്കുന്നതിന് മുമ്പ് ഡോക്ടറെ സമീപിക്കുക.'
    };

    return (
        <div className="container mx-auto max-w-lg p-4 min-h-screen pb-20">
            <header className="flex items-center justify-between mb-6 sticky top-0 bg-[var(--background)]/95 backdrop-blur z-10 py-2">
                <Link href="/scan" className="p-2 hover:bg-[var(--primary)]/10 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-[var(--foreground)]" />
                </Link>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant={language === 'en' ? 'primary' : 'outline'}
                        onClick={() => setLanguage('en')}
                    >
                        EN
                    </Button>
                    <Button
                        size="sm"
                        variant={language === 'ml' ? 'primary' : 'outline'}
                        onClick={() => setLanguage('ml')}
                    >
                        മലയാളം
                    </Button>
                </div>
            </header>

            <div className="space-y-6">
                <Card className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white border-none shadow-[var(--primary)]/30">
                    <div className="flex justify-between items-start gap-3">
                        <div>
                            <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-medium mb-2 backdrop-blur-sm">
                                {data.type}
                            </span>
                            <h1 className="text-2xl font-bold mb-1">{data.medicine_name}</h1>
                            <p className="text-white/80 text-sm">{data.generic_name}</p>
                        </div>
                        {medicineData.prescription_required && (
                            <div className="bg-[var(--highlight)]/25 p-2 rounded-lg backdrop-blur-sm border border-white/25" title={t.rx}>
                                <AlertTriangle className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[var(--primary)]" />
                        {t.overview}
                    </h2>
                    <dl>
                        <InfoRow label={t.uses} value={data.uses} />
                        <InfoRow label={t.dosage} value={data.dosage} />
                        <InfoRow label={t.manufacturer} value={data.manufacturer} />
                    </dl>
                </Card>

                <Card className="border-l-4 border-l-[var(--highlight)]">
                    <h2 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-[var(--highlight)]" />
                        {t.safety}
                    </h2>
                    <dl>
                        <InfoRow label={t.sideEffects} value={data.side_effects} />
                        <InfoRow label={t.warnings} value={data.warnings} />
                        <InfoRow label={t.interactions} value={data.interactions} />
                        <InfoRow label={t.storage} value={data.storage} />
                        <InfoRow
                            label={t.rx}
                            value={(language === 'ml'
                                ? medicineData.malayalam_translation.prescription_required
                                : medicineData.prescription_required) ? t.yes : t.no}
                        />
                    </dl>
                </Card>

                <div className="text-xs text-center text-[var(--foreground)]/70 px-4">
                    <p>{t.disclaimer}</p>
                </div>
            </div>
        </div>
    );
}
