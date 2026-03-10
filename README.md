# Zeus Project

O Zeus Project e um super-repositorio para orquestracao de agentes, squads, skills, memoria de projeto, automacoes, MCPs e interfaces reutilizaveis.

A ideia central deste projeto e simples:

- voce nao precisa decorar nomes internos
- voce nao precisa saber qual skill chamar
- voce nao precisa lembrar qual squad resolve cada problema

Voce chama `@zeus`, descreve o resultado que quer e o sistema decide qual combinacao de capacidades usar.

## Visao Geral

O Zeus Project funciona como um centro de comando para projetos orientados por IA. Ele agrega repositorios upstream, cria governanca local, oferece interfaces humanas para navegacao e registra a identidade do projeto no `Soul`.

Hoje ele combina:

- memoria e continuidade
- planejamento e execucao
- agentes e squads especializados
- design systems e kits de UI
- dashboards para pessoas tecnicas e nao tecnicas
- starters para novas paginas e novas interfaces

## Instalar Em Outros Projetos

Agora o repositório tambem possui uma CLI simples para instalar a base do Zeus em outros projetos.

O caminho mais simples para leigos e:

```bash
npx github:CaioBrugger/zeus-project init .
```

Ou escolhendo nome e pasta:

```bash
npx github:CaioBrugger/zeus-project init ./meu-app --name "Meu App"
```

O que a CLI instala:

- pasta `zeus/`
- design system base
- navbar unificada
- dark mode global
- `soul.md`
- `guidelines.html`
- `catalog.html`
- uma home inicial do Zeus dentro do projeto de destino

Arquivos gerados no projeto de destino:

- `zeus/index.html`
- `zeus/docs/guidelines.html`
- `zeus/docs/catalog.html`
- `zeus/soul.md`
- `zeus/shared/zeus-nav.js`
- `zeus/styles/*`

## Objetivos do Projeto

Os objetivos principais sao:

- criar um ponto de entrada unico com `@zeus`
- consolidar skills, agents, squads e ferramentas em um unico projeto
- tornar o ecossistema legivel ate para pessoas leigas
- preservar contexto importante entre sessoes
- permitir reaproveitamento do sistema em projetos futuros
- manter uma camada visual consistente para novas interfaces

## Como Pensar o Zeus Project

### 1. Zeus e o orquestrador

O arquivo principal de orquestracao local e:

- [zeus.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/.claude/agents/zeus.md)

Ele define como o sistema interpreta pedidos e decide quando usar memoria, planejamento, squads, UI, automacao, design system ou documentacao.

### 2. Soul e a memoria viva

O projeto possui uma camada de identidade e memoria persistente:

- [soul.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/soul.md)

O `Soul` guarda:

- a identidade do projeto
- principios
- decisoes importantes
- evolucao do sistema
- fatos que nao devem se perder entre sessoes

### 3. Olympus e a interface humana

O projeto possui uma dashboard guiada para navegacao:

- [Olympus Dashboard](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/index.html)
- [Soul UI](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/soul.html)

Essa interface foi desenhada para:

- ajudar iniciantes
- explicar personagens e funcoes do sistema
- permitir busca por skills, agents, squads e repositorios
- criar uma experiencia visual mais amigavel

### 4. Aura System e a base visual

O design system interno do projeto esta em:

- [Aura System](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/index.html)

Esse modulo contem:

- tokens
- CSS por atomic design
- snippets HTML
- starter React/Next
- template pages
- guidelines de design

## Entradas Principais

Se voce esta chegando agora, estes sao os pontos principais:

- Home do projeto: [index.html](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/index.html)
- Olympus Dashboard: [apps/olympus-dashboard/index.html](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/index.html)
- Soul UI: [apps/olympus-dashboard/soul.html](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/soul.html)
- Aura System: [apps/aura-system/index.html](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/index.html)
- Soul em Markdown: [soul.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/soul.md)
- Catalogo detalhado: [docs/zeus-catalog.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/docs/zeus-catalog.md)

## Estrutura do Repositorio

### `.claude/`

Camada local de orquestracao, com agentes e configuracoes do projeto.

Arquivos importantes:

- `.claude/agents/zeus.md`
- `.claude/settings.local.json`

### `apps/`

Interfaces e modulos visuais do projeto.

Subareas:

- `apps/olympus-dashboard/`: dashboard principal, Soul UI, personagens e assets
- `apps/aura-system/`: design system interno, tokens, templates e kit React

### `data/`

Dados gerados automaticamente para abastecer interfaces e catalogos.

Principal arquivo:

- `data/ecosystem.json`

### `docs/`

Documentacao humana do projeto.

Principal arquivo:

- `docs/zeus-catalog.md`

### `scripts/`

Scripts utilitarios para geracao de dados, imagens, dashboard e inicializacao local.

Scripts importantes:

- `scripts/start-zeus.ps1`
- `scripts/start-dashboard.ps1`
- `scripts/generate-ecosystem-data.ps1`
- `scripts/generate-greek-images.ps1`
- `scripts/generate-agent-portraits.ps1`

### `sources/`

Repositorios upstream importados e rastreados como submodulos.

Esses repositorios preservam a origem das capacidades trazidas para o projeto.

## Repositorios Importados

Atualmente o projeto referencia estes repositorios:

1. `thedotmack/claude-mem`
2. `nextlevelbuilder/ui-ux-pro-max-skill`
3. `czlonkowski/n8n-mcp`
4. `gsd-build/get-shit-done`
5. `obra/superpowers`
6. `hesreallyhim/awesome-claude-code`
7. `ComposioHQ/awesome-claude-skills`
8. `teng-lin/notebooklm-py`
9. `SynkraAI/aiox-core`
10. `anthropics/skills`

