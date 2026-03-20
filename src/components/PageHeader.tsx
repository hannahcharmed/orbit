'use client';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-2">
      {eyebrow && <p className="text-label mb-1.5">{eyebrow}</p>}
      <h1 className="font-serif text-2xl md:text-3xl text-starlight">{title}</h1>
      {subtitle && (
        <p className="text-[11px] text-text-secondary mt-1">{subtitle}</p>
      )}
      <div className="w-8 h-0.5 bg-orbit-blue rounded-full mt-3" />
    </div>
  );
}
