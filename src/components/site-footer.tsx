import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import deltaTLogo from "../../Assets/Logos/Delta_T.png";

const ribbonWords = ["Friendship", "Stability", "Character"];
const visitLinks = [
  { href: "/about/location-and-directions", label: "Location and Directions" },
];
const footerGroups = [
  {
    links: [
      { href: "/events", label: "Events" },
      { href: "/news", label: "News" },
      { href: "/scholarships", label: "Scholarships" },
      { href: "/brotherhood", label: "Brotherhood" },
    ],
    title: "Explore",
  },
  {
    links: [
      { href: "/join/introduction", label: "Join" },
      { href: "/about/local-history", label: "About" },
      { href: "/alumni-resources", label: "Alumni Resources" },
      { href: "/donations", label: "Donations" },
    ],
    title: "Chapter",
  },
  {
    links: [
      { href: "/contact", label: "Contact Us" },
      {
        href: "/contact/undergraduate-president",
        label: "Undergraduate President",
      },
      { href: "/contact/recruitment-chair", label: "Recruitment Chair" },
      { href: "/contact/alumni-president", label: "Alumni President" },
    ],
    title: "Contact",
  },
];

function FooterLink({
  accent = false,
  href,
  label,
}: {
  accent?: boolean;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex w-fit pb-1 text-sm leading-none transition duration-200 ${
        accent
          ? "font-semibold text-[var(--psu-pugh)] hover:text-white"
          : "font-medium text-white/76 hover:text-white"
      }`}
    >
      <span>{label}</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
    </Link>
  );
}

function RibbonSeparator() {
  return (
    <span className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center">
      <Image
        src={deltaTLogo}
        alt=""
        width={40}
        height={35}
        className="absolute left-1/2 top-1/2 h-[2.45rem] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 brightness-0 invert opacity-95"
      />
    </span>
  );
}

export function SiteFooter() {
  const footerColumns = [
    { accent: true, links: visitLinks, title: "Visit" },
    ...footerGroups.map((group) => ({ ...group, accent: false })),
  ];

  return (
    <footer className="mt-6 overflow-hidden border-t-4 border-[var(--triangle-rose)] bg-[linear-gradient(180deg,var(--surface-dark),var(--surface-dark-strong))] text-[var(--text-on-dark)] shadow-[0_30px_80px_-48px_var(--shadow-strong)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(220px,255px)_1fr] lg:items-center lg:px-8">
        <div className="flex flex-col items-center border-b border-white/10 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
          <Image
            src="/media/triangle-coa.png"
            alt="Triangle coat of arms"
            width={290}
            height={369}
            className="h-auto w-[11.75rem] sm:w-[13.5rem] lg:w-[14.75rem] xl:w-[15.25rem]"
          />

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
            Penn State Chapter
          </p>
        </div>

        <div className="w-full py-1">
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
            {footerColumns.map((group) => (
              <div key={group.title} className="min-w-0">
                <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--psu-pugh)]">
                {group.title}
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <FooterLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      accent={group.accent}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/8 bg-[linear-gradient(180deg,rgba(8,19,35,0.72),rgba(7,16,29,0.92))] py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--surface-dark-strong)] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--surface-dark-strong)] to-transparent sm:w-24" />

        <div className="mb-3 flex items-center justify-center gap-3 px-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--psu-pugh)] sm:px-6 lg:px-8">
          <span className="h-px w-10 bg-[var(--psu-pugh)]/30" />
          Chapter Ideals
          <span className="h-px w-10 bg-[var(--psu-pugh)]/30" />
        </div>

        <div className="footer-ribbon overflow-hidden">
          <div className="footer-wheel-track" style={{ animationDuration: "14s" }}>
            {Array.from({ length: 4 }).map((_, loopIndex) => (
              <div key={loopIndex} className="footer-wheel-set">
                {ribbonWords.map((word, wordIndex) => (
                  <Fragment key={`${loopIndex}-${word}`}>
                    {wordIndex > 0 ? <RibbonSeparator /> : null}
                    <span className="footer-ribbon-word inline-flex items-center justify-center px-5 font-display text-[2.2rem] italic tracking-[0.045em] sm:px-6 sm:text-[2.55rem]">
                      {word}
                    </span>
                  </Fragment>
                ))}
                <RibbonSeparator />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
