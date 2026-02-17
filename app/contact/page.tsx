import Image from "next/image";
import { Building2, FileText, Linkedin, MapPin, Phone } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";

export default async function ContactPage() {
  const content = await getDynamicContent('contact');

  const heroBadge = content?.hero?.badge || "Contact";
  const heroTitle = content?.hero?.title || "Request your free case evaluation";
  const heroImage = content?.hero?.image || "/images/contact-office.jpg";

  const infoDesc = content?.info?.description || "Share your case details and our team will follow up...";
  const infoPhone = content?.info?.phone || "(800) 555-0199";
  const infoEmail = content?.info?.email || "support@disabilitylawgroup.com";

  const offices = content?.offices?.list || [
    "123 Main Street, Suite 400, New York, NY",
    "980 Market Avenue, Floor 8, Chicago, IL",
  ];

  const flowSteps = content?.flow?.steps || [
    { step: "Step 1", detail: "We review your submission and available records." },
    { step: "Step 2", detail: "A legal specialist contacts you for next details." },
    { step: "Step 3", detail: "We outline a clear strategy and timeline." },
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
            alt="Law office contact illustration"
            width={1200}
            height={760}
            className="h-full min-h-56 w-full rounded-xl border border-slate-200 object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="max-w-md text-sm leading-7 text-slate-600">
            {infoDesc}
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              {infoPhone}
            </p>
            <p className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              {infoEmail}
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#0B1F33]">
              <Building2 className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              Office Locations
            </p>
            <ul className="mt-3 space-y-3">
              {offices.map((office: string) => (
                <li key={office} className="flex items-start gap-2 text-sm text-slate-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A24D]" aria-hidden="true" />
                  {office}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-[#0B1F33] transition-colors hover:bg-slate-100"
            >
              <Linkedin className="h-4 w-4 text-[#C9A24D]" aria-hidden="true" />
              Follow on LinkedIn
            </a>
          </div>
        </div>

        <form className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <div className="grid gap-4">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              placeholder="Your name"
            />

            <label className="text-sm font-medium text-slate-700" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              placeholder="(555) 123-4567"
            />

            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              placeholder="name@example.com"
            />

            <label className="text-sm font-medium text-slate-700" htmlFor="case">
              Case Description
            </label>
            <textarea
              id="case"
              name="case"
              rows={5}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-[#C9A24D] focus:outline-none focus:ring-2 focus:ring-[#C9A24D]/40"
              placeholder="Briefly describe your disability claim."
            />
          </div>
          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-[#0B1F33] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#102b46]"
          >
            Submit Request
          </button>
        </form>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0B1F33]">What Happens After You Submit</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {flowSteps.map((step: any) => (
              <article key={step.step} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-[#0B1F33]">{step.step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
