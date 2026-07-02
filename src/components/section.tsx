import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12 sm:py-16" aria-labelledby={`${id}-title`}>
      <h2
        id={`${id}-title`}
        className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200 lg:sr-only"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
