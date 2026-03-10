# Zeus Catalog

This document explains what each imported skill, squad, agent, and supporting repository contributes to this project.

## Local Structure

### `apps/olympus-dashboard`

Visual dashboard for the Zeus ecosystem. It reads the generated inventory JSON and presents searchable cards for repositories, squads, agents, and skills using the Greek gods visual theme.

Now includes:
- beginner journeys for non-technical users
- curated mythological personas for the main agent families
- interactive ecosystem radar panels
- a dedicated `soul.html` interface for project identity and memory

### `apps/aura-system`

Local design system module extracted from `https://ai-developer.aura.build/` and translated into reusable project assets.

Includes:
- token files for color, typography, spacing, radius, motion, and elevation
- atomic design CSS layers
- implementation-ready AI SaaS landing page template
- design-system guidelines document
- isolated HTML component snippets
- JSON and Tailwind token exports
- React/Next starter kit
- internal package manifest as `@zeus/aura-system`

### Root Home

The repository root now has `index.html` as the primary entrypoint for the whole project, linking Olympus, Soul, and Aura System from one unified home.

### `data/ecosystem.json`

Machine-readable inventory generated from the imported repositories. This is the data source for the dashboard.

### `scripts/generate-ecosystem-data.ps1`

Builds the consolidated JSON inventory by scanning imported repositories for `SKILL.md`, agent definitions, and squads.

### `scripts/generate-greek-images.ps1`

Generates the dashboard artwork via Gemini image generation using `gemini-3.1-flash-image-preview`. It expects the API key in `GEMINI_API_KEY`.

### `scripts/generate-agent-portraits.ps1`

Generates the consistent portrait set for the curated Olympus agent cast shown in the dashboard.

### `scripts/start-dashboard.ps1`

Serves the dashboard locally with Python's built-in HTTP server.

## Repository Map

### `sources/claude-mem`

Persistent memory and plan-execution system for Claude-style workflows. Best used for cross-session memory retrieval, phased planning, and subagent-driven execution.

### `sources/ui-ux-pro-max-skill`

Specialized UI and UX design intelligence pack with strong coverage of styles, palettes, typography, layout systems, and implementation guidance across multiple stacks.

### `sources/n8n-mcp`

MCP server and knowledge bridge for n8n. Useful when the project needs AI-assisted workflow automation with accurate node, operation, and template awareness.

### `sources/get-shit-done`

Spec-driven delivery system with explicit planning, research, execution, verification, and debugging agents.

### `sources/superpowers`

Workflow framework centered on planning discipline, TDD, branch hygiene, code review, debugging, and structured subagent execution.

### `sources/awesome-claude-code`

Curated ecosystem map. Useful as a discovery repository for future expansion, not as the first execution layer.

### `sources/awesome-claude-skills`

Large skill catalog focused on practical Claude workflows, especially app connectivity, content workflows, productivity, and asset generation.

### `sources/notebooklm-py`

Python API, CLI, and agent skill for NotebookLM-based research and artifact generation.

### `sources/aiox-core`

Large framework for agent-driven development. In this project, the main imported specialization is the `claude-code-mastery` squad.

### `sources/skills`

Anthropic reference repository for Agent Skills. Provides strong baseline skills for design, documents, MCP, testing, and custom skill authoring.

## Squads

### `claude-code-mastery` from `aiox-core`

Purpose: full-spectrum specialization in Claude Code ecosystem design.

What it covers:
- hooks and lifecycle automation
- MCP and tool integration
- subagents and swarm orchestration
- settings, permissions, and project configuration
- skill and plugin engineering
- project integration and roadmap awareness

When Zeus should use it:
- designing a reusable agent architecture
- creating or refactoring a multi-agent workflow
- configuring advanced Claude Code behavior
- deciding how hooks, MCP, and local rules should work together

## Agents

### `superpowers`

