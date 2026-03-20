'use client';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-2">
      {eyebrow && (
        <p className="text-label mb-2">{eyebrow}</p>
      )}
      <h1 className="font-serif text-2xl md:text-3xl text-starlight leading-tight">{title}</h1>
      {subtitle && (
        <p className="text-[11px] text-text-secondary mt-1.5 font-sans">{subtitle}</p>
      )}
      {/* Accent line — gradient instead of flat */}
      <div className="mt-3 h-px w-12"
        style={{
          background: 'linear-gradient(90deg, rgba(91,110,255,0.9) 0%, rgba(167,139,250,0.4) 60%, transparent 100%)',
        }}
      />
    </div>
  );
}
