import Link from "next/link";
import { Facebook, Linkedin, Scale } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold">
          <Scale className="h-5 w-5 text-[#C9A24D]" aria-hidden="true" />
          <span className="text-[#0B1F33]">Disability Law Group</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[#0B1F33]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-[#0B1F33] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#102b46]"
        >
          Free Evaluation
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm font-medium text-[#0B1F33]">
            Disability Law Group | Professional SSDI / SSI Legal Representation
          </p>
          <div className="flex items-center gap-4 text-slate-600">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-md p-2 transition-colors hover:bg-white hover:text-[#0B1F33]"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-md p-2 transition-colors hover:bg-white hover:text-[#0B1F33]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
          <Link href="/privacy-policy" className="transition-colors hover:text-[#0B1F33]">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="transition-colors hover:text-[#0B1F33]">
            Terms & Conditions
          </Link>
          <Link href="/disclaimer" className="transition-colors hover:text-[#0B1F33]">
            Disclaimer
          </Link>
          <Link href="/accessibility-statement" className="transition-colors hover:text-[#0B1F33]">
            Accessibility Statement
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
