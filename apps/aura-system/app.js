const themeKey = "zeus-aura-theme";

const root = document.documentElement;
const toggle = document.querySelector("#themeToggle");
const label = document.querySelector("#themeToggleLabel");

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem(themeKey, nextTheme);
  if (label) {
    label.textContent = nextTheme === "dark" ? "Light mode" : "Dark mode";
  }
}

function initTheme() {
  const saved = localStorage.getItem(themeKey);
  if (saved) {
    applyTheme(saved);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

function setActiveNav() {
  const links = document.querySelectorAll(".aura-nav__links a");
  const current = window.location.pathname.replace(/\/+$/, "");
  links.forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    const href = url.pathname.replace(/\/+$/, "");
    if (href === current) {
      link.setAttribute("aria-current", "page");
    } else if (link.getAttribute("aria-current") === "page" && href !== current) {
      link.removeAttribute("aria-current");
    }
  });
}

initTheme();
setActiveNav();

toggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});
