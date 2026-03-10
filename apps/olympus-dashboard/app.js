const page = document.body.dataset.page || "dashboard";

const state = {
  ecosystem: null,
  personas: null,
  soul: null,
  items: [],
  filters: { search: "", type: "all", repo: "all" },
  personaSearch: "",
  activeJourney: 0,
};

const typeLabels = {
  skill: "Skill",
  agent: "Agent",
  squad: "Squad",
  repository: "Repositorio",
};

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
  return response.json();
}

function normalizeText(value) {
  if (!value) return "";
  return String(value)
    .replaceAll("Ã¡", "á")
    .replaceAll("Ã¢", "â")
    .replaceAll("Ã£", "ã")
    .replaceAll("Ã§", "ç")
    .replaceAll("Ã©", "é")
    .replaceAll("Ãª", "ê")
    .replaceAll("Ã­", "í")
    .replaceAll("Ã³", "ó")
    .replaceAll("Ã´", "ô")
    .replaceAll("Ãµ", "õ")
    .replaceAll("Ãº", "ú")
    .replaceAll("â€”", "—")
    .replaceAll("â€“", "–")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€", '"');
}

function getItems(ecosystem) {
  const repositories = ecosystem.repositories.map((item) => ({
    ...item,
    description: normalizeText(item.description),
    type: "repository",
  }));
  const squads = ecosystem.squads
    .filter((item) => item.name !== "_example")
    .map((item) => ({ ...item, description: normalizeText(item.description), type: "squad" }));
  const agents = ecosystem.agents.map((item) => ({
    ...item,
    description: normalizeText(item.description),
    type: "agent",
  }));
  const skills = ecosystem.skills.map((item) => ({
    ...item,
    description: normalizeText(item.description),
    type: "skill",
  }));
  return [...skills, ...agents, ...squads, ...repositories];
}

function renderDashboard() {
  renderHeroKpis();
  renderDatasetStamp();
  renderJourneys();
  renderRadar();
  renderPersonas();
  populateRepoFilter();
  renderCards();
  renderRepos();
  wireDashboardEvents();
}

function renderHeroKpis() {
  const container = document.querySelector("#heroKpis");
  const template = document.querySelector("#heroKpiTemplate");
  if (!container || !template) return;

  const { summary } = state.ecosystem;
  const items = [
    { label: "Repositorios importados", value: summary.repoCount },
    { label: "Skills descobertas", value: summary.skillCount },
    { label: "Agentes e squads", value: summary.agentCount + summary.squadCount },
  ];

  container.innerHTML = "";
  items.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".hero-kpi-label").textContent = item.label;
    fragment.querySelector(".hero-kpi-value").textContent = item.value;
    container.appendChild(fragment);
  });
}

function renderDatasetStamp() {
  const stamp = document.querySelector("#datasetStamp");
  if (!stamp) return;
  stamp.textContent = `Inventario atualizado em ${new Date(state.ecosystem.generatedAt).toLocaleString("pt-BR")}`;
}