- `code-reviewer`: reviews completed implementation steps against plans, standards, architecture, and quality expectations.

### `get-shit-done`

- `gsd-codebase-mapper`: explores a codebase and writes structured analysis documents.
- `gsd-debugger`: investigates bugs scientifically and manages debug sessions.
- `gsd-executor`: executes approved plans with checkpoints and controlled deviations.
- `gsd-integration-checker`: verifies cross-phase integration and end-to-end flow quality.
- `gsd-nyquist-auditor`: closes validation gaps by generating tests and coverage evidence.
- `gsd-phase-researcher`: researches implementation approaches before planning a phase.
- `gsd-plan-checker`: validates whether a plan can really hit the intended goal.
- `gsd-planner`: creates executable phase plans with dependency-aware task breakdown.
- `gsd-project-researcher`: researches the broader ecosystem before roadmap creation.
- `gsd-research-synthesizer`: combines parallel research outputs into a usable summary.
- `gsd-roadmapper`: creates project roadmaps with requirements and success criteria.
- `gsd-verifier`: checks whether a phase truly delivered its promised outcome.

### `claude-code-mastery` squad agents

- `claude-mastery-chief`: top-level triage and routing agent for the squad.
- `hooks-architect`: designs hook systems, guardrails, and automation pipelines.
- `mcp-integrator`: handles MCP server strategy, tool discovery, and integration patterns.
- `swarm-orchestrator`: designs multi-agent topologies, delegation strategy, and parallel execution.
- `config-engineer`: manages settings, permissions, `CLAUDE.md`, and behavior rules.
- `skill-craftsman`: creates and shapes skills, plugins, commands, and context strategy.
- `project-integrator`: connects agent systems to real project workflows, CI/CD, and delivery.
- `roadmap-sentinel`: tracks roadmap changes, migrations, and feature adoption strategy.

## Skills

### `claude-mem` skills

- `do`: executes phased implementation plans using subagents.
- `make-plan`: creates phased implementation plans ready for later execution.
- `mem-search`: searches persistent memory for prior solutions and decisions.
- `smart-explore`: performs token-efficient structural code exploration with AST-first search.

### `ui-ux-pro-max-skill`

- `ui-ux-pro-max`: design intelligence layer for UI reviews, visual systems, page/component design, accessibility, layout, typography, palette selection, and frontend improvement work.

### Anthropic reference skills

- `algorithmic-art`: creates generative art with p5.js and controlled randomness.
- `brand-guidelines`: applies brand color, typography, and identity rules to outputs.
- `canvas-design`: creates polished visual compositions for PNG and PDF outputs.
- `claude-api`: guides app building with the Claude API and Anthropic SDKs.
- `doc-coauthoring`: structures collaborative documentation authoring workflows.
- `docx`: creates, reads, edits, and transforms Word documents.
- `frontend-design`: builds distinctive production-grade frontend interfaces.
- `internal-comms`: writes internal communication artifacts with better tone and structure.
- `mcp-builder`: designs and implements high-quality MCP servers.
- `pdf`: reads, edits, analyzes, and generates PDF-centered workflows.
- `pptx`: creates and edits PowerPoint presentations.
- `skill-creator`: creates and improves custom skills.
- `slack-gif-creator`: creates GIFs optimized for Slack usage.
- `theme-factory`: applies themes across artifacts such as slides and documents.
- `web-artifacts-builder`: builds rich multi-component HTML artifacts.
- `webapp-testing`: tests local web applications with Playwright-style workflows.
- `xlsx`: creates, edits, and analyzes spreadsheet workflows.

### Awesome Claude Skills catalog

