import Image from "next/image";
import Link from "next/link";

import awardsImage from "../../Assets/2026/Exec/Awards.jpg";

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

            <div className="chapter-surface-callout chapter-quote px-5 py-5 sm:pl-6">
              <p className="chapter-quote-text font-display">
                &ldquo;{homeContent.quote}&rdquo;
              </p>
              <p className="chapter-quote-attribution mt-3 text-sm font-medium uppercase tracking-[0.18em]">
                {homeContent.quoteAttribution}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/join/introduction"
                className="button-primary rounded-full px-5 py-3 text-sm font-semibold"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="button-secondary rounded-full px-5 py-3 text-sm font-semibold"
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
          <div className="pointer-events-none absolute inset-x-2 top-3 bottom-1 sm:inset-x-6 sm:top-4 sm:bottom-2 lg:inset-x-10 lg:top-5 lg:bottom-2">
            <Image
              src="/media/triangle-coa.png"
              alt=""
              fill
              sizes="100vw"
              className="site-watermark object-contain object-center"
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
        <article className="values-panel rounded-[1.15rem] border border-[color:var(--surface-dark-border)] p-6 shadow-[0_22px_62px_-50px_var(--shadow-soft)]">
          <div className="border-b border-[color:var(--surface-dark-border)] pb-5">
            <p className="values-eyebrow text-xs font-semibold uppercase tracking-[0.24em]">
              Values and Code Ethics
            </p>
            <p className="values-intro mt-3 max-w-3xl text-base leading-relaxed">
              {homeContent.valuesIntro}
            </p>
            <p className="values-lead mt-4 max-w-3xl text-sm font-semibold uppercase tracking-[0.16em]">
              {homeContent.valuesLeadIn}
            </p>
          </div>

          <ol className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {homeContent.values.map((value, index) => (
              <li
                key={value}
                className="values-item border-l border-[color:var(--surface-dark-border)] pl-4 text-sm leading-relaxed"
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
          <div className="chapter-surface-callout px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
              Discover Triangle
            </p>
            <p className="chapter-callout-title font-display mt-3">
              A chapter built around academic achievement, leadership, and
              brotherhood.
            </p>
            <p className="chapter-callout-body mt-4 text-base leading-relaxed">
              {homeContent.mission}
            </p>
          </div>

          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.35rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-muted-strong)] shadow-[0_18px_44px_-34px_var(--shadow-soft)]">
            <Image
              src={awardsImage}
              alt="Triangle brothers with awards"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 32vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0.04),rgba(7,17,31,0.18))]" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join/introduction"
              className="button-primary rounded-full px-4 py-2 text-sm font-semibold"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="button-secondary rounded-full px-4 py-2 text-sm font-semibold"
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
              className="button-primary rounded-full px-4 py-2 text-sm font-semibold"
            >
              Events
            </Link>
            <Link
              href="/news"
              className="button-secondary-inverse rounded-full px-4 py-2 text-sm font-semibold"
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
