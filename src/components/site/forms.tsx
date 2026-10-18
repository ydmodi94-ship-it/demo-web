import { Link } from "@tanstack/react-router";
import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { products } from "@/data/products";
import { btn } from "./styles";

const email = z.string().trim().email("Enter a valid business email").max(255);
const req = (label: string, max = 120) => z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);
const opt = (max = 200) => z.string().trim().max(max).optional().or(z.literal(""));

export const rfqSchema = z.object({
  contactName: req("Contact name", 100),
  businessEmail: email,
  companyName: req("Company name"),
  phone: z.string().trim().regex(/^[+\d\s()-]{0,20}$/, "Enter a valid phone number").optional().or(z.literal("")),
  product: req("Product", 200),
  casNumber: z.string().trim().regex(/^(\d{2,7}-\d{2}-\d)?$/, "Use CAS format e.g. 64-17-5").optional().or(z.literal("")),
  grade: opt(),
  quantity: z.string().trim().regex(/^\d+(\.\d+)?$/, "Enter a quantity"),
  unit: z.enum(["kg", "MT", "L", "drums"]),
  destination: req("Destination"),
  packaging: opt(),
  documentation: opt(),
  message: z.string().trim().max(1500, "Message must be under 1500 characters").optional().or(z.literal("")),
  consent: z.literal("on", { errorMap: () => ({ message: "Please confirm to continue" }) }),
});

export const docSchema = z.object({
  product: req("Product", 200),
  documentType: z.enum(["Technical Data Sheet", "Safety Data Sheet", "Certificate of Analysis", "Other approved documentation"]),
  contactName: req("Contact name", 100),
  businessEmail: email,
  companyName: req("Company name"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const sampleSchema = z.object({
  product: req("Product", 200),
  shade: opt(),
  application: req("Intended application"),
  sampleSize: req("Sample size", 60),
  contactName: req("Contact name", 100),
  businessEmail: email,
  companyName: req("Company name"),
  destination: req("Destination"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea" | "checkbox" | "product";
  options?: string[];
  optional?: boolean;
  placeholder?: string;
  full?: boolean;
  hint?: string;
};

function DemoForm({
  schema,
  fields,
  defaults = {},
  submitLabel,
  kind,
}: {
  schema: z.ZodTypeAny;
  fields: FieldDef[];
  defaults?: Record<string, string>;
  submitLabel: string;
  kind: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "preview" | "error">("idle");
  const [summary, setSummary] = useState<Record<string, unknown> | null>(null);
  const lock = useRef(false);
  const uid = useId();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lock.current) return; // duplicate-submit guard
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot: silently drop bots
    const data = Object.fromEntries(Array.from(fd.entries()).filter(([k]) => k !== "website"));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] ??= issue.message;
      setErrors(errs);
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    setErrors({});
    lock.current = true;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 700));
    setSummary(parsed.data);
    setStatus("preview");
    lock.current = false;
  };

  if (status === "preview" && summary) {
    return (
      <div role="status" className="rounded-lg border border-border bg-card p-6 shadow-card">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal" aria-hidden />
          <div>
            <h3 className="text-lg font-semibold">Demo preview — your {kind} was validated</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              This is a demonstration. <strong>Nothing has been sent, emailed or saved.</strong> In a live client site this {kind} would be
              stored securely and routed to the sales team.
            </p>
          </div>
        </div>
        <dl className="mt-5 grid gap-x-6 gap-y-2 rounded-md bg-muted p-4 text-sm sm:grid-cols-2">
          {Object.entries(summary)
            .filter(([k, v]) => v && k !== "consent")
            .map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="text-xs text-muted-foreground">{fields.find((f) => f.name === k)?.label ?? k}</dt>
                <dd className="break-words font-medium text-navy">{String(v)}</dd>
              </div>
            ))}
        </dl>
        <button onClick={() => { setStatus("idle"); setSummary(null); }} className={`${btn.outline} mt-5`}>Start a new {kind}</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="flex gap-2 rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
        <p>Demo mode: backend not configured. Submissions are validated in your browser only and are not transmitted or stored.</p>
      </div>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          const common = {
            id,
            name: f.name,
            defaultValue: defaults[f.name],
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? `${id}-err` : undefined,
            className: "field-input",
          } as const;
          if (f.type === "checkbox") {
            return (
              <div key={f.name} className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm">
                  <input type="checkbox" name={f.name} id={id} aria-invalid={err ? true : undefined} className="mt-1 h-4 w-4 accent-teal" />
                  <span>{f.label}</span>
                </label>
                {err && <p id={`${id}-err`} className="mt-1 text-xs text-destructive">{err}</p>}
              </div>
            );
          }
          return (
            <div key={f.name} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
                {f.label} {f.optional ? <span className="font-normal text-muted-foreground">(optional)</span> : <span className="text-destructive">*</span>}
              </label>
              {f.type === "select" ? (
                <select {...common}>{f.options!.map((o) => <option key={o}>{o}</option>)}</select>
              ) : f.type === "product" ? (
                <>
                  <input {...common} list={`${id}-list`} placeholder="Choose a sample product or type any chemical" />
                  <datalist id={`${id}-list`}>{products.map((p) => <option key={p.id} value={p.name} />)}</datalist>
                </>
              ) : f.type === "textarea" ? (
                <textarea {...common} rows={4} placeholder={f.placeholder} />
              ) : (
                <input {...common} type={f.type ?? "text"} placeholder={f.placeholder} />
              )}
              {f.hint && !err && <p className="mt-1 text-xs text-muted-foreground">{f.hint}</p>}
              {err && <p id={`${id}-err`} className="mt-1 text-xs text-destructive">{err}</p>}
            </div>
          );
        })}
      </div>
      <button type="submit" disabled={status === "submitting"} className={btn.primary}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {status === "submitting" ? "Validating…" : submitLabel}
      </button>
    </form>
  );
}

