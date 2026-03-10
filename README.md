# Zeus Project

Zeus Project is a super-repository for agents, squads, skills, memory systems, MCP tooling, and reusable UI foundations.

The main idea is simple: the human should be able to call `@zeus`, describe the desired outcome in plain language, and let the project route the work to the right capability stack.

## Main Entry Points

- Project home: [`/index.html`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/index.html)
- Olympus dashboard: [`/apps/olympus-dashboard/index.html`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/index.html)
- Soul UI: [`/apps/olympus-dashboard/soul.html`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/olympus-dashboard/soul.html)
- Aura system: [`/apps/aura-system/index.html`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/apps/aura-system/index.html)
- Project memory: [`/soul.md`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/soul.md)
- Unified catalog: [`/docs/zeus-catalog.md`](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/docs/zeus-catalog.md)

## Repository Structure

- `.claude/`: local orchestration and agent definitions
- `apps/olympus-dashboard/`: guided UI for the ecosystem
- `apps/aura-system/`: internal design-system package and starters
- `data/`: generated inventory data
- `docs/`: human-readable catalog and project docs
- `scripts/`: setup, generation, and local launcher scripts
- `sources/`: upstream mirrors tracked as submodules

## Local Run

```powershell
powershell -NoProfile -File scripts\start-zeus.ps1
```

This opens the project home at:

`http://127.0.0.1:4173/`

## Design System

`@zeus/aura-system` is the shared visual base of the project.

It includes:

- token exports in JSON and Tailwind-ready format
- atomic CSS layers
- HTML component snippets
- React/Next starter files
- reusable page starters for future project surfaces

## GitHub Pages

The repository includes a GitHub Actions workflow that publishes the static experience to GitHub Pages.

The Pages artifact is intentionally slim and includes:

- `index.html`
- `apps/`
- `docs/`
- `soul.md`

## Notes

- `.env.local` is intentionally ignored and not published.
- `sources/` are submodules to preserve upstream provenance and avoid vendoring full histories into the main repository.
