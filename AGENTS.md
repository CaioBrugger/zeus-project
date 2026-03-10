# Zeus Project Instructions

## Mission

This repository is the local control plane for a multi-repository ecosystem of agents, squads, skills, and supporting tools.

## Default Workflow

Always read [soul.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/soul.md) at the start of meaningful work.
Use [zeus.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/.claude/agents/zeus.md) as the primary orchestrator when the user wants guidance, routing, or does not know which specialist to invoke.
Use [docs/zeus-catalog.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/docs/zeus-catalog.md) as the canonical inventory of imported skills, agents, squads, and tools.

## Repository Rules

The `sources/` directory contains upstream mirrors and should be treated as vendor code unless the user explicitly asks to modify imported repositories.
Local orchestration, governance, and documentation live in `.claude/`, `docs/`, `scripts/`, and `soul.md`.
When adding or removing upstream repositories, update [soul.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/soul.md) and [docs/zeus-catalog.md](/C:/Users/Caio%20Brugger/Desktop/Zeus%20Project/docs/zeus-catalog.md) in the same change.

## Soul Maintenance

Keep `soul.md` updated whenever any of the following changes:
- project mission or scope
- core orchestration rules
- source repositories
- important architectural decisions
- major local conventions

## Zeus Routing Intent

The user should be able to ask for work by outcome, not by remembering exact asset names.
If the user addresses `@zeus`, the orchestrator must translate intent into the right combination of source repository, skill, squad, agent, or tool.
