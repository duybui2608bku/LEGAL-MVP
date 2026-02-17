import Image from "next/image";
import { FileText, FolderOpenDot, Gavel, HandHelping, ShieldCheck } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";
import { getIcon } from "@/lib/icons";

const defaultServices = [
  {
    title: "Disability Representation",
    description: "Full legal representation for disability claims, evidence preparation, and case strategy.",
    icon: ShieldCheck,
  },
  {
    title: "SSDI / SSI Help",
    description: "Guidance through Social Security disability requirements, eligibility checks, and filings.",
    icon: FileText,
  },
  {
    title: "Appeals Services",
    description: "Representation for denied claims, reconsideration requests, and hearings before judges.",
    icon: Gavel,
  },
  {
    title: "Document Preparation",
    description: "Professional drafting and review of legal forms, statements, and supporting records.",
    icon: FolderOpenDot,
  },
];

export default async function ServicesPage() {
  const content = await getDynamicContent('services');

  const heroBadge = content?.hero?.badge || "Services";
  const heroTitle = content?.hero?.title || "Disability law services built for real outcomes";
  const heroImage = content?.hero?.image || "/images/services-grid.jpg";

  const services = content?.services?.list?.map((s: any) => ({
    ...s,
    icon: getIcon(s.icon)
  })) || defaultServices;

  const supportTitle = content?.support?.title || "Other Support";
  const supportDesc = content?.support?.description || "We also support Medicare-related coordination...";

  const standards = content?.standards?.items || [
    "Clear communication of legal options at each phase.",
    "Accurate records and deadline-driven case management.",
    "Client updates with practical next actions.",
  ];

  return (
    <SiteShell>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
              {heroBadge}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-[#0B1F33]">{heroTitle}</h1>
          </div>
          <Image
            src={heroImage}
            alt="Legal services categories visual"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service: any) => (
            <article key={service.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <service.icon className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-semibold text-[#0B1F33]">{service.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#C9A24D]/40 bg-[#C9A24D]/10 p-6">
            <div className="flex items-start gap-3">
              <HandHelping className="h-5 w-5 shrink-0 text-[#0B1F33]" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-semibold text-[#0B1F33]">{supportTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-[#0B1F33]">
                  {supportDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Image
            src="/images/process-steps.jpg"
            alt="Case strategy and legal workflow visual"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#0B1F33]">Service Delivery Standards</h2>
            <div className="mt-6 space-y-4">
              {standards.map((item: string) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
