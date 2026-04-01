"use client";

import { MoonStar, SunMedium } from "lucide-react";

import styles from "./theme-toggle.module.css";

type Theme = "light" | "dark";

function applyTheme(nextTheme: Theme) {
  const root = document.documentElement;

  root.dataset.theme = nextTheme;
  root.style.colorScheme = nextTheme;
  localStorage.setItem("triangle-theme", nextTheme);
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  function handleClick() {
    const currentTheme = getTheme();
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={handleClick}
      className={styles.toggle}
    >
      <span className={styles.label}>Toggle color theme</span>
      <span className={styles.iconFrame} aria-hidden="true">
        <MoonStar className={styles.moonIcon} />
        <SunMedium className={styles.sunIcon} />
      </span>
    </button>
  );
}