Esses repositorios aparecem em `sources/` como submodulos Git.

## Principais Camadas Funcionais

### Memoria e continuidade

Baseada principalmente em:

- `claude-mem`
- `mem-search`
- `soul.md`

Serve para:

- recuperar contexto historico
- lembrar decisoes
- reduzir perda de informacao entre sessoes

### Planejamento e execucao

Baseada principalmente em:

- `get-shit-done`
- `superpowers`
- `claude-mem`

Serve para:

- planejar fases
- executar roadmap
- debugar
- verificar entregas

### Squads e multiagente

Baseada principalmente em:

- `aiox-core`
- `claude-code-mastery`
- `swarm-orchestrator`

Serve para:

- orquestrar times de agentes
- estruturar responsabilidades
- desenhar fluxos multiagente

### UI, UX e design system

Baseada principalmente em:

- `ui-ux-pro-max`
- `frontend-design`
- `theme-factory`
- `@zeus/aura-system`

Serve para:

- criar interfaces
- extrair e reaproveitar design systems
- padronizar novas paginas

### Integracoes e automacao

Baseada principalmente em:

- `n8n-mcp`
- `mcp-builder`
- `connect`
- `connect-apps`

Serve para:

- conectar ferramentas
- desenhar MCPs
- integrar apps externos

## Como Rodar Localmente

Para abrir o projeto localmente:

```powershell
powershell -NoProfile -File scripts\start-zeus.ps1
```

Isso sobe um servidor local e abre a home principal.

Endereco local:

- `http://127.0.0.1:4173/`

Rotas principais:

- Home: `http://127.0.0.1:4173/`
- Olympus: `http://127.0.0.1:4173/apps/olympus-dashboard/`
- Soul UI: `http://127.0.0.1:4173/apps/olympus-dashboard/soul.html`
- Aura System: `http://127.0.0.1:4173/apps/aura-system/`

## GitHub e Deploy

Repositorio publicado:

- `https://github.com/CaioBrugger/zeus-project`

GitHub Pages:

- `https://caiobrugger.github.io/zeus-project/`

O projeto inclui workflow de deploy automatico em:

- [.github/workflows/deploy-pages.yml](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/.github/workflows/deploy-pages.yml)

O Pages publica uma versao estatica com:

- `index.html`
- `apps/`
- `docs/`
- `soul.md`

## Design System Interno

O pacote interno de design system e:

- `@zeus/aura-system`

Arquivos principais:

- [apps/aura-system/package.json](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/package.json)
- [apps/aura-system/tokens.json](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/tokens.json)
- [apps/aura-system/tailwind.tokens.js](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/tailwind.tokens.js)
- [apps/aura-system/docs/design-system.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/docs/design-system.md)

Ele contem:

- tokens de cor, tipografia, spacing, radius, motion e elevation
- camadas CSS por atomic design
- snippets HTML reutilizaveis
- starter React/Next
- templates para novas paginas

Starters disponiveis:

- HTML: [apps/aura-system/templates/page-starter.html](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/templates/page-starter.html)
- React: [apps/aura-system/react/templates/PageStarter.tsx](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/react/templates/PageStarter.tsx)

## Interface para Leigos

Uma das metas mais importantes do projeto e tornar o ecossistema compreensivel para quem nao conhece a estrutura interna.

Por isso o Olympus inclui:

- jornadas de entrada
- personagens consistentes para agentes
- explicacoes em linguagem humana
- filtros e visualizacoes do ecossistema
- pagina dedicada para o Soul

## Seguranca e Arquivos Sensiveis

O arquivo:

- `.env.local`

esta ignorado no Git e nao deve ser publicado.

Hoje ele e usado para segredos locais como chave da Gemini para geracao de imagens.

Arquivos temporarios tambem sao ignorados:

- `server.out.txt`
- `server.err.txt`

## Submodulos

Os repositorios em `sources/` sao submodulos, nao copias completas.

Isso foi feito para:

- preservar a origem dos projetos
- evitar carregar historicos completos no repositório principal
- manter atualizacao futura mais organizada

Arquivo de configuracao:

- [`.gitmodules`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/.gitmodules)

## Fluxo Recomendado de Uso

Para usar o Zeus Project de forma simples:

1. abra a home do projeto
2. entre no Olympus se quiser entender o ecossistema
3. entre no Soul se quiser entender identidade e decisoes
4. entre no Aura System se quiser criar novas interfaces
5. chame `@zeus` quando quiser resolver uma tarefa real

## Manutencao

Quando algo importante mudar, atualize:

- `soul.md`
- `docs/zeus-catalog.md`
- o design system, se a mudanca for visual
- a dashboard, se a experiencia humana precisar evoluir

## Proximos Passos Naturais

Algumas evolucoes naturais deste projeto sao:

- ampliar o numero de personagens e jornadas
- criar mais dashboards especializados
- conectar mais MCPs e automacoes
- expandir o `@zeus/aura-system` para mais kits
- transformar mais fluxos do projeto em interfaces visuais guiadas

## Resumo

Zeus Project nao e apenas um repositorio de prompts ou um conjunto de skills. Ele e uma base operacional completa para:

- pensar
- planejar
- executar
- lembrar
- documentar
- apresentar

tudo isso com uma entrada unica:

- `@zeus`
