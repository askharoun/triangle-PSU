"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { Fragment, useState } from "react";

import {
  navigationSections,
  type NavigationItem,
  type NavigationLeaf,
} from "../lib/site-navigation";

function NavLink({
  children,
  className,
  href,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
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

function itemIsActive(item: NavigationItem, pathname: string) {
  if (item.href) {
    return pathname === item.href;
  }

  return item.children?.some((child) => pathname === child.href) ?? false;
}

function childIsActive(child: NavigationLeaf, pathname: string) {
  return pathname === child.href;
}

function TopLevelLink({
  active,
  href,
  label,
}: {
  active: boolean;
  href: string;
  label: string;
}) {
  return (
    <NavLink
      href={href}
      className={`rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
        active
          ? "bg-[var(--triangle-rose)] text-white shadow-[0_16px_30px_-20px_rgba(153,0,51,0.95)]"
          : "text-white/82 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </NavLink>
  );
}

function DropdownMenu({
  active,
  isOpen,
  item,
  onClose,
  onOpen,
  onToggle,
  pathname,
}: {
  active: boolean;
  isOpen: boolean;
  item: NavigationItem;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
  pathname: string;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocusCapture={onOpen}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={onToggle}
        className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
          active || isOpen
            ? "bg-white text-[var(--psu-navy)] shadow-[0_16px_36px_-24px_rgba(0,30,68,0.95)]"
            : "text-white/82 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""} ${
            active || isOpen ? "text-[var(--triangle-rose)]" : "text-[var(--psu-pugh)]"
          }`}
        />
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-3 w-[19rem] overflow-hidden rounded-[1.4rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)] shadow-[0_28px_70px_-36px_var(--shadow-strong)]"
        >
          <div className="bg-[linear-gradient(135deg,var(--header-start),var(--header-end))] px-5 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-white/74">
              Explore the pages in this section.
            </p>
          </div>

          <ul className="p-3">
            {item.children?.map((child) => {
              const activeChild = childIsActive(child, pathname);

              return (
                <li key={child.href}>
                  <NavLink
                    href={child.href}
                    className={`flex items-center justify-between gap-4 rounded-2xl px-3 py-3 text-sm transition ${
                      activeChild
                        ? "bg-[color:var(--surface-muted)] text-[color:var(--foreground)]"
                        : "text-[color:var(--muted-strong)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)]"
                    }`}
                  >
                    <span className="font-medium">{child.label}</span>
                    {child.placeholder ? (
                      <span className="rounded-full border border-[color:var(--triangle-gray)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted)]">
                        Placeholder
                      </span>
                    ) : null}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MobileSection({
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
  const active = itemIsActive(item, pathname);

  if (item.href) {
    return (
      <NavLink
        href={item.href}
        onClick={onNavigate}
        className={`block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          active
            ? "bg-white text-[var(--psu-navy)]"
            : "bg-white/6 text-white/86 hover:bg-white/12 hover:text-white"
        }`}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition ${
          active || expanded ? "text-white" : "text-white/82 hover:text-white"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--psu-pugh)] transition ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded ? (
        <ul className="space-y-1 px-3 pb-3">
          {item.children?.map((child) => {
            const activeChild = childIsActive(child, pathname);

            return (
              <li key={child.href}>
                <NavLink
                  href={child.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm transition ${
                    activeChild
                      ? "bg-[var(--psu-pugh)] text-[var(--psu-navy)]"
                      : "text-white/74 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{child.label}</span>
                  {child.placeholder ? (
                    <span className="rounded-full border border-white/30 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      Placeholder
                    </span>
                  ) : null}
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function SiteNavigationInner({
  pathname,
}: {
  pathname: string;
}) {
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Main" className="relative">
      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setMobileOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/16 lg:hidden"
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span>Menu</span>
      </button>

      <div className="hidden items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/6 p-1.5 lg:flex">
        {navigationSections.map((section, sectionIndex) => (
          <Fragment key={section.id}>
            <div className="flex items-center gap-1 xl:gap-2">
              {section.items.map((item) => {
                const active = itemIsActive(item, pathname);

                if (item.href) {
                  return (
                    <TopLevelLink
                      key={item.href}
                      active={active}
                      href={item.href}
                      label={item.label}
                    />
                  );
                }

                const open = desktopOpen === item.label;

                return (
                  <DropdownMenu
                    key={item.label}
                    active={active}
                    isOpen={open}
                    item={item}
                    onClose={() => setDesktopOpen(null)}
                    onOpen={() => setDesktopOpen(item.label)}
                    onToggle={() =>
                      setDesktopOpen((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    pathname={pathname}
                  />
                );
              })}
            </div>

            {sectionIndex < navigationSections.length - 1 ? (
              <span aria-hidden="true" className="h-7 w-px bg-white/16 xl:mx-1" />
            ) : null}
          </Fragment>
        ))}
      </div>

      {mobileOpen ? (
        <div className="absolute right-0 top-full z-50 mt-4 w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-[color:var(--surface-dark-border)] bg-[linear-gradient(180deg,var(--header-start),var(--header-end))] p-4 text-white shadow-[0_28px_80px_-28px_var(--shadow-strong)] lg:hidden">
          <div className="mb-4 rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--psu-pugh)]">
              Main Navigation
            </p>
            <p className="mt-2 text-sm text-white/72">
              Dropdown sections are expanded here as tap targets for mobile.
            </p>
          </div>

          <div className="space-y-4">
            {navigationSections.map((section) => (
              <div
                key={section.id}
                className="space-y-2 rounded-[1.75rem] border border-white/10 bg-white/4 p-3"
              >
                {section.items.map((item) => (
                  <MobileSection
                    key={item.href ?? item.label}
                    expanded={mobileExpanded === item.label}
                    item={item}
                    onNavigate={() => setMobileOpen(false)}
                    onToggle={() =>
                      setMobileExpanded((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    pathname={pathname}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();

  return <SiteNavigationInner key={pathname} pathname={pathname} />;
}
