import Image from "next/image";
import { CheckCircle2, Star, Trophy } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";

const defaultStories = [
  {
    name: "Client A",
    quote: "After a prior denial, our appeal strategy secured approval with complete hearing preparation.",
  },
  {
    name: "Client B",
    quote: "The legal team kept us informed and organized every document needed for a successful claim.",
  },
  {
    name: "Client C",
    quote: "Their guidance gave us confidence and structure through a complex disability process.",
  },
];

const defaultOutcomes = [
  { label: "Cases handled", value: "3,200+" },
  { label: "Approval support rate", value: "89%" },
  { label: "Years of service", value: "25+" },
  { label: "Client satisfaction", value: "4.9 / 5" },
];

export default async function ResultsPage() {
  const content = await getDynamicContent('results');

  const heroBadge = content?.hero?.badge || "Results";
  const heroTitle = content?.hero?.title || "Real success stories and case outcomes";
  const heroImage = content?.hero?.image || "/images/results-graph.jpg";

  const stories = content?.testimonials?.items || defaultStories;
  const outcomes = content?.outcomes?.items || defaultOutcomes;
  const highlights = content?.highlights?.items || [
    { title: "Denied claim approved", detail: "Comprehensive appeal packet and hearing strategy." },
    { title: "Faster case progress", detail: "Early evidence organization and procedural tracking." },
    { title: "Reduced client stress", detail: "Consistent updates and clear communication." },
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
            alt="Case outcomes and growth chart illustration"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="space-y-4">
          {stories.map((item: any) => (
            <blockquote key={item.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Star className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              <p className="mt-3 text-sm leading-7 text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-3 text-sm font-semibold text-[#0B1F33]">{item.name}</footer>
            </blockquote>
          ))}
        </div>

        <aside className="rounded-xl border border-slate-200 bg-[#0B1F33] p-6 text-white">
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-[#C9A24D]">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Case Outcomes
          </p>
          <ul className="mt-5 space-y-4">
            {outcomes.map((outcome: any) => (
              <li key={outcome.label} className="rounded-lg border border-white/20 bg-white/10 p-4">
                <p className="text-2xl font-bold text-[#C9A24D]">{outcome.value}</p>
                <p className="mt-1 text-sm text-slate-200">{outcome.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
            Results vary by case facts and available supporting evidence.
          </p>
        </aside>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0B1F33]">Outcome Highlights</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {highlights.map((highlight: any) => (
              <article key={highlight.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-[#0B1F33]">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{highlight.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
