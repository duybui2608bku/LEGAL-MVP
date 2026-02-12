import { Lock } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";

export default function PrivacyPolicyPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
          Legal
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-4xl font-bold text-[#0B1F33]">
          <Lock className="h-7 w-7 text-[#C9A24D]" aria-hidden="true" />
          Privacy Policy
        </h1>
        <p className="mt-6 text-sm leading-7 text-slate-600">
          We protect personal information submitted through our contact forms and
          communication channels. Information is used only for case evaluation,
          legal communication, and service coordination in accordance with
          applicable privacy standards.
        </p>
      </section>
    </SiteShell>
  );
}