const contactFields: FieldDef[] = [
  { name: "contactName", label: "Contact name" },
  { name: "businessEmail", label: "Business email", type: "email" },
  { name: "companyName", label: "Company name" },
];

export function RfqForm({ productName, multi }: { productName?: string; multi?: boolean }) {
  return (
    <DemoForm
      kind="enquiry"
      schema={rfqSchema}
      submitLabel="Submit enquiry (demo)"
      defaults={{ product: productName ?? "" }}
      fields={[
        ...contactFields,
        { name: "phone", label: "Phone number", type: "tel", optional: true },
        { name: "product", label: multi ? "Product(s)" : "Product", type: "product", full: true, hint: multi ? "Multi-product RFQ: separate products with commas." : undefined },
        { name: "casNumber", label: "CAS number", optional: true, placeholder: "e.g. 64-17-5" },
        { name: "grade", label: "Grade / specification", optional: true },
        { name: "quantity", label: "Required quantity", placeholder: "e.g. 500" },
        { name: "unit", label: "Unit", type: "select", options: ["kg", "MT", "L", "drums"] },
        { name: "destination", label: "Destination", placeholder: "City, country" },
        { name: "packaging", label: "Preferred packaging", optional: true },
        { name: "documentation", label: "Documentation requirements", optional: true, full: true, placeholder: "e.g. TDS, SDS" },
        { name: "message", label: "Additional message", type: "textarea", optional: true },
        { name: "consent", label: "I agree that my details may be used to respond to this enquiry.", type: "checkbox" },
      ]}
    />
  );
}

export function DocRequestForm({ productName, allowCoa }: { productName?: string; allowCoa: boolean }) {
  const types = ["Technical Data Sheet", "Safety Data Sheet", ...(allowCoa ? ["Certificate of Analysis"] : []), "Other approved documentation"];
  return (
    <DemoForm
      kind="document request"
      schema={docSchema}
      submitLabel="Request documents (demo)"
      defaults={{ product: productName ?? "" }}
      fields={[
        { name: "product", label: "Product", type: "product", full: true },
        { name: "documentType", label: "Document type", type: "select", options: types, full: true, hint: allowCoa ? "CoAs are batch-specific and are shared privately after verification." : undefined },
        ...contactFields,
        { name: "message", label: "Message", type: "textarea", optional: true },
      ]}
    />
  );
}

export function SampleRequestForm({ productName }: { productName?: string }) {
  return (
    <DemoForm
      kind="sample request"
      schema={sampleSchema}
      submitLabel="Request sample (demo)"
      defaults={{ product: productName ?? "" }}
      fields={[
        { name: "product", label: "Product", type: "product", full: true },
        { name: "shade", label: "Grade or shade reference", optional: true },
        { name: "application", label: "Intended application" },
        { name: "sampleSize", label: "Quantity / sample size", placeholder: "e.g. 100 g" },
        { name: "destination", label: "Destination" },
        ...contactFields,
        { name: "message", label: "Message", type: "textarea", optional: true },
      ]}
    />
  );
}

export function DemoLinks() {
  return <Link to="/quote" className={btn.primary}>Request a Quote</Link>;
}
