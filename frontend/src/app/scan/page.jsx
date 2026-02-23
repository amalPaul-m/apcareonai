'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import { useMedicine } from '@/context/MedicineContext';
import Link from 'next/link';

export default function ScanPage() {
    const router = useRouter();

    const [imagePreview, setImagePreview] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const { setMedicineData } = useMedicine();
    const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000')
        .replace(/\/api\/?$/, '')
        .replace(/\/$/, '');

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        processImage(file);
    };

    const processImage = async (file) => {
        setIsProcessing(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${apiBaseUrl}/api/scan`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                let backendError = '';
                try {
                    const payload = await response.json();
                    backendError = payload?.error || '';
                } catch {
                    backendError = '';
                }
                throw new Error(backendError || `Scan failed with status ${response.status}`);
            }

            const data = await response.json();
            setMedicineData(data);
            router.push('/results');
        } catch (error) {
            console.error('Error scanning medicine:', error);
            alert(error?.message || 'Failed to analyze image. Please try again.');
            setIsProcessing(false);
            setImagePreview(null);
        }
    };

    const triggerFileInput = (capture) => {
        if (fileInputRef.current) {
            if (capture) {
                fileInputRef.current.setAttribute('capture', capture);
            } else {
                fileInputRef.current.removeAttribute('capture');
            }
            fileInputRef.current.click();
        }
    };

    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-lg p-4 min-h-screen flex flex-col">
            <header className="flex items-center mb-6">
                <Link href="/" className="p-2 hover:bg-[var(--primary)]/10 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-[var(--foreground)]" />
                </Link>
                <h1 className="text-xl font-bold ml-4">Scan Medicine</h1>
            </header>

            <div className="flex-1 flex flex-col justify-center gap-6">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <Card className="p-8 flex flex-col items-center justify-center text-center gap-6 border-dashed border-2 border-[var(--primary)]/30 shadow-none bg-[var(--background)] hover:bg-[var(--accent)]/5 transition-colors cursor-pointer"
                    onClick={() => triggerFileInput('environment')}
                >
                    <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center text-[var(--primary)] mb-2">
                        <Camera className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">Take Photo</h3>
                        <p className="text-sm text-[var(--foreground)]/70 mt-1">Use your camera to scan medicine</p>
                    </div>
                </Card>

                <Card className="p-8 flex flex-col items-center justify-center text-center gap-6 border-dashed border-2 border-[var(--highlight)]/35 shadow-none bg-[var(--background)] hover:bg-[var(--highlight)]/5 transition-colors cursor-pointer"
                    onClick={() => triggerFileInput()}
                >
                    <div className="w-20 h-20 bg-[var(--highlight)]/12 rounded-full flex items-center justify-center text-[var(--highlight)] mb-2">
                        <Upload className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">Upload Image</h3>
                        <p className="text-sm text-[var(--foreground)]/70 mt-1">Select from gallery</p>
                    </div>
                </Card>

                {imagePreview && (
                    <Card className="p-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--accent)] mb-2">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Image selected - processing now</span>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Selected medicine" className="w-full rounded-xl object-cover max-h-64" />
                    </Card>
                )}
            </div>

            <p className="text-center text-sm text-[var(--foreground)]/55 mt-8 mb-4">
                Ensure the medicine name and text are clearly visible in the photo.
            </p>
        </div>
    );
}
