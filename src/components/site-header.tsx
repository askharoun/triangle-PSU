"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import triangleLogo from "../../Assets/Logos/Triangle+Logo (2).png";

import { navigationSections, type NavigationItem, type NavigationLeaf } from "../lib/site-navigation";

import { ThemeToggle } from "./theme-toggle";
import styles from "./site-header.module.css";

const navigationItems = navigationSections.flatMap((section) => section.items);
const ACTION_ICON_SIZE = 20;

function FacebookIcon({
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
      <path d="M9 21h6a6 6 0 0 0 6-6V9a6 6 0 0 0-6-6H9a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6Z" />
      <path d="M14.5 8H13a2 2 0 0 0-2 2v2h3.2l-.45 3H11v5" />
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

const socialLinks = [
  {
    href: "https://www.facebook.com/PSUTriangle",
    icon: FacebookIcon,
    label: "Penn State Triangle Fraternity on Facebook",
    shortLabel: "Facebook",
  },
  {
    href: "https://www.instagram.com/trianglepsu/",
    icon: InstagramIcon,
    label: "Penn State Triangle Fraternity on Instagram",
    shortLabel: "Instagram",
  },
  {
    href: "https://www.triangle.org/",
    icon: Globe,
    label: "Triangle Nationals Website",
    shortLabel: "Triangle Nationals",
  },
] as const;

function SignInButton({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      className={mobile ? styles.mobileSignInButton : styles.signInButton}
      title="Authentication placeholder for future Supabase sign in"
    >
      Sign In
    </button>
  );
}

function isItemActive(item: NavigationItem, pathname: string) {
  if (item.href) {
    return pathname === item.href;
  }

  return item.children?.some((child) => pathname === child.href) ?? false;
}

function isChildActive(child: NavigationLeaf, pathname: string) {
  return pathname === child.href;
}

function NavAnchor({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
}) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function DesktopItem({
  active,
  alignEnd,
  isOpen,
  item,
  onClose,
  onOpen,
  onToggle,
  pathname,
}: {
  active: boolean;
  alignEnd: boolean;
  isOpen: boolean;
  item: NavigationItem;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
  pathname: string;
}) {
  if (item.href) {
    return (
      <li className={styles.navItem}>
        <NavAnchor
          href={item.href}
          className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`.trim()}
        >
          {item.label}
        </NavAnchor>
      </li>
    );
  }

  return (
    <li
      className={styles.navItem}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`${styles.dropdownToggle} ${active || isOpen ? styles.dropdownActive : ""}`.trim()}
        onClick={onToggle}
        onFocus={onOpen}
      >
        <span>{item.label}</span>
        <ChevronDown size={16} className={styles.dropdownChevron} />
      </button>

      {isOpen ? (
        <div
          className={`${styles.dropdownPanel} ${alignEnd ? styles.dropdownPanelEnd : ""}`.trim()}
          role="menu"
        >
          <div className={styles.dropdownHeader}>
            <p className={styles.dropdownEyebrow}>{item.label}</p>
            <p className={styles.dropdownTitle}>Explore this chapter section.</p>
          </div>

          <ul className={styles.dropdownList}>
            {item.children?.map((child) => (
              <li key={child.href}>
                <NavAnchor
                  href={child.href}
                  className={isChildActive(child, pathname) ? styles.dropdownLinkActive : undefined}
                >
                  <span>{child.label}</span>
                  {child.placeholder ? (
                    <span className={styles.dropdownBadge}>Placeholder</span>
                  ) : null}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function SocialLinks({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  if (mobile) {
    return (
      <ul className={styles.mobileSocialList}>
        {socialLinks.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={styles.mobileSocialLink}
              >
                <Icon size={ACTION_ICON_SIZE} />
                <span>{link.shortLabel}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={styles.socialList}>
      {socialLinks.map((link) => {
        const Icon = link.icon;

        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              title={link.shortLabel}
              className={styles.socialLink}
            >
              <Icon size={ACTION_ICON_SIZE} />
              <span className={styles.srOnly}>{link.shortLabel}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function MobileItem({
  expanded,
  item,
  onNavigate,
  onToggle,
  pathname,
}: {
  expanded: boolean;
  item: NavigationItem;
  onNavigate: () => void;
  onToggle: () => void;
  pathname: string;
}) {
  if (item.href) {
    return (
      <li className={styles.mobileItem}>
        <NavAnchor href={item.href} className={styles.mobileLink} onClick={onNavigate}>
          <span>{item.label}</span>
        </NavAnchor>
      </li>
    );
  }

  return (
    <li className={styles.mobileItem}>
      <button
        type="button"
        aria-expanded={expanded}
        className={`${styles.mobileToggle} ${expanded ? styles.mobileToggleExpanded : ""}`.trim()}
        onClick={onToggle}
      >
        <span>{item.label}</span>
        <ChevronDown size={18} />
      </button>

      {expanded ? (
        <div className={styles.mobileChildren}>
          {item.children?.map((child) => (
            <NavAnchor
              key={child.href}
              href={child.href}
              onClick={onNavigate}
              className={isChildActive(child, pathname) ? styles.mobileChildActive : undefined}
            >
              <span>{child.label}</span>
              {child.placeholder ? (
                <span className={styles.dropdownBadge}>Placeholder</span>
              ) : null}
            </NavAnchor>
          ))}
        </div>
      ) : null}
    </li>
  );
}

function SiteHeaderInner({
  pathname,
}: {
  pathname: string;
}) {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
        setExpandedMobile(null);
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setExpandedMobile(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`.trim()}
    >
      <div className={styles.shell}>
        <Link href="/" className={styles.brand} aria-label="Triangle Fraternity Penn State Chapter home">
          <Image
            src={triangleLogo}
            alt="Triangle Fraternity Penn State Chapter"
            className={styles.brandLogo}
            priority
          />

          <span className={styles.brandSubtitle}>Penn State Chapter</span>
        </Link>

        <div className={styles.desktopRegion}>
          <nav className={styles.nav} aria-label="Primary navigation">
            <ul className={styles.list}>
              {navigationItems.map((item, index) => {
                const active = isItemActive(item, pathname);
                const isOpen = openDropdown === item.label;

                return (
                  <DesktopItem
                    key={item.href ?? item.label}
                    active={active}
                    alignEnd={index >= navigationItems.length - 3}
                    isOpen={isOpen}
                    item={item}
                    onClose={() => setOpenDropdown(null)}
                    onOpen={() => setOpenDropdown(item.label)}
                    onToggle={() =>
                      setOpenDropdown((current) => (current === item.label ? null : item.label))
                    }
                    pathname={pathname}
                  />
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <SocialLinks />
            <ThemeToggle />
            <SignInButton />
          </div>
        </div>

        <div className={styles.mobileControls}>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className={styles.menuButton}
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          className={styles.mobilePanel}
          aria-label="Mobile navigation"
        >
          <div className={styles.mobilePanelInner}>
            <p className={styles.mobileLead}>
              Navigate the Triangle Fraternity Penn State Chapter site.
            </p>

            <ul className={styles.mobileList}>
              {navigationItems.map((item) => (
                <MobileItem
                  key={item.href ?? item.label}
                  expanded={expandedMobile === item.label}
                  item={item}
                  onNavigate={() => setMobileOpen(false)}
                  onToggle={() =>
                    setExpandedMobile((current) => (current === item.label ? null : item.label))
                  }
                  pathname={pathname}
                />
              ))}
            </ul>

            <div className={styles.mobileFooter}>
              <div className={styles.mobileUtilityRow}>
                <div className={styles.mobileThemeBlock}>
                  <span className={styles.mobileFooterTitle}>Theme</span>
                  <ThemeToggle />
                </div>
                <SignInButton mobile />
              </div>

              <p className={styles.mobileFooterTitle}>Connect</p>
              <SocialLinks mobile />
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return <SiteHeaderInner key={pathname} pathname={pathname} />;
}
