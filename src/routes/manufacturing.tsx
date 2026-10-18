import { createFileRoute, Link } from "@tanstack/react-router";
import manufacturing from "@/assets/manufacturing.jpg";
import { PageHeader, Notice } from "@/components/site/PageHeader";
import { btn } from "@/components/site/styles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/manufacturing")({
  head: () => seo("Manufacturing Capabilities", "A template for presenting verified chemical manufacturing capabilities, processes and facilities."),
  component: Manufacturing,
});

const blocks = [
  { t: "Process chemistry", d: "Placeholder for the reaction types the client verifiably operates." },
  { t: "Reactor capacity", d: "Placeholder for verified reactor volumes and materials of construction." },
  { t: "Scale-up", d: "Placeholder for pilot-to-commercial scale-up information, if offered." },
  { t: "Custom synthesis", d: "Placeholder — show only if the client confirms this service." },
];

function Manufacturing() {
  return (
    <>
      <PageHeader eyebrow="Manufacturing" title="Manufacturing capabilities">A neutral template — replace every block with verified client information.</PageHeader>
      <div className="container-page py-14">
        <img src={manufacturing} alt="Production hall with glass-lined reactors" loading="lazy" width={1600} height={1072} className="mb-10 aspect-[21/9] w-full rounded-lg object-cover" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b, i) => (
            <div key={b.t} className="rounded-lg border border-border p-6">
              <span className="font-mono text-xs text-teal">0{i + 1}</span>
              <h2 className="mt-3 font-semibold">{b.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8"><Notice>No capacities, facility sizes or locations are claimed in this demo.</Notice></div>
        <Link to="/quote" className={`${btn.primary} mt-8`}>Discuss a requirement</Link>
      </div>
    </>
  );
}
