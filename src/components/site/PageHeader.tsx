import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="grid-lines bg-navy text-navy-foreground">
      <div className="container-page py-14 md:py-20">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl text-3xl font-bold text-navy-foreground md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-navy-foreground/75">{children}</div>}
      </div>
    </section>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div role="note" className="rounded-lg border border-warning/30 bg-warning-soft px-4 py-3 text-sm text-foreground">
      {children}
    </div>
  );
}
