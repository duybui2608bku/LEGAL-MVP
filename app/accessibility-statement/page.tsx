import { Accessibility } from "lucide-react";
import { SiteShell } from "../_components/site-chrome";

export default function AccessibilityStatementPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
          Legal
        </p>
        <h1 className="mt-2 flex items-center gap-2 text-4xl font-bold text-[#0B1F33]">
          <Accessibility className="h-7 w-7 text-[#C9A24D]" aria-hidden="true" />
          Accessibility Statement
        </h1>
        <p className="mt-6 text-sm leading-7 text-slate-600">
          We are committed to providing an accessible experience for all users,
          including keyboard navigation, readable contrast, and semantic
          structure. If you encounter barriers, please contact us so we can
          improve access and support.
        </p>
      </section>
    </SiteShell>
  );
}
