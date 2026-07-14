export default function RouteIllustration() {
    return (
        <svg className="auth-route-illustration" viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 150 C 80 150, 90 60, 150 60 S 230 140, 290 40" stroke="rgba(243,246,241,0.35)" strokeWidth="2" strokeDasharray="6 8" fill="none" />
            <circle cx="20" cy="150" r="6" fill="#E8A33D" />
            <circle cx="150" cy="60" r="6" fill="#F3F6F1" />
            <circle cx="290" cy="40" r="6" fill="#E8A33D" />
            <g transform="translate(270, 100)">
                <rect x="0" y="10" width="34" height="28" rx="4" fill="rgba(243,246,241,0.15)" stroke="rgba(243,246,241,0.4)" strokeWidth="1.5" />
                <rect x="-3" y="4" width="40" height="8" rx="2" fill="rgba(243,246,241,0.25)" />
                <line x1="17" y1="16" x2="17" y2="32" stroke="rgba(243,246,241,0.4)" strokeWidth="1.5" />
            </g>
        </svg>
    );
}