function renderJourneys() {
  const tabs = document.querySelector("#journeyTabs");
  const stage = document.querySelector("#journeyStage");
  const template = document.querySelector("#journeyTabTemplate");
  if (!tabs || !stage || !template) return;

  tabs.innerHTML = "";
  state.personas.beginnerJourneys.forEach((journey, index) => {
    const fragment = template.content.cloneNode(true);
    const button = fragment.querySelector("button");
    button.textContent = journey.title;
    if (index === state.activeJourney) button.classList.add("is-active");
    button.addEventListener("click", () => {
      state.activeJourney = index;
      renderJourneys();
    });
    tabs.appendChild(fragment);
  });

  const current = state.personas.beginnerJourneys[state.activeJourney];
  stage.innerHTML = `
    <p class="journey-owner">Guiado por <strong>${current.owner}</strong></p>
    <h3>${current.title}</h3>
    <div class="journey-steps">
      ${current.steps
        .map(
          (step, index) => `
            <div class="journey-step">
              <div class="journey-step-index">${index + 1}</div>
              <div><p>${step}</p></div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderRadar() {
  renderRepoSkillBreakdown();
  renderCapabilityHighlights();
  renderOrientationCards();
}

function renderRepoSkillBreakdown() {
  const container = document.querySelector("#repoSkillBreakdown");
  if (!container) return;

  const counts = new Map();
  state.ecosystem.skills.forEach((skill) => {
    counts.set(skill.repo, (counts.get(skill.repo) || 0) + 1);
  });
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = rows[0]?.[1] || 1;

  container.innerHTML = rows
    .map(
      ([repo, count]) => `
        <div class="bar-row">
          <header><span>${repo}</span><strong>${count}</strong></header>
          <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
        </div>
      `
    )
    .join("");
}

function renderCapabilityHighlights() {
  const container = document.querySelector("#capabilityHighlights");
  if (!container) return;
  const items = [
    {
      title: "Planejamento e entrega",
      detail: "GSD, Superpowers e Claude Mem cobrem do roadmap a verificacao final.",
    },
    {
      title: "Design e frontend",
      detail: "UI/UX Pro Max, Frontend Design e Theme Factory elevam a qualidade visual.",
    },
    {
      title: "Automacao e integracoes",
      detail: "n8n-MCP, MCP Builder e Connect ligam o projeto ao mundo real.",
    },
  ];
  container.innerHTML = items
    .map(
      (item) => `
        <div class="highlight-item">
          <strong>${item.title}</strong>
          <p>${item.detail}</p>
        </div>
      `
    )
    .join("");
}

function renderOrientationCards() {
  const container = document.querySelector("#orientationCards");
  if (!container) return;
  const cards = [
    {
      title: "Se voce e leigo",
      detail: "Comece pelas jornadas e pelo Soul. A interface foi feita para explicar o sistema antes de expor tecnicalidades.",
    },
    {
      title: "Se voce quer agir rapido",
      detail: "Peça o resultado ao Zeus. Ele escolhe as pecas certas sem exigir que voce memorize nomes internos.",
    },
    {
      title: "Se voce quer profundidade",
      detail: "Use o explorador para inspecionar skills, agents, squads e repositorios em detalhe.",
    },
    {
      title: "Se voce quer design system",
      detail: "Abra o Aura System para ver tokens, atomic design e uma landing template extraida do site auditado.",
    },
  ];
  container.innerHTML = cards
    .map(
      (card) => `
        <div class="orientation-card">
          <strong>${card.title}</strong>
          <p>${card.detail}</p>
        </div>
      `
    )
    .join("");
}

function renderPersonas() {
  const container = document.querySelector("#personaGrid");
  const template = document.querySelector("#personaCardTemplate");
  if (!container || !template) return;

  const query = state.personaSearch.toLowerCase();
  const personas = state.personas.personas.filter((persona) => {
    const text = [persona.name, persona.title, persona.summary, ...(persona.systems || []), ...(persona.keywords || [])]
      .join(" ")
      .toLowerCase();
    return text.includes(query);
  });

  container.innerHTML = "";
  personas.forEach((persona) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector("img").src = persona.image;
    fragment.querySelector("img").alt = `${persona.name}, ${persona.title}`;
    fragment.querySelector(".persona-overline").textContent = persona.title;
    fragment.querySelector("h3").textContent = persona.name;
    fragment.querySelector(".persona-summary").textContent = persona.summary;
    const systems = fragment.querySelector(".persona-system-list");
    persona.systems.forEach((system) => {
      const pill = document.createElement("span");
      pill.className = "system-pill";
      pill.textContent = system;
      systems.appendChild(pill);
    });
    container.appendChild(fragment);
  });
}

function populateRepoFilter() {
  const select = document.querySelector("#repoFilter");
  if (!select) return;
  const repos = [...new Set(state.items.map((item) => item.repo).filter(Boolean))].sort();
  repos.forEach((repo) => {
    const option = document.createElement("option");
    option.value = repo;
    option.textContent = repo;
    select.appendChild(option);
  });
}

function matchesFilters(item) {
  const haystack = [item.name, item.description, item.repo, item.path, item.family, item.squad]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return (
    haystack.includes(state.filters.search.toLowerCase()) &&
    (state.filters.type === "all" || item.type === state.filters.type) &&
    (state.filters.repo === "all" || item.repo === state.filters.repo)
  );
}

