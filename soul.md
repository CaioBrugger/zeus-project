# Soul

## Identity

Zeus Project is the command center for a reusable AI delivery ecosystem. Its role is to aggregate upstream repositories with skills, agents, squads, MCP tooling, memory systems, and execution frameworks into one local base that can be reused across future projects.

The operating promise is simple: the human should be able to call `@zeus`, describe the outcome they want, and let the repository decide which specialist capability should be used.

## Core Principles

- Outcome first, taxonomy second.
- One entrypoint for the human: `@zeus`.
- Upstream repositories stay preserved in `sources/`.
- Local orchestration and governance stay in this repository.
- Important project knowledge must be written down and survive sessions.

## Important Assets

- `@zeus`: primary orchestrator in `.claude/agents/zeus.md`
- `AGENTS.md`: repository operating rules
- `docs/zeus-catalog.md`: detailed inventory of imported assets
- `apps/olympus-dashboard/`: visual control panel for the ecosystem
- `sources/`: mirrored upstream repositories

## Ecosystem Snapshot

Imported upstream sources:

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

Current local orchestration model:

- Memory and continuity: `claude-mem` plus `soul.md`
- Planning and delivery: `get-shit-done`, `superpowers`, `claude-mem`
- Squad orchestration: `aiox-core`
- Design and frontend: `ui-ux-pro-max`, Anthropic skills, Composio skill catalog
- Automation and integrations: `n8n-mcp`, `mcp-builder`, Composio connect stack
- Research and knowledge workflows: `notebooklm`, research-oriented skills
- Visual navigation: Olympus Dashboard with Greek mythology art and searchable inventory
- Beginner onboarding: guided journeys, curated personas, and a dedicated Soul interface
- Extracted design systems: local template and token guidelines based on audited external references

## Decisions

- `sources/` is the vendor mirror area for imported repositories.
- Local custom behavior belongs in `.claude/`, `docs/`, `scripts/`, and top-level governance files.
- The user should not need to memorize specialist names.
- `Zeus` is the only mandatory entrypoint for orchestration.
- `soul.md` must be updated when scope, sources, orchestration, or major decisions change.

## Update Protocol

Update this file when:

- a new source repository is added or removed
- a new local agent or squad is created
- orchestration policy changes
- a major integration or architectural choice is made
- an important project truth should persist across sessions

## Change Log

### 2026-03-10

- Created the Zeus super-repository structure.
- Imported ten upstream repositories into `sources/`.
- Added repository-level orchestration instructions in `AGENTS.md`.
- Added the `@zeus` orchestrator in `.claude/agents/zeus.md`.
- Added the detailed ecosystem catalog in `docs/zeus-catalog.md`.
- Added a generated ecosystem inventory in `data/ecosystem.json`.
- Built the Olympus Dashboard in `apps/olympus-dashboard/`.
- Generated Greek mythology artwork for the dashboard with `gemini-3.1-flash-image-preview`.
- Upgraded the dashboard UX with guided journeys, interactive radar panels, curated agent personas, and a dedicated `soul.html` experience.
- Added an extracted Aura-inspired design system module with tokens, atomic design structure, and landing page template in `apps/aura-system/`.
- Expanded the Aura system into a reusable kit with isolated components, token exports, and a React/Next starter implementation.
- Applied the Aura system as a shared visual base across Olympus Dashboard pages so the project now has a more unified UI language.
- Added a root home page as the main project entrypoint and starter templates so future pages inherit the shared visual system by default.
