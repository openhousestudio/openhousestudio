export function DoorMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Open House Studio"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="56" y="32" width="88" height="136" fill="#FFFCF4" />
      <path d="M56 32 L118 44 L118 156 L56 168 Z" fill="#A94F2E" />
      <rect x="56.5" y="34" width="2.5" height="132" fill="#FFFCF4" />
      <rect x="104" y="98" width="8" height="8" rx="2" fill="#FFFCF4" />
      <rect
        x="50"
        y="26"
        width="100"
        height="148"
        rx="9"
        fill="none"
        stroke="#A94F2E"
        strokeWidth="12"
      />
    </svg>
  );
}
