#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0] || "help";
const repoRoot = path.resolve(__dirname, "..");

function parseOption(flag) {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function hasFlag(flag) {
  return args.includes(flag);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(filePath, contents, force = false) {
  ensureDir(path.dirname(filePath));
  if (!force && fs.existsSync(filePath)) {
    throw new Error(`Arquivo ja existe: ${filePath}`);
  }
  fs.writeFileSync(filePath, contents, "utf8");
}

function copyFile(source, target, force = false) {
  ensureDir(path.dirname(target));
  if (!force && fs.existsSync(target)) {
    throw new Error(`Arquivo ja existe: ${target}`);
  }
  fs.copyFileSync(source, target);
}

function copyDir(sourceDir, targetDir, force = false) {
  ensureDir(targetDir);
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath, force);
    } else {
      copyFile(sourcePath, targetPath, force);
    }
  }
}

function relativeBase(fromDir, toDir) {
  return path.relative(fromDir, toDir).replace(/\\/g, "/") || ".";
}

function createNavScript() {
  return `const navHost = document.querySelector("[data-zeus-nav]");
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
    { id: "guidelines", label: "Guidelines", href: "docs/guidelines.html" },
    { id: "catalog", label: "Catalogo", href: "docs/catalog.html" },
    { id: "soul", label: "Soul.md", href: "soul.md" }
  ];

  const links = items
    .map((item) => {
      const href = \`\${root}/\${item.href}\`;
      const active = item.id === current ? ' aria-current="page"' : "";
      return \`<a href="\${href}"\${active}>\${item.label}</a>\`;
    })
    .join("");

  navHost.innerHTML = \`
    <header class="aura-nav zeus-nav-shell">
      <div class="aura-container aura-nav__inner">
        <a class="aura-nav__brand" href="\${root}/index.html">
          <span class="aura-nav__mark">⚡</span>
          <span>
            <strong>Zeus Layer</strong>
            <small>Sistema instalado</small>
          </span>
        </a>
        <nav class="aura-nav__links">\${links}</nav>
        <button class="aura-theme-toggle" data-theme-toggle type="button" aria-label="Alternar tema">
          <span class="aura-theme-toggle__icon">◐</span>
          <span data-theme-label>Dark mode</span>
        </button>
      </div>
    </header>
  \`;
}

initTheme();
wireThemeToggles();
`;
}

function createIndexHtml(projectName) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} | Zeus Layer</title>
    <link rel="stylesheet" href="./styles/template.css" />
    <style>
      body { background: var(--aura-gradient-page); }
      .zeus-home { padding: 2rem 0 4rem; }
      .zeus-hero, .zeus-grid { display: grid; gap: 1.25rem; }
      .zeus-hero { grid-template-columns: 1.08fr 0.92fr; align-items: center; margin-bottom: 1.5rem; }
      .zeus-panel, .zeus-card { padding: 2rem; }
      .zeus-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .zeus-links { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }
      .zeus-art { min-height: 100%; border-radius: 1.75rem; border: 1px solid var(--aura-color-border); background:
        radial-gradient(circle at top, rgba(96,165,250,0.18), transparent 30%),
        linear-gradient(180deg, rgba(255,255,255,0.6), rgba(248,250,252,0.85)); box-shadow: var(--aura-shadow-lg); }
      .zeus-art__inner { height: 100%; min-height: 360px; display: grid; place-items: center; color: var(--aura-color-primary); font-family: var(--aura-font-display); font-size: clamp(2rem, 5vw, 4rem); letter-spacing: 0.08em; }
      @media (max-width: 980px) { .zeus-hero, .zeus-grid { grid-template-columns: 1fr; } }
    </style>
  </head>
  <body data-nav-root="." data-nav-current="home">
    <div data-zeus-nav></div>
    <main class="zeus-home">
      <section class="aura-container zeus-hero">
        <article class="aura-card zeus-panel">
          <p class="aura-eyebrow">Zeus instalado</p>
          <h1 class="aura-title-xl">A base do Zeus agora faz parte de ${projectName}.</h1>
          <p class="aura-copy-lg">Esta camada inicial adiciona design system, dark mode global, navbar unificada, guidelines e Soul para o seu projeto.</p>
          <div class="zeus-links">
            <a class="aura-button aura-button-primary" href="./docs/guidelines.html">Abrir guidelines</a>
            <a class="aura-button aura-button-secondary" href="./docs/catalog.html">Abrir catalogo</a>
            <a class="aura-shiny-cta" href="./soul.md">Ler Soul</a>
          </div>
        </article>
        <article class="zeus-art">
          <div class="zeus-art__inner">ZEUS</div>
        </article>
      </section>
      <section class="aura-container zeus-grid">
        <article class="aura-card zeus-card">
          <p class="aura-eyebrow">UI base</p>
          <h2 class="aura-title-md">Design system pronto</h2>
          <p class="aura-copy">Tokens, layout, navbar e tema global ja instalados.</p>
        </article>
        <article class="aura-card zeus-card">
          <p class="aura-eyebrow">Memoria</p>
          <h2 class="aura-title-md">Soul.md ativo</h2>
          <p class="aura-copy">A identidade e as decisoes importantes do projeto agora tem um lugar fixo.</p>
        </article>
        <article class="aura-card zeus-card">
          <p class="aura-eyebrow">Proximo passo</p>
          <h2 class="aura-title-md">Personalize seu sistema</h2>
          <p class="aura-copy">Ajuste as paginas, amplie a navegacao e adapte o Zeus para o seu dominio.</p>
        </article>
      </section>
    </main>
    <script src="./shared/zeus-nav.js"></script>
  </body>
