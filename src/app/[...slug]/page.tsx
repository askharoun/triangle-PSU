import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { routeSummaries } from "../../lib/site-content";
import {
  findNavigationRoute,
  navigationRoutes,
} from "../../lib/site-navigation";

type RouteParams = {
  slug: string[];
};

export const dynamicParams = false;

export function generateStaticParams() {
  return navigationRoutes.map((route) => ({
    slug: route.href.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = findNavigationRoute(slug);

  if (!route) {
    return {};
  }

  return {
    title: route.label,
    description: `Triangle Fraternity at Penn State page for ${route.trail.join(" / ")}.`,
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const route = findNavigationRoute(slug);

  if (!route) {
    notFound();
  }

  const sectionLabel =
    route.trail.length > 1 ? route.trail[route.trail.length - 2] : "Main";
  const summary =
    routeSummaries[route.href] ??
    "This page is connected to the updated Penn State Triangle navigation structure and is ready for section-specific content.";

  return (
    <section className="rounded-[1.3rem] border border-[color:var(--surface-dark-border)] bg-[color:var(--shell-bg)] p-6 shadow-[0_26px_72px_-50px_var(--shadow-soft)] backdrop-blur sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--muted)]">
        <Link
          href="/"
          className="font-medium text-[var(--psu-beaver)] hover:text-[var(--foreground)]"
        >
          Home
        </Link>
        {route.trail.map((segment) => (
          <span key={segment} className="flex items-center gap-3">
            <span aria-hidden="true" className="text-[var(--triangle-gray)]">
              /
            </span>
            <span>{segment}</span>
          </span>
        ))}
      </div>

      <div className="mt-8 max-w-3xl space-y-6">
        <div className="border-b border-[color:var(--surface-dark-border)] pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--triangle-rose)]">
            {sectionLabel}
          </p>
          <h1 className="font-display mt-3 text-5xl leading-[0.94] text-[color:var(--foreground)]">
            {route.label}
          </h1>
        </div>

        <p className="text-lg leading-relaxed text-[color:var(--muted)]">
          {route.placeholder
            ? "This placeholder page is wired into the navigation so the requested menu hierarchy is complete and the future chapter home section has a stable destination."
            : summary}
        </p>

        <div className="border-l-[3px] border-[var(--triangle-rose)] bg-[linear-gradient(135deg,rgba(153,0,51,0.06),rgba(255,255,255,0.52))] px-5 py-4 text-sm leading-relaxed text-[color:var(--foreground)]">
          The content area is ready for the corresponding section material. The
          route is already linked from the navigation tree with the correct
          parent-child relationship.
        </div>
      </div>
    </section>
  );
}
