import Image from "next/image";
import Link from "next/link";

import { HomeSlideshow } from "../components/home-slideshow";
import { StatisticsSection } from "../components/statistics-section";
import { homeContent } from "../lib/site-content";

const aboutIntroduction =
  "Penn State Triangle (est. 1928) is proud to call itself a chapter of Triangle Fraternity (est. 1907), a fraternity exclusively for engineers, architects, and scientists. Within that exclusivity, academics and professional development remain paramount. Our purpose is to develop balanced men who cultivate high moral character, foster lifelong friendships, and lead lives of integrity. We offer countless leadership opportunities, avenues for community service, scholarships, and much more.";

export default function HomePage() {
  return (
    <div className="space-y-8 lg:space-y-10">
      <HomeSlideshow />

      <section className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--shell-bg)] p-6 shadow-[0_28px_76px_-48px_var(--shadow-soft)] backdrop-blur sm:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="max-w-2xl space-y-5 md:pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
              About Penn State Triangle
            </p>
            <p className="text-base leading-8 text-[color:var(--muted-strong)] sm:text-lg">
              {aboutIntroduction}
            </p>

            <div className="border-l-[3px] border-[var(--triangle-rose)] bg-[linear-gradient(135deg,rgba(153,0,51,0.06),rgba(255,255,255,0.52))] px-5 py-5 sm:pl-6">
              <p className="font-display text-[2rem] leading-[1.02] text-[color:var(--foreground)]">
                &ldquo;{homeContent.quote}&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-[#8d5e67]">
                {homeContent.quoteAttribution}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/join/introduction"
                className="rounded-md bg-[var(--triangle-rose)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-[rgba(156,43,62,0.22)] bg-[rgba(156,43,62,0.05)] px-5 py-3 text-sm font-semibold text-[var(--triangle-rose)] transition hover:bg-[rgba(156,43,62,0.12)]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden rounded-[2.6rem_2rem_2rem_3.4rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted-strong)] shadow-[0_30px_80px_-45px_var(--shadow-strong)]">
            <Image
              src="/media/triangle-house.jpg"
              alt="Triangle Fraternity chapter house"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.04),rgba(7,17,31,0.34))]" />
          </div>
        </div>

        <div className="relative mt-8 min-h-[17rem] border-t border-[color:var(--surface-dark-border)] pt-9 text-center sm:mt-10 sm:min-h-[20rem] sm:pt-10 lg:min-h-[23rem]">
          <div className="pointer-events-none absolute inset-x-2 inset-y-0 sm:inset-x-6 lg:inset-x-10">
            <Image
              src="/media/triangle-coa.png"
              alt=""
              fill
              sizes="100vw"
              className="object-contain object-center opacity-[0.09] saturate-0"
            />
          </div>

          <div className="relative mx-auto flex min-h-[12rem] max-w-4xl flex-col items-center justify-center sm:min-h-[14rem] lg:min-h-[16rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8d5e67]">
              Chapter Purpose
            </p>
            <h1 className="font-display mt-4 text-3xl font-bold leading-[0.98] text-[color:var(--foreground)] sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
              Balanced men in engineering, architecture, and science.
            </h1>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <article className="rounded-[1.15rem] border border-[color:var(--surface-dark-border)] bg-[linear-gradient(180deg,rgba(255,253,248,0.9),rgba(255,250,245,0.84))] p-6 shadow-[0_22px_62px_-50px_var(--shadow-soft)]">
          <div className="border-b border-[color:var(--surface-dark-border)] pb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
              Values and Code Ethics
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--muted)]">
              {homeContent.valuesIntro}
            </p>
          </div>

          <ol className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {homeContent.values.map((value, index) => (
              <li
                key={value}
                className="border-l border-[color:var(--surface-dark-border)] pl-4 text-sm leading-relaxed text-[color:var(--muted-strong)]"
              >
                <span className="mb-2 block font-display text-[1.45rem] leading-none text-[var(--triangle-rose)]">
                  {`Value ${index + 1}`}
                </span>
                {value}
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-[1.15rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-strong)] p-6 shadow-[0_22px_62px_-50px_var(--shadow-soft)]">
          <div className="border-l-[3px] border-[var(--triangle-rose)] pl-5">
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
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join/introduction"
              className="rounded-md bg-[var(--triangle-rose)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)]"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-[rgba(156,43,62,0.22)] bg-[rgba(156,43,62,0.05)] px-4 py-2 text-sm font-semibold text-[var(--triangle-rose)] transition hover:bg-[rgba(156,43,62,0.12)]"
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ddb2b9]">
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
              className="rounded-full border border-[#ddb2b9]/40 bg-white/6 px-4 py-2 text-sm font-semibold text-[#f3d8dd] transition hover:bg-[rgba(156,43,62,0.2)]"
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