</html>
`;
}

function createGuidelinesCss() {
  return `@import url("../styles/template.css");
body { min-height: 100vh; }
.zeus-doc-shell { padding: 0 0 var(--aura-space-20); }
.zeus-doc-hero, .zeus-doc-grid { display: grid; gap: var(--aura-space-5); }
.zeus-doc-hero { padding: var(--aura-space-10) 0 var(--aura-space-8); }
.zeus-doc-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.zeus-doc-panel, .zeus-doc-card { padding: var(--aura-space-6); }
.zeus-doc-panel ul, .zeus-doc-card ul { margin: 0; padding-left: 1.15rem; color: var(--aura-color-muted); }
.zeus-doc-panel li, .zeus-doc-card li { margin: 0.35rem 0; }
.zeus-doc-actions { display: flex; gap: var(--aura-space-3); flex-wrap: wrap; margin-top: var(--aura-space-5); }
@media (max-width: 980px) { .zeus-doc-grid { grid-template-columns: 1fr; } }
`;
}

function createGuidelinesHtml(projectName) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} | Guidelines</title>
    <link rel="stylesheet" href="./zeus-pages.css" />
  </head>
  <body data-nav-root=".." data-nav-current="guidelines">
    <div data-zeus-nav></div>
    <main class="zeus-doc-shell">
      <section class="zeus-doc-hero">
        <div class="aura-container">
          <article class="aura-card zeus-doc-panel">
            <p class="aura-eyebrow">Guidelines do projeto</p>
            <h1 class="aura-title-xl">A base do Zeus em ${projectName}.</h1>
            <p class="aura-copy-lg">Use esta pagina como regra visual e operacional para manter o projeto coerente.</p>
            <div class="zeus-doc-actions">
              <a class="aura-button aura-button-primary" href="../index.html">Voltar para Home</a>
              <a class="aura-button aura-button-secondary" href="../soul.md">Abrir Soul</a>
            </div>
          </article>
        </div>
      </section>
      <section>
        <div class="aura-container zeus-doc-grid">
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Navegacao</p>
            <h2 class="aura-title-md">Sempre unificada</h2>
            <ul>
              <li>Mantenha a navbar do Zeus em todas as paginas principais.</li>
              <li>Evite criar modulos isolados sem retorno ao sistema.</li>
            </ul>
          </article>
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Tema</p>
            <h2 class="aura-title-md">Light e dark</h2>
            <ul>
              <li>O dark mode ja funciona globalmente.</li>
              <li>Novas telas devem herdar os tokens, nao criar paletas paralelas.</li>
            </ul>
          </article>
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Soul</p>
            <h2 class="aura-title-md">Memoria viva</h2>
            <ul>
              <li>Registre identidade, principios e decisoes importantes em <code>soul.md</code>.</li>
              <li>Atualize a Soul quando a estrutura do projeto mudar.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
    <script src="../shared/zeus-nav.js"></script>
  </body>
</html>
`;
}

