"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const attorneys = [
  {
    name: "Rachel Morgan, Esq.",
    role: "Founding Disability Attorney",
    detail: "25+ years representing SSDI and SSI claimants in complex cases.",
    image: "/images/attorney-rachel.jpg",
  },
  {
    name: "Daniel Carter, Esq.",
    role: "Appeals & Hearings Attorney",
    detail: "Focused on denied claims, hearings, and federal-level documentation.",
    image: "/images/attorney-daniel.jpg",
  },
  {
    name: "Elena Brooks",
    role: "Senior Case Specialist",
    detail: "Coordinates medical records, filings, deadlines, and client updates.",
    image: "/images/attorney-elena.jpg",
  },
];

export function AttorneysCarousel() {
  const [index, setIndex] = useState(0);
  const total = attorneys.length;

  const current = useMemo(() => attorneys[index], [index]);

  const prev = () => setIndex((value) => (value - 1 + total) % total);
  const next = () => setIndex((value) => (value + 1) % total);

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-[#C9A24D]">
              Our Attorneys
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#0B1F33]">
              Meet the legal team behind every case
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous attorney"
              className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition-colors hover:bg-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next attorney"
              className="rounded-md border border-slate-300 bg-white p-2 text-slate-700 transition-colors hover:bg-slate-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <article className="mt-8 grid gap-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:grid-cols-[0.9fr_1.1fr]">
          <Image
            src={current.image}
            alt={current.name}
            width={900}
            height={900}
            className="h-full min-h-64 w-full rounded-lg border border-slate-200 object-cover bg-white"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#C9A24D]">
              Attorney Profile
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#0B1F33]">{current.name}</h3>
            <p className="mt-2 text-sm font-semibold text-slate-700">{current.role}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{current.detail}</p>
          </div>
        </article>

        <div className="mt-5 flex items-center justify-center gap-2">
          {attorneys.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to ${item.name}`}
              className={`h-2.5 rounded-full transition-all ${
                dotIndex === index ? "w-8 bg-[#0B1F33]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
