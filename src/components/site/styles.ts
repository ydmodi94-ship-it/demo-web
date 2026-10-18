// Shared button class recipes built only from design tokens.
const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors min-h-11 px-5 disabled:opacity-60 disabled:cursor-not-allowed";

export const btn = {
  primary: `${base} bg-teal text-navy-foreground hover:bg-teal/90`,
  navy: `${base} bg-navy text-navy-foreground hover:bg-navy-soft`,
  outline: `${base} border border-border bg-background text-navy hover:border-teal hover:text-teal`,
  ghostLight: `${base} border border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10`,
  small: "inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline underline-offset-4",
};
