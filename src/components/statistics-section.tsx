"use client";

import { useEffect, useRef, useState } from "react";

type StatisticTone = "blue" | "gold" | "rose";

type Statistic = {
  label: string;
  note: string;
  tone: StatisticTone;
  value: number;
};

const COUNT_UP_DURATION_MS = 1400;
const COUNT_UP_INTERVAL_MS = 32;

const statistics: Statistic[] = [
  {
    label: "Total Initiates",
    note: "Members inducted across generations of Triangle's national network.",
    tone: "rose",
    value: 31988,
  },
  {
    label: "Current Active Members",
    note: "Students participating in chapters and colonies right now.",
    tone: "blue",
    value: 1355,
  },
  {
    label: "Living Alumni",
    note: "Graduates who still extend the reach and memory of the fraternity.",
    tone: "gold",
    value: 22200,
  },
  {
    label: "Active Chapters",
    note: "Established chapters operating across the broader Triangle system.",
    tone: "rose",
    value: 34,
  },
  {
    label: "Active Colonies and Interest Groups",
    note: "Emerging groups still building toward full chapter strength.",
    tone: "blue",
    value: 3,
  },
  {
    label: "States",
    note: "Geographic reach across the United States.",
    tone: "gold",
    value: 25,
  },
];

const highlightFacts = [
  { label: "Founded", value: "1907" },
  { label: "Penn State Chapter", value: "1928" },
  { label: "Academic Focus", value: "STEM" },
] as const;

const zeroCounts = statistics.map(() => 0);
const finalCounts = statistics.map((statistic) => statistic.value);
const numberFormatter = new Intl.NumberFormat("en-US");

const toneStyles: Record<
  StatisticTone,
  {
    number: string;
    rule: string;
  }
> = {
  blue: {
    number: "text-[#dcefff]",
    rule: "from-[#96bee6] via-[#cfe4f7] to-transparent",
  },
  gold: {
    number: "text-[#f8e7b9]",
    rule: "from-[#e8cf99] via-[#f8edd1] to-transparent",
  },
  rose: {
    number: "text-[#f3ccd4]",
    rule: "from-[#9c2b3e] via-[#e8a5b0] to-transparent",
  },
};

function countsMatch(left: number[], right: number[]) {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

export function StatisticsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [counts, setCounts] = useState<number[]>(zeroCounts);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const clearCounterInterval = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startCountUp = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        setCounts(finalCounts);
        return;
      }

      const startTime = performance.now();

      const updateCounts = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / COUNT_UP_DURATION_MS, 1);
        const easedProgress = easeOutCubic(progress);
        const nextCounts = statistics.map((statistic) =>
          Math.round(statistic.value * easedProgress),
        );

        setCounts((previousCounts) =>
          countsMatch(previousCounts, nextCounts) ? previousCounts : nextCounts,
        );

        if (progress >= 1) {
          setCounts(finalCounts);
          clearCounterInterval();
        }
      };

      updateCounts();
      intervalRef.current = window.setInterval(
        updateCounts,
        COUNT_UP_INTERVAL_MS,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        startCountUp();
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearCounterInterval();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="triangle-statistics-heading"
      className="relative overflow-hidden rounded-[1.7rem] border border-[color:var(--surface-dark-border)] bg-[linear-gradient(135deg,#06101d_0%,#09192c_50%,#10233d_100%)] px-6 py-8 text-[var(--text-on-dark)] shadow-[0_30px_80px_-48px_var(--shadow-strong)] sm:px-8 sm:py-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.14]" />
      <div className="pointer-events-none absolute left-[-3rem] top-[-2rem] h-44 w-44 rounded-full bg-[rgba(156,43,62,0.2)] blur-3xl" />
      <div className="pointer-events-none absolute right-[-4rem] bottom-[-2rem] h-52 w-52 rounded-full bg-[rgba(150,190,230,0.12)] blur-3xl" />

      <div className="relative">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)] lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-11 bg-[linear-gradient(90deg,#ddb2b9,transparent)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f1d9de]">
                Triangle By The Numbers
              </p>
            </div>

            <h2
              id="triangle-statistics-heading"
              className="font-display mt-5 max-w-4xl text-[2.6rem] leading-[0.9] text-white sm:text-[3.15rem] lg:text-[3.45rem]"
            >
              National depth behind the Penn State chapter.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-[1.02rem]">
              These figures show the scale of the Triangle network that sits
              behind Penn State, from chapter reach today to the alumni base
              built over time.
            </p>
          </div>

          <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] px-5 py-4 shadow-[0_20px_52px_-38px_rgba(0,0,0,0.58)] backdrop-blur">
            {highlightFacts.map((fact, index) => (
              <div
                key={fact.label}
                className={`${index < highlightFacts.length - 1 ? "mb-4 border-b border-white/10 pb-4" : ""}`.trim()}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ddb2b9]">
                  {fact.label}
                </p>
                <p className="font-mono mt-2 text-[1.85rem] font-semibold leading-none tracking-[-0.04em] text-white">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {statistics.map((statistic, index) => {
            const tone = toneStyles[statistic.tone];
            const formattedCount = numberFormatter.format(counts[index] ?? 0);
            const formattedFinalValue = numberFormatter.format(statistic.value);

            return (
              <div
                key={statistic.label}
                className="rounded-[1.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] px-5 py-5 shadow-[0_22px_58px_-42px_rgba(0,0,0,0.55)] transition-colors duration-200 hover:border-white/16"
              >
                <div
                  className={`h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,var(--tw-gradient-stops))] ${tone.rule}`.trim()}
                />

                <dt className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76">
                  {statistic.label}
                </dt>

                <dd
                  className={`mt-5 inline-block font-mono text-[3rem] font-semibold leading-none tracking-[-0.05em] tabular-nums sm:text-[3.3rem] ${tone.number}`.trim()}
                  style={{ minWidth: `${formattedFinalValue.length}ch` }}
                >
                  {formattedCount}
                </dd>

                <p className="mt-4 max-w-[28rem] text-sm leading-relaxed text-white/60">
                  {statistic.note}
                </p>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
