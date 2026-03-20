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
  const innerR = radius * 0.72;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Outer pulse rings */}
        <circle
          cx={cx} cy={cy} r={radius + 6}
          stroke="#A78BFA" strokeWidth="0.5" fill="none" opacity="0.15"
          className={animate ? 'animate-pulse-ring' : ''}
        />
        <circle
          cx={cx} cy={cy} r={radius + 12}
          stroke="#A78BFA" strokeWidth="0.3" fill="none" opacity="0.07"
          className={animate ? 'animate-pulse-ring stagger-2' : ''}
        />
        {/* Track */}
        <circle
          cx={cx} cy={cy} r={radius}
          stroke="#1A2150" strokeWidth="6" fill="none"
        />
        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={innerR}
          stroke="#1A2150" strokeWidth="0.5" fill="none"
        />
        {/* Progress arc */}
        <circle
          cx={cx} cy={cy} r={radius}
          stroke="#A78BFA"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(167, 139, 250, 0.6))',
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ rotate: '0deg' }}
      >
        <span className="font-serif text-starlight" style={{ fontSize: size * 0.22, lineHeight: 1 }}>
          {score}
        </span>
        <span className="text-text-quaternary uppercase tracking-widest" style={{ fontSize: size * 0.07 }}>
          gravity
        </span>
      </div>
    </div>
  );
}
