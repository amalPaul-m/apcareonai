import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    clsx(
                        'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--highlight)] disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-transform duration-100',
                        {
                            'bg-[var(--primary)] text-white hover:bg-[var(--highlight)] shadow-lg shadow-[var(--primary)]/20': variant === 'primary',
                            'bg-[var(--background)] text-[var(--foreground)] border border-[var(--primary)]/20 hover:bg-[var(--primary)]/5': variant === 'secondary',
                            'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10': variant === 'outline',
                            'hover:bg-[var(--primary)]/10 text-[var(--foreground)]': variant === 'ghost',
                            'h-9 px-4 text-sm': size === 'sm',
                            'h-12 px-6 text-base': size === 'md',
                            'h-14 px-8 text-lg': size === 'lg',
                            'h-12 w-12': size === 'icon',
                        },
                        className
                    )
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export default Button;
