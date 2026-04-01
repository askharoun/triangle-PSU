"use client";

import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page-utilities.module.css";

type Theme = "light" | "dark";

function applyStoredThemePreference() {
  try {
    const storedTheme = localStorage.getItem("triangle-theme");

    if (storedTheme !== "light" && storedTheme !== "dark") {
      return;
    }

    const root = document.documentElement;
    const theme = storedTheme as Theme;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch {
    // Ignore storage access failures and keep the current theme.
  }
}

function shouldShowScrollTopButton() {
  const documentHeight = document.documentElement.scrollHeight;
  const viewportBottom = window.scrollY + window.innerHeight;

  return viewportBottom >= documentHeight - 160 && window.scrollY > window.innerHeight * 0.75;
}

export function PageUtilities() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    applyStoredThemePreference();

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setShowScrollTop(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(shouldShowScrollTopButton());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className={styles.scrollTopButton}
      data-visible={showScrollTop ? "true" : "false"}
      tabIndex={showScrollTop ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  );
}
