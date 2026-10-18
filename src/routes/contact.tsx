import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { useSiteConfig } from "@/components/site/config-context";
import { btn } from "@/components/site/styles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Contact options for the ChemCore Industries demo. Real contact details are added per client."),
  component: Contact,
});

function Contact() {
  const { config } = useSiteConfig();
  const items = [
    { icon: Mail, label: "Email", value: config.contact.email },
    { icon: Phone, label: "Phone", value: config.contact.phone },
    { icon: MapPin, label: "Address", value: config.contact.address },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch">For product enquiries, the quotation form is the fastest route.</PageHeader>
      <div className="container-page grid gap-6 py-14 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.label} className="rounded-lg border border-border p-6">
            <i.icon className="h-6 w-6 text-teal" aria-hidden />
            <h2 className="mt-4 font-semibold">{i.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{i.value ?? "Not configured — added with verified client details."}</p>
          </div>
        ))}
        <div className="flex flex-col items-start gap-4 rounded-lg bg-navy p-8 text-navy-foreground md:col-span-3 md:flex-row md:items-center md:justify-between">
          <p className="text-lg font-semibold text-navy-foreground">Have a specific product or quantity in mind?</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" className={btn.primary}>Request a Quote</Link>
            <Link to="/quality" className={btn.ghostLight}>Request documents</Link>
          </div>
        </div>
      </div>
    </>
  );
}
