<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules
- Brand, contact and feature flags live only in `src/config/site.ts`; UI reads them via `useSiteConfig` so one demo can be re-skinned per client.
- Product data lives in `src/data/products.ts`, separate from UI; catalogue filtering uses `filterProducts` so search operates on real data.
- Preview presets are dev-only (`import.meta.env.DEV`); production always renders the default ChemCore config to avoid impersonating companies.
- Forms run in demo mode (client-side zod validation, honeypot, duplicate-submit lock) and must never claim data was sent until a backend exists.