- `artifacts-builder`: builds richer Claude artifacts with multiple coordinated components.
- `brand-guidelines`: applies Anthropic-style brand systems to outputs and collateral.
- `canvas-design`: produces visual art and designed canvases.
- `changelog-generator`: turns commit history into user-facing changelogs.
- `competitive-ads-extractor`: extracts and analyzes competitor ads from ad libraries.
- `connect`: connects Claude to external apps for real-world actions.
- `connect-apps`: links Claude to services like Gmail, Slack, and GitHub.
- `connect-apps-plugin`: plugin layer that enables the connected-app workflow.
- `content-research-writer`: combines research and writing for stronger content output.
- `developer-growth-analysis`: analyzes recent coding work for skill growth insights.
- `document-skills`: grouped document-processing workflows for office-style files.
- `domain-name-brainstormer`: generates and evaluates domain name ideas.
- `file-organizer`: organizes and restructures files and folders intelligently.
- `image-enhancer`: improves image quality, especially screenshots and assets.
- `internal-comms`: supports writing internal communication materials.
- `invoice-organizer`: organizes invoices and receipts for operational workflows.
- `langsmith-fetch`: fetches LangSmith traces for agent debugging.
- `lead-research-assistant`: researches and qualifies sales or partnership leads.
- `mcp-builder`: creates MCP servers and MCP integration plans.
- `meeting-insights-analyzer`: extracts behavioral and strategic insights from meetings.
- `raffle-winner-picker`: selects winners fairly from lists or sheets.
- `skill-creator`: designs new Claude skills.
- `skill-share`: creates skills and prepares them for sharing.
- `slack-gif-creator`: produces Slack-friendly animated GIFs.
- `tailored-resume-generator`: customizes resumes to specific job descriptions.
- `template-skill`: starter template for new skill authoring.
- `theme-factory`: themes visual artifacts consistently.
- `twitter-algorithm-optimizer`: optimizes posts for social distribution performance.
- `video-downloader`: downloads YouTube videos in selected formats.
- `webapp-testing`: tests local web apps and interactive flows.

### `superpowers` workflow skills

- `brainstorming`: mandatory ideation pass before creative work.
- `dispatching-parallel-agents`: splits independent tasks across multiple specialists.
- `executing-plans`: executes approved implementation plans methodically.
- `finishing-a-development-branch`: closes work cleanly when implementation is complete.
- `receiving-code-review`: processes review feedback before making corrections.
- `requesting-code-review`: triggers review when meaningful implementation is ready.
- `subagent-driven-development`: runs implementation through coordinated subagents.
- `systematic-debugging`: debug workflow for bugs, regressions, and failures.
- `test-driven-development`: enforces a TDD-first implementation sequence.
- `using-git-worktrees`: isolates feature work with worktrees.
- `using-superpowers`: bootstraps the overall Superpowers operating model.
- `verification-before-completion`: validates claims of completion before reporting success.
- `writing-plans`: writes implementation plans from specs or requirements.
- `writing-skills`: creates or refines skills.

### `notebooklm-py`

- `notebooklm`: uses Google NotebookLM programmatically to create notebooks, add sources, generate artifacts, and export results.

## Supporting Tooling Repositories

These are important even when they do not expose a classic skill or agent catalog in this repo shape.

- `n8n-mcp`: structured n8n knowledge layer for workflow automation work.
- `claude-mem`: persistent memory system plus plan/execution helpers.
- `notebooklm-py`: NotebookLM automation stack for research-heavy tasks.
- `awesome-claude-code`: future source of additional ecosystem curation and expansion paths.

## Zeus Routing Summary

If the request is about:

- remembering prior context: use `claude-mem` and `soul.md`
- planning or executing software work: use `get-shit-done`, `superpowers`, and `claude-mem`
- multi-agent architecture: use `claude-code-mastery`
- design or frontend: use `ui-ux-pro-max` plus design skills
- documents and artifacts: use `docx`, `pdf`, `pptx`, `xlsx`, `theme-factory`, `artifacts-builder`
- integrations and automation: use `n8n-mcp`, `mcp-builder`, and the Composio connect stack
- research and synthesis: use `notebooklm` and research-oriented skills
