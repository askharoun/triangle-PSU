"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Slide = {
  alt: string;
  description: string;
  eyebrow: string;
  imageSrc: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  title: string;
};

const SLIDE_DURATION_MS = 6500;

const slides: Slide[] = [
  {
    alt: "Penn State Triangle chapter banner",
    description:
      "A rebuilt Penn State Triangle site for chapter life, recruitment, scholarships, events, and alumni connection.",
    eyebrow: "Penn State Triangle",
    imageSrc: "/media/triangle-banner.jpg",
    primaryHref: "/join/introduction",
    primaryLabel: "Explore Membership",
    secondaryHref: "/events",
    secondaryLabel: "View Events",
    title: "A chapter built for engineers, architects, and scientists.",
  },
  {
    alt: "Triangle Fraternity chapter house at Penn State",
    description:
      "The chapter house remains a physical center for brotherhood, scholarship, and long-term community in State College.",
    eyebrow: "Chapter Home",
    imageSrc: "/media/triangle-house.jpg",
    primaryHref: "/about/our-chapter-home",
    primaryLabel: "Chapter Home",
    secondaryHref: "/about/location-and-directions",
    secondaryLabel: "Location",
    title: "A Penn State presence rooted in place, tradition, and daily chapter life.",
  },
  {
    alt: "Triangle Fraternity brotherhood at Penn State",
    description:
      "Triangle creates room for leadership, service, and the kind of friendships that stay intact long after graduation.",
    eyebrow: "Brotherhood",
    imageSrc: "/media/triangle-brotherhood.jpg",
    primaryHref: "/brotherhood",
    primaryLabel: "See Brotherhood",
    secondaryHref: "/news",
    secondaryLabel: "Latest News",
    title: "Brotherhood with academic purpose and professional ambition.",
  },
];

export function HomeSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      aria-label="Featured chapter slideshow"
      className="relative overflow-hidden rounded-[2.4rem_2rem_2rem_3.4rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-dark)] shadow-[0_32px_90px_-48px_var(--shadow-strong)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative min-h-[28rem] sm:min-h-[32rem] lg:min-h-[36rem]">
        {slides.map((slide, index) => (
          <div
            key={slide.imageSrc}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,18,0.84),rgba(5,11,18,0.4)_48%,rgba(5,11,18,0.6)),linear-gradient(180deg,rgba(156,43,62,0.06),transparent_30%,rgba(5,11,18,0.24))]" />
          </div>
        ))}

        <div className="relative z-10 flex min-h-[28rem] items-end sm:min-h-[32rem] lg:min-h-[36rem] lg:items-center">
          <div className="w-full px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#ddb2b9]">
                {slides[activeIndex]?.eyebrow}
              </p>
              <h2 className="font-display mt-4 text-4xl leading-[0.92] text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]">
                {slides[activeIndex]?.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">
                {slides[activeIndex]?.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={slides[activeIndex]?.primaryHref ?? "/join/introduction"}
                  className="button-primary rounded-full px-5 py-3 text-sm font-semibold"
                >
                  {slides[activeIndex]?.primaryLabel}
                </Link>
                <Link
                  href={slides[activeIndex]?.secondaryHref ?? "/events"}
                  className="button-secondary-inverse rounded-full px-5 py-3 text-sm font-semibold"
                >
                  {slides[activeIndex]?.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[rgba(7,17,31,0.5)] px-3 py-2 backdrop-blur sm:absolute sm:bottom-5 sm:left-1/2 sm:mb-0 sm:-translate-x-1/2">
          {slides.map((slide, index) => (
            <button
              key={slide.imageSrc}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeIndex}
              className={`carousel-dot ${index === activeIndex ? "carousel-dot-active" : ""}`.trim()}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            className="button-overlay"
            onClick={goToPrevious}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="button-overlay"
            onClick={goToNext}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