function renderCards() {
  const container = document.querySelector("#cardsGrid");
  const count = document.querySelector("#resultsCount");
  const template = document.querySelector("#cardTemplate");
  if (!container || !count || !template) return;

  const total = state.items.filter(matchesFilters).length;
  const filtered = state.items.filter(matchesFilters).slice(0, 60);
  container.innerHTML = "";

  filtered.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".badge").textContent = typeLabels[item.type] || item.type;
    fragment.querySelector(".repo-tag").textContent = item.repo || "local";
    fragment.querySelector("h3").textContent = item.name;
    fragment.querySelector(".asset-description").textContent =
      item.description || "Sem descricao curta no upstream. Use o catalogo ou o arquivo-fonte para detalhes completos.";
    fragment.querySelector(".asset-path").textContent = item.path || "";
    container.appendChild(fragment);
  });

  count.textContent = `${total} resultados${total > filtered.length ? `, mostrando os primeiros ${filtered.length}` : ""}`;
}

function renderRepos() {
  const container = document.querySelector("#repoList");
  if (!container) return;
  container.innerHTML = "";
  state.ecosystem.repositories.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "repo-entry";
    card.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${normalizeText(repo.description) || "Repositorio importado para compor o ecossistema Zeus."}</p>
    `;
    container.appendChild(card);
  });
}

function wireDashboardEvents() {
  document.querySelector("#searchInput")?.addEventListener("input", (event) => {
    state.filters.search = event.target.value.trim();
    renderCards();
  });
  document.querySelector("#typeFilter")?.addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    renderCards();
  });
  document.querySelector("#repoFilter")?.addEventListener("change", (event) => {
    state.filters.repo = event.target.value;
    renderCards();
  });
  document.querySelector("#personaSearchInput")?.addEventListener("input", (event) => {
    state.personaSearch = event.target.value.trim();
    renderPersonas();
  });
}

function renderSoulPage() {
  document.querySelector("#soulIntro").textContent = state.soul.intro;
  document.querySelector("#soulHeadline").textContent = state.soul.identity.headline;
  document.querySelector("#soulBody").textContent = state.soul.identity.body;
  renderSoulKpis();
  renderSimpleList("#principlesList", state.soul.principles);
  renderSimpleList("#decisionsList", state.soul.decisions);
  renderPillars();
  renderTimeline();
}

function renderSoulKpis() {
  const container = document.querySelector("#soulKpis");
  if (!container) return;

  const items = [
    { label: "Principios", value: state.soul.principles.length },
    { label: "Pilares", value: state.soul.pillars.length },
    { label: "Decisoes", value: state.soul.decisions.length },
    { label: "Marcos", value: state.soul.timeline.length },
  ];

  container.innerHTML = items
    .map(
      (item) => `
        <article class="hero-kpi soul-kpi">
          <span class="hero-kpi-label">${item.label}</span>
          <strong class="hero-kpi-value">${item.value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderSimpleList(selector, items) {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = items.map((item) => `<div class="decision-item">${item}</div>`).join("");
}

function renderPillars() {
  const container = document.querySelector("#pillarList");
  if (!container) return;
  container.innerHTML = state.soul.pillars
    .map(
      (pillar) => `
        <div class="pillar-item">
          <strong>${pillar.name}</strong>
          <p>${pillar.detail}</p>
        </div>
      `
    )
    .join("");
}

function renderTimeline() {
  const container = document.querySelector("#timelineList");
  if (!container) return;
  container.innerHTML = state.soul.timeline
    .map(
      (item) => `
        <div class="timeline-item">
          <strong>${item.date}</strong>
          <p>${item.event}</p>
        </div>
      `
    )
    .join("");
}

async function main() {
  const [ecosystem, personas, soul] = await Promise.all([
    loadJson("./data/ecosystem.json"),
    loadJson("./data/personas.json"),
    loadJson("./data/soul.json"),
  ]);
  state.ecosystem = ecosystem;
  state.personas = personas;
  state.soul = soul;
  state.items = getItems(ecosystem);

  if (page === "soul") {
    renderSoulPage();
  } else {
    renderDashboard();
  }
}

main().catch((error) => {
  document.body.innerHTML = `<main class="shell"><section class="panel"><h1>Falha ao carregar a interface</h1><p>${error.message}</p></section></main>`;
});
