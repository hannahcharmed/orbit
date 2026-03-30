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
        <p className="font-mono text-[11px] text-text-secondary mt-1.5 tracking-wide">{subtitle}</p>
      )}
    </div>
  );
}
