import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
});

const themeInitScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem("triangle-theme");
      var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var theme = storedTheme || systemTheme;
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (error) {
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

export const metadata: Metadata = {
  title: {
    default: "Triangle Fraternity at Penn State",
    template: "%s | Triangle Fraternity at Penn State",
  },
  description:
    "Triangle Fraternity at Penn State chapter website with chapter information, contacts, events, scholarships, and alumni resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="relative isolate flex min-h-full flex-col overflow-hidden">
          <SiteHeader />

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
            <main className="flex-1">{children}</main>
          </div>

          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
