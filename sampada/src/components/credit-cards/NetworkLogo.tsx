interface NetworkLogoProps {
  network: string;
  className?: string;
}

function VisaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M293.2 348.73l33.36-195.76h53.34l-33.38 195.76H293.2zm246.11-191.54c-10.57-3.98-27.16-8.22-47.89-8.22-52.73 0-89.86 26.62-90.17 64.75-.31 28.2 26.51 43.92 46.76 53.3 20.77 9.6 27.76 15.73 27.67 24.3-.14 13.13-16.58 19.12-31.93 19.12-21.37 0-32.69-2.97-50.22-10.28l-6.88-3.12-7.49 43.96c12.46 5.48 35.52 10.23 59.47 10.48 56.07 0 92.5-26.28 92.92-67.05.21-22.35-14.03-39.35-44.82-53.36-18.66-9.09-30.09-15.15-29.98-24.35 0-8.16 9.68-16.88 30.59-16.88 17.46-.27 30.12 3.53 39.97 7.51l4.79 2.27 7.25-42.43zm137.31-4.22h-41.23c-12.77 0-22.33 3.49-27.94 16.26l-79.29 179.5h56.06s9.16-24.16 11.23-29.46c6.12 0 60.54.08 68.32.08 1.6 6.87 6.49 29.38 6.49 29.38h49.55l-43.19-195.76zm-65.71 126.41c4.41-11.29 21.26-54.78 21.26-54.78-.31.52 4.38-11.33 7.07-18.68l3.6 16.88s10.22 46.82 12.37 56.58h-44.3zM243.56 152.97L191.3 288.8l-5.58-27.09c-9.71-31.28-39.97-65.17-73.82-82.12l47.83 169.07 56.45-.06 83.98-195.63h-56.6z"
        fill="#1A1F71"
      />
      <path
        d="M146.92 152.97H60.88l-.68 3.98c66.94 16.24 111.24 55.45 129.62 102.56L171.72 169.4c-3.18-12.18-12.39-15.98-24.8-16.43z"
        fill="#F7A600"
      />
    </svg>
  );
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="312" cy="250" r="170" fill="#EB001B" />
      <circle cx="468" cy="250" r="170" fill="#F79E1B" />
      <path
        d="M390 120.87a169.73 169.73 0 0 0-65.16 129.13c0 52.98 24.28 100.29 62.32 131.47a169.89 169.89 0 0 0 5.68-2.34A169.73 169.73 0 0 0 455.16 250c0-52.98-24.28-100.29-62.32-131.47a170.5 170.5 0 0 0-2.84 2.34z"
        fill="#FF5F00"
      />
    </svg>
  );
}

function RupayLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="80" y="140" width="620" height="220" rx="16" fill="white" fillOpacity="0.15" />
      <text
        x="390"
        y="275"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="120"
        fill="#097A44"
      >
        Ru
        <tspan fill="#F37021">Pay</tspan>
      </text>
    </svg>
  );
}

function AmexLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="780" height="500" rx="40" fill="#016FD0" />
      <text
        x="390"
        y="210"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="72"
        fill="white"
        letterSpacing="4"
      >
        AMERICAN
      </text>
      <text
        x="390"
        y="310"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="72"
        fill="white"
        letterSpacing="4"
      >
        EXPRESS
      </text>
    </svg>
  );
}

function DinersLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 780 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="390" cy="250" r="200" fill="#0079BE" />
      <circle cx="390" cy="250" r="160" fill="white" />
      <path
        d="M310 250c0-44.73 24.54-83.72 60.86-104.22V354.22C334.54 333.72 310 294.73 310 250zm98.28-104.22V354.22C444.6 333.72 469.14 294.73 469.14 250c0-44.73-24.54-83.72-60.86-104.22z"
        fill="#0079BE"
      />
    </svg>
  );
}

const LOGO_MAP: Record<string, React.FC<{ className?: string }>> = {
  visa: VisaLogo,
  mastercard: MastercardLogo,
  rupay: RupayLogo,
  amex: AmexLogo,
  diners: DinersLogo,
};

export function NetworkLogo({ network, className = "h-8 w-auto" }: NetworkLogoProps) {
  const Logo = LOGO_MAP[network];
  if (!Logo) {
    return (
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
        {network}
      </span>
    );
  }
  return <Logo className={className} />;
}
