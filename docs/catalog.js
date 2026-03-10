const state = {
  ecosystem: null,
  items: [],
  filters: {
    search: "",
    type: "all",
    repo: "all",
  },
};

const typeLabels = {
  skill: "Skill",
  agent: "Agente",
  squad: "Squad",
  repository: "Repositorio",
};

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

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
  return response.json();
}

function getItems(ecosystem) {
  const repositories = ecosystem.repositories.map((item) => ({
    ...item,
    type: "repository",
    description: normalizeText(item.description),
  }));

  const squads = ecosystem.squads
    .filter((item) => item.name !== "_example")
    .map((item) => ({
      ...item,
      type: "squad",
      description: normalizeText(item.description),
    }));

  const agents = ecosystem.agents.map((item) => ({
    ...item,
    type: "agent",
    description: normalizeText(item.description),
  }));

  const skills = ecosystem.skills.map((item) => ({
    ...item,
    type: "skill",
    description: normalizeText(item.description),
  }));

  return [...skills, ...agents, ...squads, ...repositories];
}

function filteredItems() {
  const search = state.filters.search.trim().toLowerCase();

  return state.items.filter((item) => {
    if (state.filters.type !== "all" && item.type !== state.filters.type) return false;
    if (state.filters.repo !== "all" && item.repo !== state.filters.repo && item.name !== state.filters.repo) return false;

    if (!search) return true;

    const haystack = [item.name, item.description, item.repo, item.path, item.squad]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });
}

function renderStats() {
  const mount = document.querySelector("#catalogStats");
  const template = document.querySelector("#catalogStatTemplate");
  mount.innerHTML = "";

  const stats = [
    ["Repositorios", String(state.ecosystem.summary.repoCount), "Bases importadas para compor o Zeus."],
    ["Skills", String(state.ecosystem.summary.skillCount), "Capacidades operacionais prontas para uso."],
    ["Agentes", String(state.ecosystem.summary.agentCount), "Especialistas disponiveis no ecossistema."],
    ["Squads", String(state.ecosystem.summary.squadCount), "Grupos organizados de agentes e estrategia."],
  ];

  stats.forEach(([label, value, description]) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const [small, strong, p] = node.children;
    small.textContent = label;
    strong.textContent = value;
    p.textContent = description;
    mount.appendChild(node);
  });
}

function populateRepoFilter() {
  const select = document.querySelector("#catalogRepo");
  const repos = [...new Set(state.items.map((item) => item.repo || item.name).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );

  select.innerHTML = '<option value="all">Todos</option>';
  repos.forEach((repo) => {
    const option = document.createElement("option");
    option.value = repo;
    option.textContent = repo;
    select.appendChild(option);
  });
}

function renderChips() {
  const mount = document.querySelector("#catalogChips");
  const chips = [
    `Atualizado em ${state.ecosystem.generatedAt.replace("T", " ").slice(0, 16)}`,
    "Sistema unificado do Zeus",
    "Busca por objetivo e origem",
  ];

  mount.innerHTML = chips.map((chip) => `<span class="zeus-pill zeus-pill--subtle">${chip}</span>`).join("");
}

function renderResults() {
  const results = filteredItems();
  const mount = document.querySelector("#catalogResults");
  const count = document.querySelector("#catalogResultsCount");
  const template = document.querySelector("#catalogCardTemplate");

  count.textContent = `${results.length} itens encontrados no catalogo.`;
  mount.innerHTML = "";

  if (!results.length) {
    mount.innerHTML = `
      <article class="aura-card zeus-empty">
        <h3 class="aura-title-md">Nada encontrado</h3>
        <p class="aura-copy">Ajuste os filtros ou tente termos mais amplos.</p>
      </article>
    `;
    return;
  }

  results.slice(0, 250).forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.querySelector(".catalog-type").textContent = typeLabels[item.type] || item.type;
    node.querySelector(".catalog-repo").textContent = item.repo || item.name || "local";
    node.querySelector(".catalog-name").textContent = item.name;
    node.querySelector(".catalog-description").textContent =
      item.description || "Sem descricao resumida registrada para este item.";
    node.querySelector(".zeus-catalog-path").textContent = item.path || item.id || "";
    mount.appendChild(node);
  });
}

function wireEvents() {
  document.querySelector("#catalogSearch").addEventListener("input", (event) => {
    state.filters.search = event.target.value;
    renderResults();
  });

  document.querySelector("#catalogType").addEventListener("change", (event) => {
    state.filters.type = event.target.value;
    renderResults();
  });

  document.querySelector("#catalogRepo").addEventListener("change", (event) => {
    state.filters.repo = event.target.value;
    renderResults();
  });

  document.querySelector("#catalogReset").addEventListener("click", () => {
    state.filters = { search: "", type: "all", repo: "all" };
    document.querySelector("#catalogSearch").value = "";
    document.querySelector("#catalogType").value = "all";
    document.querySelector("#catalogRepo").value = "all";
    renderResults();
  });
}

async function init() {
  state.ecosystem = await loadJson("../apps/olympus-dashboard/data/ecosystem.json");
  state.items = getItems(state.ecosystem);
  renderStats();
  renderChips();
  populateRepoFilter();
  renderResults();
  wireEvents();
}

init().catch((error) => {
  const mount = document.querySelector("#catalogResults");
  mount.innerHTML = `
    <article class="aura-card zeus-empty">
      <h3 class="aura-title-md">Falha ao carregar o catalogo</h3>
      <p class="aura-copy">${error.message}</p>
    </article>
  `;
});
