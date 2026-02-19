interface CardChipProps {
    className?: string;
}

export function CardChip({ className = "" }: CardChipProps) {
    return (
        <svg
            viewBox="0 0 60 45"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* chip base */}
            <rect
                x="1"
                y="1"
                width="58"
                height="43"
                rx="6"
                fill="url(#goldGradient)"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="1"
            />

            {/* vertical lines */}
            <path d="M15 6 V39" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <path d="M30 6 V39" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <path d="M45 6 V39" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />

            {/* horizontal lines */}
            <path d="M6 15 H54" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            <path d="M6 30 H54" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />

            {/* gradient */}
            <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="60" y2="45">
                    <stop offset="0%" stopColor="#f7d774" />
                    <stop offset="50%" stopColor="#e6b93d" />
                    <stop offset="100%" stopColor="#c9971a" />
                </linearGradient>
            </defs>
        </svg>
    );
}
