import Image from "next/image";
import { Award, BadgeCheck, HeartHandshake, Scale, ShieldCheck, Users } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";
import { getIcon } from "@/lib/icons";

const defaultTeam = [
  {
    name: "Rachel Morgan, Esq.",
    role: "Founding Disability Attorney",
    detail: "25+ years representing SSDI and SSI claimants.",
  },
  {
    name: "Daniel Carter, Esq.",
    role: "Appeals & Hearings Attorney",
    detail: "Specialized in denied claims and hearing preparation.",
  },
  {
    name: "Elena Brooks",
    role: "Senior Case Specialist",
    detail: "Coordinates records, deadlines, and client communication.",
  },
];

const defaultValues = [
  { title: "Integrity", icon: ShieldCheck },
  { title: "Compassion", icon: HeartHandshake },
  { title: "Transparency", icon: BadgeCheck },
  { title: "Excellence", icon: Award },
];

export default async function AboutPage() {
  const content = await getDynamicContent('about');

  const heroBadge = content?.hero?.badge || "About Us";
  const heroTitle = content?.hero?.title || "Our Mission & Vision";
  const heroDesc = content?.hero?.description || "We help clients secure the disability benefits they deserve...";
  const heroImage = content?.hero?.image || "/images/team-photo.jpg";

  const missionTitle = content?.mission?.title || "Our Mission";
  const missionDesc = content?.mission?.description || "Provide high-quality disability representation...";

  const visionTitle = content?.vision?.title || "Our Vision";
  const visionDesc = content?.vision?.description || "Be the most trusted disability law partner...";

  const team = content?.team?.members || defaultTeam;
  const values = content?.values?.items?.map((v: any) => ({
    ...v,
    icon: getIcon(v.icon)
  })) || defaultValues;

  const approachItems = content?.approach?.items || [
    "Case-first strategy based on documentation quality.",
    "Proactive communication with clients and families.",
    "Hearing-ready preparation from the earliest stages.",
  ];

  return (
    <SiteShell>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">{heroBadge}</p>
            <h1 className="mt-2 text-4xl font-bold text-[#0B1F33]">{heroTitle}</h1>
            <div
              className="mt-4 max-w-3xl text-sm leading-7 text-slate-600"
              dangerouslySetInnerHTML={{ __html: heroDesc }}
            />
          </div>
          <Image
            src={heroImage}
            alt="Legal disability team illustration"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <Scale className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-semibold text-[#0B1F33]">{missionTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{missionDesc}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <Users className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
            <h2 className="mt-3 text-xl font-semibold text-[#0B1F33]">{visionTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{visionDesc}</p>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0B1F33]">Our Team</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {team.map((member: any) => (
              <article key={member.name} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-[#0B1F33]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[#C9A24D]">{member.role}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{member.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#0B1F33]">Our Values</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value: any) => (
            <article key={value.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <value.icon className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold text-[#0B1F33]">{value.title}</h3>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-[#C9A24D]/40 bg-[#C9A24D]/10 p-5">
          <p className="text-sm font-medium text-[#0B1F33]">
            Accreditation & Awards: Bar memberships, disability law certifications,
            and recognition for ethical client advocacy.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Image
            src="/images/legal-hero.jpg"
            alt="Law office professionalism visual"
            width={1200}
            height={800}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-[#0B1F33]">Why Our Approach Works</h2>
            <div className="mt-6 space-y-4">
              {approachItems.map((item: string) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
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
