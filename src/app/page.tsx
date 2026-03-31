import Image from "next/image";
import Link from "next/link";

import { StatisticsSection } from "../components/statistics-section";
import { homeContent } from "../lib/site-content";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[2.5rem_4rem_2rem_2rem] border border-[color:var(--shell-border)] bg-[color:var(--shell-bg)] p-6 shadow-[0_34px_90px_-48px_var(--shadow-soft)] backdrop-blur sm:p-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
        <div className="space-y-7">
          <div className="flex items-start gap-4">
            <div className="rounded-[1.6rem_1.6rem_1rem_1rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted)] p-3 shadow-[0_18px_48px_-34px_var(--shadow-soft)]">
              <Image
                src="/media/triangle-coa.png"
                alt="Triangle coat of arms"
                width={108}
                height={132}
                priority
              />
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
                {homeContent.title}
              </p>
              <h1 className="font-display max-w-3xl text-5xl leading-[0.92] text-[color:var(--foreground)] sm:text-6xl xl:text-[4.6rem]">
                Balanced men in engineering, architecture, and science.
              </h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-relaxed text-[color:var(--muted)]">
            {homeContent.introduction}
          </p>

          <div className="rounded-[2rem_2rem_1.25rem_1.25rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted)] px-5 py-5">
            <p className="font-display text-[2rem] leading-[1.02] text-[color:var(--foreground)]">
              &ldquo;{homeContent.quote}&rdquo;
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--psu-beaver)]">
              {homeContent.quoteAttribution}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/join/introduction"
              className="rounded-full bg-[var(--triangle-rose)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[color:var(--surface-dark-border)] bg-[var(--psu-navy)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--psu-beaver)]"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden rounded-[2.5rem_2rem_2rem_4rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted-strong)] shadow-[0_30px_80px_-45px_var(--shadow-strong)]">
          <Image
            src="/media/triangle-house.jpg"
            alt="Triangle Fraternity chapter house"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,30,68,0.04),rgba(0,30,68,0.74))]" />
          <div className="absolute right-5 top-5 rounded-full border border-white/12 bg-[rgba(8,25,44,0.78)] px-4 py-2 text-white backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--psu-pugh)]">
              Founded
            </p>
            <p className="font-display text-2xl leading-none">1928</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
              Chapter House
            </p>
            <p className="mt-2 max-w-md font-display text-[2rem] leading-[0.96]">
              Navigation, chapter information, events, scholarships, and alumni
              resources now sit under one rebuilt Penn State Triangle site.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <article className="rounded-[2rem_2rem_2rem_3.25rem] border border-[color:var(--shell-border)] bg-[color:var(--shell-bg)] p-6 shadow-[0_24px_70px_-48px_var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
            Values and Code Ethics
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--muted)]">
            {homeContent.valuesIntro}
          </p>

          <ol className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {homeContent.values.map((value, index) => (
              <li
                key={value}
                className="border-t border-[color:var(--surface-dark-border)] pt-4 text-sm leading-relaxed text-[color:var(--muted-strong)]"
              >
                <span className="mb-2 block font-display text-[1.55rem] leading-none text-[var(--psu-beaver)]">
                  {`Value ${index + 1}`}
                </span>
                {value}
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-[3rem_2rem_2rem_2rem] border border-[color:var(--shell-border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_24px_70px_-48px_var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
            Discover Triangle
          </p>
          <p className="font-display mt-3 text-[2.55rem] leading-[0.92] text-[color:var(--foreground)]">
            A chapter built around academic achievement, leadership, and
            brotherhood.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[color:var(--muted)]">
            {homeContent.mission}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join/introduction"
              className="rounded-full border border-[color:var(--surface-dark-border)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--surface-muted)]"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-[var(--psu-navy)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--psu-beaver)]"
            >
              Contact Us
            </Link>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem_3rem_2rem_2rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted-strong)] shadow-[0_24px_70px_-48px_var(--shadow-strong)]">
          <Image
            src="/media/triangle-brotherhood.jpg"
            alt="Triangle fraternity brotherhood"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 35vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,30,68,0.05),rgba(0,30,68,0.7))]" />
        </div>

        <article className="rounded-[2rem_2rem_2rem_3rem] border border-[color:var(--surface-dark-border)] bg-[linear-gradient(135deg,var(--surface-dark),var(--surface-dark-strong))] p-6 text-[var(--text-on-dark)] shadow-[0_24px_70px_-48px_var(--shadow-strong)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
            See What Triangle Is Up To
          </p>
          <p className="font-display mt-3 text-[2.35rem] leading-[0.94] text-[var(--text-on-dark)]">
            Brotherhood with motion, memory, and a little edge.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/76">
            {homeContent.activity}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/events"
              className="rounded-full bg-[var(--triangle-rose)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Events
            </Link>
            <Link
              href="/news"
              className="rounded-full border border-white/16 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              News
            </Link>
          </div>
        </article>
      </section>

      <StatisticsSection />
    </div>
  );
}