function createCatalogHtml(projectName) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} | Catalogo</title>
    <link rel="stylesheet" href="./zeus-pages.css" />
  </head>
  <body data-nav-root=".." data-nav-current="catalog">
    <div data-zeus-nav></div>
    <main class="zeus-doc-shell">
      <section class="zeus-doc-hero">
        <div class="aura-container">
          <article class="aura-card zeus-doc-panel">
            <p class="aura-eyebrow">Catalogo inicial</p>
            <h1 class="aura-title-xl">Mapeie aqui os modulos do seu projeto.</h1>
            <p class="aura-copy-lg">Esta pagina e um placeholder para voce listar skills, areas, fluxos, squads ou modulos do projeto instalado.</p>
          </article>
        </div>
      </section>
      <section>
        <div class="aura-container zeus-doc-grid">
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Sugestao</p>
            <h2 class="aura-title-md">Comece simples</h2>
            <ul>
              <li>Liste os modulos mais importantes do projeto.</li>
              <li>Descreva rapidamente o que cada um resolve.</li>
            </ul>
          </article>
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Evolucao</p>
            <h2 class="aura-title-md">Expanda depois</h2>
            <ul>
              <li>Transforme esta pagina em um explorador com filtros e busca.</li>
              <li>Conecte a um JSON quando o projeto crescer.</li>
            </ul>
          </article>
          <article class="aura-card zeus-doc-card">
            <p class="aura-eyebrow">Base pronta</p>
            <h2 class="aura-title-md">Tema e navegacao</h2>
            <ul>
              <li>A pagina ja herda o visual do Zeus.</li>
              <li>Navbar e dark mode estao ativos por padrao.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
    <script src="../shared/zeus-nav.js"></script>
  </body>
</html>
`;
}

function createSoulMd(projectName) {
  return `# Soul

## Identity

${projectName} usa a camada do Zeus como base visual, de navegacao e de memoria do projeto.

Este arquivo existe para guardar:

- identidade do projeto
- principios
- decisoes importantes
- regras que nao podem desaparecer

## Core Principles

- Resultado primeiro, taxonomia depois.
- A experiencia humana deve ser simples.
- A navbar do sistema precisa manter o usuario orientado.
- O tema global deve permanecer consistente.
- Decisoes estruturais importantes devem ser registradas aqui.

## Update Protocol

Atualize este arquivo quando:

- a estrutura do projeto mudar
- uma decisao importante for tomada
- a identidade do produto evoluir
- novas areas do sistema forem criadas
`;
}

function printHelp() {
  console.log(`
Zeus Project CLI

Uso:
  zeus-project init [diretorio] [--name "Meu Projeto"] [--force]

Exemplos:
  zeus-project init .
  zeus-project init ./meu-app --name "Meu App"
  npx github:CaioBrugger/zeus-project init .
`);
}

function initProject() {
  const targetArg = args[1] && !args[1].startsWith("--") ? args[1] : ".";
  const targetDir = path.resolve(process.cwd(), targetArg);
  const force = hasFlag("--force");
  const projectName = parseOption("--name") || path.basename(targetDir) || "Meu Projeto";

  const zeusRoot = path.join(targetDir, "zeus");
  const stylesSource = path.join(repoRoot, "apps", "aura-system", "styles");
  const stylesTarget = path.join(zeusRoot, "styles");
  const docsTarget = path.join(zeusRoot, "docs");
  const sharedTarget = path.join(zeusRoot, "shared");

  ensureDir(targetDir);
  copyDir(stylesSource, stylesTarget, force);
  writeFile(path.join(sharedTarget, "zeus-nav.js"), createNavScript(), force);
  writeFile(path.join(zeusRoot, "index.html"), createIndexHtml(projectName), force);
  writeFile(path.join(docsTarget, "zeus-pages.css"), createGuidelinesCss(), force);
  writeFile(path.join(docsTarget, "guidelines.html"), createGuidelinesHtml(projectName), force);
  writeFile(path.join(docsTarget, "catalog.html"), createCatalogHtml(projectName), force);
  writeFile(path.join(zeusRoot, "soul.md"), createSoulMd(projectName), force);

  console.log(`
Zeus instalado com sucesso em:
${zeusRoot}

Arquivos principais:
- ${path.join(zeusRoot, "index.html")}
- ${path.join(zeusRoot, "docs", "guidelines.html")}
- ${path.join(zeusRoot, "docs", "catalog.html")}
- ${path.join(zeusRoot, "soul.md")}

Abra no navegador:
- zeus/index.html
`);
}

try {
  if (command === "init") {
    initProject();
  } else {
    printHelp();
  }
} catch (error) {
  console.error(`Erro: ${error.message}`);
  process.exit(1);
}
