import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  MessageSquareQuote,
  Phone,
  Gavel,
  ShieldCheck,
  Star,
  Trophy
} from "lucide-react";
import { AttorneysCarousel } from "./_components/attorneys-carousel";
import { SiteShell } from "./_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";
import { getIcon } from "@/lib/icons";

const defaultHighlights = [
  {
    title: "25+ years of legal experience",
    description: "Focused practice in disability law and Social Security benefits.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Proven approval results",
    description: "Strong track record in SSDI / SSI claims and appeals.",
    icon: Trophy,
  },
  {
    title: "Certified attorneys",
    description: "Credentialed legal professionals with deep hearing-level expertise.",
    icon: Award,
  },
  {
    title: "Compassionate representation",
    description: "Clear communication and respectful support for clients and families.",
    icon: ShieldCheck,
  },
];

export default async function Home() {
  const content = await getDynamicContent('home');

  // Hero section data
  const heroTitle = content?.hero?.title || "Legal help for disability claims";
  const heroBadge = content?.hero?.badge || "Professional Disability Law Firm";
  const heroDesc = content?.hero?.description || "Professional representation for SSDI and SSI cases...";
  const heroImage = content?.hero?.image || "/images/legal-hero.jpg";

  // Dynamic highlights
  const dynamicHighlights = content?.highlights?.items?.map((item: any) => ({
    ...item,
    icon: getIcon(item.icon)
  })) || defaultHighlights;

  // Stats
  const stats = content?.stats?.items || [
    ["3,200+", "Cases handled"],
    ["89%", "Approval support rate"],
    ["25+", "Years of service"],
    ["4.9 / 5", "Client satisfaction"],
  ].map(([value, label]) => ({ value, label }));

  // Reviews
  const reviews = content?.reviews?.items || [
    {
      name: "Michael R.",
      quote: "Their team handled my appeal with precision and clear communication."
    },
    {
      name: "Angela T.",
      quote: "They explained each legal step in plain language."
    },
    {
      name: "David L.",
      quote: "Professional, responsive, and thorough."
    }
  ];

  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F33] via-[#102b46] to-[#0B1F33]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,162,77,0.28),transparent_45%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="space-y-6 text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
              <Gavel className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              {heroBadge}
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              {heroTitle}
            </h1>
            <div
              className="max-w-xl text-base leading-7 text-slate-200"
              dangerouslySetInnerHTML={{ __html: heroDesc }}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#C9A24D] px-5 py-3 text-sm font-semibold text-[#0B1F33] transition-colors hover:bg-[#d8b567]"
              >
                Free Case Evaluation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/20 bg-white/95 shadow-xl">
            <Image
              src={heroImage}
              alt="Legal disability services visual"
              width={1200}
              height={800}
              className="h-56 w-full object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold text-[#0B1F33]">
                Why choose our team
              </h2>
              <div className="mt-5 grid gap-4">
                {dynamicHighlights.map((item: any) => (
                  <article
                    key={item.title}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start gap-3">
                      <item.icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#C9A24D]"
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B1F33]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat: any) => (
            <article key={stat.label} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">
              <p className="text-3xl font-bold text-[#0B1F33]">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <Link
          href="/how-it-works"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <ShieldCheck className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold text-[#0B1F33]">How It Works</h3>
          <p className="mt-2 text-sm text-slate-600">
            See our four-step process from free evaluation to case management.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0B1F33]">
            Learn more <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <Link
          href="/results"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <Star className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold text-[#0B1F33]">Results & Reviews</h3>
          <p className="mt-2 text-sm text-slate-600">
            Read success stories and review real outcomes from disability cases.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0B1F33]">
            View outcomes <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-slate-200 bg-[#0B1F33] p-6 text-white shadow-sm transition-shadow hover:shadow-md"
        >
          <Gavel className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold">Start Your Free Evaluation</h3>
          <p className="mt-2 text-sm text-slate-200">
            Connect with our legal team and receive next-step guidance today.
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
            Contact now <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>

      <AttorneysCarousel />

      <section className="bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
            What Our Clients Say
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
            Trusted by clients through every stage
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((item: any) => (
              <article key={item.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <MessageSquareQuote className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
                <p
                  className="mt-3 text-sm leading-7 text-slate-700"
                  dangerouslySetInnerHTML={{ __html: item.quote }}
                />
                <p className="mt-4 text-sm font-semibold text-[#0B1F33]">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
              Common questions about SSDI / SSI legal help
            </h2>
            <div className="mt-6 space-y-4">
              {(content?.faq?.items || []).map((faq: any) => (
                <article key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-[#0B1F33]">{faq.question}</p>
                  <p className="mt-1 text-sm text-slate-600">{faq.answer}</p>
                </article>
              )) || (
                  [
                    "When should I hire a disability attorney?",
                    "What happens if my initial claim is denied?",
                    "How long can the appeals process take?",
                  ].map((q) => (
                    <article key={q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-[#0B1F33]">{q}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        We provide clear guidance based on your case details and procedural stage.
                      </p>
                    </article>
                  ))
                )}
            </div>
          </div>
          <Image
            src={content?.faq_image?.url || "/images/services-grid.jpg"}
            alt="Disability legal services overview graphic"
            width={1200}
            height={760}
            className="h-full min-h-64 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
              Speak with our legal team today
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Tell us about your disability claim and receive a free case
              evaluation with practical next-step guidance.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-[#0B1F33]">
              <Phone className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              (800) 555-0199
            </p>
          </div>
          <form className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Full name"
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              />
              <input
                type="email"
                placeholder="Email address"
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              />
              <textarea
                rows={4}
                placeholder="Briefly describe your case"
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              />
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#102b46]"
            >
              Request Consultation
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#0B1F33]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-14 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
              Free Consultation
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white">
              Start your disability case evaluation today
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-[#C9A24D] px-5 py-3 text-sm font-semibold text-[#0B1F33] transition-colors hover:bg-[#d8b567]"
          >
            Request Free Evaluation
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
