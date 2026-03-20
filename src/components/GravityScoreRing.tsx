'use client';

interface GravityScoreRingProps {
  score: number;
  size?: number;
  animate?: boolean;
}

export function GravityScoreRing({ score, size = 120, animate = true }: GravityScoreRingProps) {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - score / 100);
  const cx = size / 2;
  const cy = size / 2;
  const innerR = radius * 0.7;
  const gradId = `gravity-grad-${size}`;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          {/* Blue → Violet gradient for the arc */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5B6EFF" />
            <stop offset="60%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#C4AEFF" />
          </linearGradient>
        </defs>

        {/* Outer pulse rings */}
        <circle cx={cx} cy={cy} r={radius + 7}
          stroke="#A78BFA" strokeWidth="0.5" fill="none" opacity="0.18"
          className={animate ? 'animate-pulse-ring' : ''} />
        <circle cx={cx} cy={cy} r={radius + 14}
          stroke="#5B6EFF" strokeWidth="0.3" fill="none" opacity="0.08"
          className={animate ? 'animate-pulse-ring stagger-3' : ''} />

        {/* Track */}
        <circle cx={cx} cy={cy} r={radius}
          stroke="rgba(26,34,69,0.8)" strokeWidth="6" fill="none" />
        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={innerR}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none" />

        {/* Progress arc — gradient + glow */}
        <circle
          cx={cx} cy={cy} r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.7)) drop-shadow(0 0 2px rgba(91,110,255,0.8))',
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-starlight" style={{ fontSize: size * 0.22, lineHeight: 1 }}>
          {score}
        </span>
        <span className="font-display text-text-quaternary uppercase tracking-widest" style={{ fontSize: size * 0.065 }}>
          gravity
        </span>
      </div>
    </div>
  );
}
