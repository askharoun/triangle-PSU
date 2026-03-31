"use client";

import { MoonStar, SunMedium } from "lucide-react";

import styles from "./theme-toggle.module.css";

function applyTheme(nextTheme: "light" | "dark") {
  const root = document.documentElement;

  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  localStorage.setItem("triangle-theme", nextTheme);
}

export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => {
        const currentTheme =
          document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        applyTheme(currentTheme === "dark" ? "light" : "dark");
      }}
      className={styles.toggle}
    >
      <span className={styles.label}>Toggle color theme</span>
      <MoonStar className={styles.moonIcon} />
      <SunMedium className={styles.sunIcon} />
    </button>
  );
}
