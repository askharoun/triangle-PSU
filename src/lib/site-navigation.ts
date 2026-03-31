export type NavigationLeaf = {
  external?: boolean;
  href: string;
  label: string;
  placeholder?: boolean;
};

export type NavigationItem = {
  children?: NavigationLeaf[];
  external?: boolean;
  href?: string;
  label: string;
};

export type NavigationSection = {
  id: string;
  items: NavigationItem[];
};

export type NavigationRoute = {
  href: string;
  label: string;
  placeholder: boolean;
  trail: string[];
};

export const navigationSections: NavigationSection[] = [
  {
    id: "main",
    items: [
      { href: "/", label: "Home" },
      {
        label: "Join",
        children: [
          { href: "/join/introduction", label: "Introduction" },
          { href: "/join/benefits", label: "Benefits" },
          { href: "/join/eligibility", label: "Eligibility" },
          { href: "/join/faqs", label: "FAQs" },
          { href: "/join/becoming-a-member", label: "Becoming a Member" },
          { href: "/join/interested", label: "Interested?" },
        ],
      },
      {
        label: "About",
        children: [
          { href: "/about/local-history", label: "Local History" },
          {
            external: true,
            href: "https://www.triangle.org/",
            label: "Triangle National",
          },
          { href: "/about/our-alumni", label: "Our Alumni" },
          { href: "/about/for-parents", label: "For Parents" },
          {
            external: true,
            href: "https://orgcentral.psu.edu/organization/triangle-fraternity",
            label: "Constitution",
          },
          {
            href: "/about/location-and-directions",
            label: "Location and Directions",
          },
          {
            href: "/about/our-chapter-home",
            label: "Our Chapter Home",
            placeholder: true,
          },
        ],
      },
      { href: "/events", label: "Events" },
      { href: "/scholarships", label: "Scholarships" },
      {
        label: "Donations",
        children: [
          { href: "/donations", label: "Donations" },
          { href: "/donations/current-donors", label: "Current Donors" },
        ],
      },
      { href: "/news", label: "News" },
      {
        label: "Contact",
        children: [
          { href: "/contact", label: "Contact Us" },
          {
            href: "/contact/undergraduate-president",
            label: "Undergraduate President",
          },
          {
            href: "/contact/vice-president-of-external-affairs",
            label: "Vice President of External Affairs",
          },
          { href: "/contact/homecoming-chair", label: "Homecoming Chair" },
          { href: "/contact/recruitment-chair", label: "Recruitment Chair" },
          { href: "/contact/thon-chair", label: "THON Chair" },
          { href: "/contact/alumni-president", label: "Alumni President" },
        ],
      },
      {
        label: "Alumni Resources",
        children: [
          { href: "/alumni-resources", label: "Alumni Resources" },
          {
            href: "/alumni-resources/chapter-eternal",
            label: "Chapter Eternal",
          },
        ],
      },
      { href: "/brotherhood", label: "Brotherhood" },
    ],
  },
];

export const navigationRoutes: NavigationRoute[] = navigationSections.flatMap(
  (section) =>
    section.items.flatMap((item) => {
      if (item.href) {
        if (item.external) {
          return [];
        }

        return [
          {
            href: item.href,
            label: item.label,
            placeholder: false,
            trail: [item.label],
          },
        ];
      }

      return (item.children ?? [])
        .filter((child) => !child.external)
        .map((child) => ({
          href: child.href,
          label: child.label,
          placeholder: child.placeholder ?? false,
          trail: [item.label, child.label],
        }));
    }),
);

export function findNavigationRoute(slug: string[]) {
  const path = `/${slug.join("/")}`;

  return navigationRoutes.find((route) => route.href === path);
}
