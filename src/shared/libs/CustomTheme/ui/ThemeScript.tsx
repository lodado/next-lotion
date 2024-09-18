"use client";

type Theme = "light" | "dark";

declare global {
  interface Window {
    __theme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

const code = function code() {
  window.__onThemeChange = function () {};

  function setTheme(newTheme: Theme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    document.documentElement.setAttribute("color-scheme", newTheme);

    window.__onThemeChange(newTheme);
  }

  let preferredTheme;

  try {
    preferredTheme = localStorage.getItem("theme") as Theme;
  } catch (err) {}

  window.__setPreferredTheme = function (newTheme: Theme) {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  let darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", function (e) {
    window.__setPreferredTheme(e.matches ? "dark" : "light");
  });

  setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
};

/**
 * 브라우저의 다크모드를 지원하는 스크립트
 * script는 랜더링 차단 요소로 동작하므로 다크모드를 보장함
 */
export default function ThemeScript({ nonce }: { nonce: string }) {
  return <script id="theme-script" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${code})();` }} />;
}
