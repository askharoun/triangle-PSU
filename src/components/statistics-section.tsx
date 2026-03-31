"use client";

import { useEffect, useRef, useState } from "react";

type Statistic = {
  label: string;
  value: number;
};

const COUNT_UP_DURATION_MS = 2500;

const statistics: Statistic[] = [
  { value: 31988, label: "Total Initiates" },
  { value: 1355, label: "Current Active Members" },
  { value: 22200, label: "Living Alumni" },
  { value: 34, label: "Active Chapters" },
  { value: 3, label: "Active Colonies/Interest Groups" },
  { value: 25, label: "States" },
];

const numberFormatter = new Intl.NumberFormat("en-US");

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [counts, setCounts] = useState<number[]>(statistics.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

    const startCountUp = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        setCounts(statistics.map((statistic) => statistic.value));
        return;
      }

      const startTime = performance.now();

      const updateCounts = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / COUNT_UP_DURATION_MS, 1);
        const easedProgress = easeOutCubic(progress);

        // Drive every counter from the same animation frame so the grid stays synchronized.
        setCounts(
          statistics.map((statistic) =>
            Math.round(statistic.value * easedProgress),
          ),
        );

        if (progress < 1) {
          animationFrameRef.current = window.requestAnimationFrame(updateCounts);
          return;
        }

        setCounts(statistics.map((statistic) => statistic.value));
        animationFrameRef.current = null;
      };

      animationFrameRef.current = window.requestAnimationFrame(updateCounts);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        // Only animate once, the first time the section enters the viewport.
        hasAnimatedRef.current = true;
        startCountUp();
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="triangle-statistics-heading"
      className="relative overflow-hidden rounded-[2.75rem_2rem_3rem_2rem] border border-[color:var(--surface-dark-border)] bg-[linear-gradient(135deg,var(--surface-dark),var(--surface-dark-strong))] px-6 py-8 text-[var(--text-on-dark)] shadow-[0_30px_80px_-48px_var(--shadow-strong)] sm:px-8 sm:py-10"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-52 w-52 rounded-full bg-[var(--triangle-rose)]/14 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[var(--psu-pugh)]/14 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
              Triangle By The Numbers
            </p>
            <h2
              id="triangle-statistics-heading"
              className="font-display mt-3 text-[2.45rem] leading-[0.92] text-white sm:text-[3rem]"
            >
              A fraternity network with real scale behind the Penn State
              chapter.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/74">
              These chapter, alumni, and membership figures give shape to the
              larger Triangle community that Penn State belongs to.
            </p>
          </div>

          <div className="inline-flex w-fit flex-col rounded-[1.7rem_1.7rem_1rem_1rem] border border-white/12 bg-white/6 px-5 py-4 shadow-[0_18px_48px_-34px_rgba(0,0,0,0.58)] backdrop-blur">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--psu-pugh)]">
              National Footprint
            </span>
            <span className="font-display mt-2 text-3xl leading-none text-white">
              1907
            </span>
            <span className="mt-1 text-sm text-white/68">Founded</span>
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 text-center md:grid-cols-2 xl:grid-cols-3">
          {statistics.map((statistic, index) => (
            <div
              key={statistic.label}
              className="rounded-[1.75rem_1.75rem_1.08rem_1.08rem] border border-white/10 bg-white/6 px-5 py-6 shadow-[0_20px_55px_-38px_rgba(0,0,0,0.55)] backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-[rgba(156,43,62,0.42)] hover:bg-white/8"
            >
              <div className="mx-auto h-1 w-12 rounded-full bg-[linear-gradient(90deg,#9c2b3e,#e8a5b0,#9c2b3e)]" />
              <dd className="mt-5 text-5xl font-light tracking-tight text-[#e3a2ac] tabular-nums sm:text-6xl">
                {numberFormatter.format(counts[index] ?? 0)}
              </dd>
              <dt className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/76 sm:text-[0.95rem]">
                {statistic.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
