const navHost = document.querySelector("[data-zeus-nav]");
const themeKey = "zeus-theme";

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(themeKey, nextTheme);
  document.querySelectorAll("[data-theme-label]").forEach((label) => {
    label.textContent = nextTheme === "dark" ? "Light mode" : "Dark mode";
  });
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

function wireThemeToggles() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });
}

if (navHost) {
  const root = document.body.dataset.navRoot || ".";
  const current = document.body.dataset.navCurrent || "";

  const items = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "olympus", label: "Olympus", href: "apps/olympus-dashboard/index.html" },
    { id: "soul", label: "Soul", href: "apps/olympus-dashboard/soul.html" },
    { id: "aura", label: "Aura System", href: "apps/aura-system/index.html" },
    { id: "guidelines", label: "Guidelines", href: "docs/guidelines.html" },
    { id: "catalog", label: "Catalogo", href: "docs/catalog.html" },
    { id: "soul-md", label: "Soul.md", href: "soul.md" },
  ];

  const links = items
    .map((item) => {
      const href = `${root}/${item.href}`;
      const active = item.id === current ? ' aria-current="page"' : "";
      return `<a href="${href}"${active}>${item.label}</a>`;
    })
    .join("");

  navHost.innerHTML = `
    <header class="aura-nav zeus-nav-shell">
      <div class="aura-container aura-nav__inner">
        <a class="aura-nav__brand" href="${root}/index.html">
          <span class="aura-nav__mark">⚡</span>
          <span>
            <strong>Zeus Project</strong>
            <small>Sistema unificado</small>
          </span>
        </a>
        <nav class="aura-nav__links">
          ${links}
        </nav>
        <button class="aura-theme-toggle" data-theme-toggle type="button" aria-label="Alternar tema">
          <span class="aura-theme-toggle__icon">◐</span>
          <span data-theme-label>Dark mode</span>
        </button>
      </div>
    </header>
  `;
}

initTheme();
wireThemeToggles();
