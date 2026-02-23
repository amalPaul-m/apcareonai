import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = forwardRef(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={twMerge(
                    clsx(
                        'rounded-2xl border border-[var(--primary)]/15 bg-[var(--background)] shadow-xl shadow-[var(--primary)]/10 p-6',
                        className
                    )
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';

export default Card;
