import { FileCheck2 } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";
import { getDynamicContent } from "@/lib/supabase/content";

export default async function TermsAndConditionsPage() {
  const content = await getDynamicContent('terms-and-conditions');
  const body = content?.content?.body || "This website content is provided for informational purposes...";

  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
          Legal
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-4xl font-bold text-[#0B1F33]">
          <FileCheck2 className="h-7 w-7 text-[#C9A24D]" aria-hidden="true" />
          Terms & Conditions
        </h1>
        <div
          className="mt-6 text-sm leading-7 text-slate-600"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </section>
    </SiteShell>
  );
}
