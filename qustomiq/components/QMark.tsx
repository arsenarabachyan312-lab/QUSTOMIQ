interface Props {
  size?: number;
  className?: string;
}

export default function QMark({ size = 32, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="11"
        cy="11"
        r="8"
        stroke="currentColor"
        strokeWidth="3.5"
      />
      <line
        x1="15"
        y1="15"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
