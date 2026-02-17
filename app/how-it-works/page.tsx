import Image from "next/image";
import { CalendarClock, CheckCircle2, ClipboardCheck, FileText, Gavel, IdCard, ShieldCheck } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";
import { getIcon } from "@/lib/icons";

const defaultSteps = [
  {
    title: "Initial Free Evaluation",
    detail: "We review your situation and assess SSDI / SSI eligibility.",
    icon: ClipboardCheck,
  },
  {
    title: "Application Support",
    detail: "Our team prepares and submits complete case documents.",
    icon: FileText,
  },
  {
    title: "Appeal & Hearing Process",
    detail: "We provide legal representation for denied claims and hearings.",
    icon: Gavel,
  },
  {
    title: "Case Management",
    detail: "We track milestones and keep you informed at each stage.",
    icon: CheckCircle2,
  },
];

export default async function HowItWorksPage() {
  const content = await getDynamicContent('how-it-works');

  const heroBadge = content?.hero?.badge || "How It Works";
  const heroTitle = content?.hero?.title || "A clear legal process from start to finish";
  const heroImage = content?.hero?.image || "/images/process-steps.jpg";

  const steps = content?.steps?.items?.map((s: any) => ({
    ...s,
    icon: getIcon(s.icon)
  })) || defaultSteps;

  const prepareList = content?.prepare?.items?.map((item: any) => ({
    ...item,
    icon: getIcon(item.icon)
  })) || [
      { title: "Medical Records", icon: FileText },
      { title: "Identification Documents", icon: IdCard },
      { title: "Employment History", icon: ClipboardCheck },
    ];

  const milestones = content?.milestones?.items || [
    { title: "Weeks 1-3", detail: "Case intake and documentation review." },
    { title: "Weeks 4-8", detail: "Application preparation and submission." },
    { title: "Appeal stage", detail: "Representation for denied claims and hearings." },
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
            alt="Disability legal process timeline graphic"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <ol className="grid gap-5 md:grid-cols-2">
          {steps.map((step: any, index: number) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <step.icon className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                Step {index + 1}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#0B1F33]">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-xl border border-[#C9A24D]/40 bg-[#C9A24D]/10 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-[#0B1F33]">
            <CalendarClock className="h-4 w-4" aria-hidden="true" />
            Typical timeline depends on case complexity, medical evidence, and hearing schedules.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0B1F33]">What to Prepare</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {prepareList.map((item: any) => (
              <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <item.icon className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
                <h3 className="mt-3 text-base font-semibold text-[#0B1F33]">{item.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0B1F33]">Typical Milestones</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {milestones.map((milestone: any) => (
              <article key={milestone.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-[#0B1F33]">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
