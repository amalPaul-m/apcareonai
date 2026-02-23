export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--accent)]/35 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-[var(--primary)] rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-[var(--primary)] font-medium animate-pulse">Analyzing Medicine...</p>
        </div>
    );
}
