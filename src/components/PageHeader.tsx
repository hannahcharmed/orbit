'use client';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-2">
      {/* Eyebrow — HUD-style with diamond marker */}
      {eyebrow && (
        <div className="flex items-center gap-2 mb-2.5">
          {/* Rotated diamond accent */}
          <div className="w-2 h-2 flex-shrink-0 border"
            style={{
              transform: 'rotate(45deg)',
              borderColor: 'rgba(0,229,255,0.55)',
              background: 'rgba(0,229,255,0.08)',
            }}
          />
          <p className="text-label">{eyebrow}</p>
          {/* Trailing measurement line */}
          <div className="flex items-center gap-0 flex-shrink-0">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.35), transparent)' }} />
          </div>
        </div>
      )}

      <h1 className="font-serif text-2xl md:text-3xl text-starlight leading-tight">{title}</h1>

      {subtitle && (
        <p className="font-mono text-[10px] text-text-tertiary mt-1.5 tracking-wide">{subtitle}</p>
      )}

      {/* Bottom accent — gradient line with geometric terminus */}
      <div className="flex items-center gap-1.5 mt-3">
        <div className="h-px w-10"
          style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.8), rgba(61,122,255,0.4))' }} />
        <div className="w-1.5 h-1.5 flex-shrink-0"
          style={{
            background: 'rgba(0,229,255,0.5)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        />
        <div className="h-px w-6"
          style={{ background: 'linear-gradient(90deg, rgba(61,122,255,0.3), transparent)' }} />
      </div>
    </div>
  );
}
