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
  const innerR = radius * 0.68;
  const gradId = `gravity-grad-${size}`;

  // Tick marks at 0%, 25%, 50%, 75%, 100% — positioned around the ring
  // Ring starts at -90° (top) and goes clockwise
  const ticks = [0, 25, 50, 75, 100].map(pct => {
    const angle = (pct / 100) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const r1 = radius + 4;
    const r2 = radius - 4;
    return {
      x1: cx + r1 * Math.cos(rad),
      y1: cy + r1 * Math.sin(rad),
      x2: cx + r2 * Math.cos(rad),
      y2: cy + r2 * Math.sin(rad),
      pct,
    };
  });

  // Minor tick marks at every 10%
  const minorTicks = [10, 20, 30, 40, 60, 70, 80, 90].map(pct => {
    const angle = (pct / 100) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const r1 = radius + 2.5;
    const r2 = radius - 1;
    return {
      x1: cx + r1 * Math.cos(rad),
      y1: cy + r1 * Math.sin(rad),
      x2: cx + r2 * Math.cos(rad),
      y2: cy + r2 * Math.sin(rad),
    };
  });

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#3D7AFF" />
            <stop offset="50%"  stopColor="#9B7FFF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer pulse rings */}
        <circle cx={cx} cy={cy} r={radius + 10}
          stroke="rgba(0,229,255,0.1)" strokeWidth="0.4" fill="none"
          className={animate ? 'animate-pulse-ring' : ''} />
        <circle cx={cx} cy={cy} r={radius + 18}
          stroke="rgba(61,122,255,0.06)" strokeWidth="0.3" fill="none"
          className={animate ? 'animate-pulse-ring stagger-4' : ''} />

        {/* Track */}
        <circle cx={cx} cy={cy} r={radius}
          stroke="rgba(20,28,58,0.9)" strokeWidth="5.5" fill="none" />

        {/* Inner ring — light guide ring */}
        <circle cx={cx} cy={cy} r={innerR}
          stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" fill="none" />

        {/* Minor tick marks */}
        {minorTicks.map((t, i) => (
          <line key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="rgba(0,229,255,0.18)" strokeWidth="0.6" />
        ))}

        {/* Major tick marks */}
        {ticks.map((t) => (
          <line key={t.pct}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="rgba(0,229,255,0.5)" strokeWidth="1.2" />
        ))}

        {/* Progress arc */}
        <circle
          cx={cx} cy={cy} r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          filter={`url(#glow-${size})`}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Score indicator dot at current position */}
        {(() => {
          const angle = (score / 100) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const dotR = radius;
          return (
            <circle
              cx={cx + dotR * Math.cos(rad)}
              cy={cy + dotR * Math.sin(rad)}
              r="3"
              fill="#00E5FF"
              filter={`url(#glow-${size})`}
            />
          );
        })()}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Chakra Petch for the data readout */}
        <span className="font-display font-700 text-starlight"
          style={{
            fontSize: size * 0.24,
            lineHeight: 1,
            textShadow: '0 0 20px rgba(0,229,255,0.3)',
          }}>
          {score}
        </span>
        <span className="font-display text-text-quaternary uppercase tracking-widest"
          style={{ fontSize: size * 0.065, letterSpacing: '0.18em', marginTop: 2 }}>
          GRAVITY
        </span>
      </div>
    </div>
  );
}
