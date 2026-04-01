import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Globe } from "lucide-react";

import deltaTLogo from "../../Assets/Logos/Delta_T.png";

const ribbonWords = ["Friendship", "Stability", "Character"];
const ribbonGroupCount = 6;
const visitLinks = [
  { href: "/about/location-and-directions", label: "Location and Directions" },
];
const socialLinks = [
  {
    href: "https://www.facebook.com/PSUTriangle",
    icon: FacebookIcon,
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/trianglepsu/",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/triangle-fraternity",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://www.triangle.org/",
    icon: Globe,
    label: "Triangle Nationals",
  },
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

function FacebookIcon({
  size = 18,
}: {
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M13.34 21v-7.08h2.38l.36-2.77h-2.74V9.38c0-.8.22-1.35 1.37-1.35h1.46V5.32c-.25-.04-1.13-.1-2.15-.1-2.13 0-3.59 1.3-3.59 3.69v2.24H8v2.77h2.43V21h2.91Z" />
    </svg>
  );
}

function InstagramIcon({
  size = 18,
}: {
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      <rect height="18" rx="5" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({
  size = 18,
}: {
  size?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M6.59 8.13a1.62 1.62 0 1 1 0-3.24 1.62 1.62 0 0 1 0 3.24ZM5.19 9.6h2.8V18h-2.8V9.6Zm4.39 0h2.68v1.16h.04c.37-.7 1.28-1.43 2.63-1.43 2.8 0 3.31 1.84 3.31 4.23V18h-2.8v-4.04c0-.97-.02-2.21-1.35-2.21-1.35 0-1.56 1.06-1.56 2.14V18H9.58V9.6Z" />
    </svg>
  );
}

function FooterLink({
  accent = false,
  href,
  label,
}: {
  accent?: boolean;
  href: string;
  label: string;
}) {
  const className = `group relative inline-flex w-fit pb-1 text-sm leading-none transition duration-200 ${
    accent
      ? "font-semibold text-[#ecd2d7] hover:text-white"
      : "font-medium text-white/72 hover:text-[#f7edf0]"
  }`;

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        <span>{label}</span>
        <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{label}</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
    </Link>
  );
}

function RibbonSeparator() {
  return (
    <span className="footer-ribbon-mark" aria-hidden="true">
      <Image
        src={deltaTLogo}
        alt=""
        width={28}
        height={25}
        className="footer-ribbon-mark-image"
      />
    </span>
  );
}

function FooterSocialLinks() {
  return (
    <ul className="footer-social-list" aria-label="Chapter social links">
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.label}
              className="footer-social-link"
            >
              <Icon size={18} />
              <span className="sr-only">{link.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteFooter() {
  const footerColumns = [
    { accent: true, links: visitLinks, title: "Visit" },
    ...footerGroups.map((group) => ({ ...group, accent: false })),
  ];

  return (
    <footer className="site-footer relative mt-10 text-[var(--text-on-dark)] shadow-[0_30px_80px_-48px_var(--shadow-strong)]">
      <div className="site-footer-shell relative overflow-hidden bg-[linear-gradient(180deg,#081323_0%,#0a1a2f_42%,#06101d_100%)]">
        <div className="pointer-events-none absolute left-[-4rem] top-8 h-40 w-40 rounded-full bg-[rgba(221,178,185,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-5rem] bottom-8 h-52 w-52 rounded-full bg-[rgba(150,190,230,0.08)] blur-3xl" />

        <div className="footer-top mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="footer-crest-panel relative flex flex-col items-center text-center">
            <Image
              src="/media/triangle-coa.png"
              alt="Triangle coat of arms"
              width={290}
              height={369}
              className="footer-coat-mark h-auto w-[10.5rem] sm:w-[11.75rem] lg:w-[12.5rem] xl:w-[13rem]"
            />

            <FooterSocialLinks />
          </div>

          <span className="footer-section-divider" aria-hidden="true" />

          <div className="footer-links-panel w-full py-1">
            <div className="footer-links-grid grid gap-x-10 gap-y-7 text-center min-[480px]:grid-cols-2 min-[480px]:text-left xl:grid-cols-4">
              {footerColumns.map((group) => (
                <div key={group.title} className="min-w-0">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#d7b8bf]">
                    {group.title}
                  </p>
                  <div className="mt-3 flex flex-col items-center gap-2.5 min-[480px]:items-start">
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

        <div className="footer-ribbon-shell">
          <p className="footer-ribbon-label">Chapter Ideals</p>
          <div className="footer-ribbon">
            <div className="footer-wheel-track" style={{ animationDuration: "38s" }}>
              {Array.from({ length: 2 }).map((_, groupIndex) => (
                <div
                  key={groupIndex}
                  className="footer-wheel-group"
                  aria-hidden={groupIndex > 0}
                >
                  {Array.from({ length: ribbonGroupCount }).map((__, loopIndex) => (
                    <div key={`${groupIndex}-${loopIndex}`} className="footer-wheel-set">
                      {ribbonWords.map((word, wordIndex) => (
                        <Fragment key={`${groupIndex}-${loopIndex}-${word}`}>
                          {wordIndex > 0 ? <RibbonSeparator /> : null}
                          <span className="footer-ribbon-word inline-flex items-center justify-center font-display italic">
                            {word}
                          </span>
                        </Fragment>
                      ))}
                      <RibbonSeparator />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
