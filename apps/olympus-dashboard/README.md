# Olympus Dashboard

Greek mythology themed dashboard for the Zeus Project ecosystem.

## What it shows

- imported repositories
- discovered skills
- discovered agents
- discovered squads
- summary counts and searchable cards
- beginner journeys for non-technical onboarding
- curated mythological agent personas
- dedicated Soul UI

## Files

- `index.html`: entry page
- `styles.css`: visual system and layout
- `app.js`: inventory loading and filtering
- `data/ecosystem.json`: generated dataset
- `data/personas.json`: curated character cast and beginner journeys
- `data/soul.json`: structured Soul content for the dedicated interface
- `assets/generated/`: Gemini-generated Greek mythology artwork
- `assets/portraits/`: consistent agent portraits generated with Gemini

## Refreshing the dashboard

1. Run `powershell -NoProfile -File scripts\generate-ecosystem-data.ps1`
2. If needed, regenerate artwork with `GEMINI_API_KEY` set in `.env.local`:
   `powershell -NoProfile -File scripts\generate-greek-images.ps1`
3. Serve locally:
   `powershell -NoProfile -File scripts\start-dashboard.ps1`

## Opening the UI

1. Run `powershell -NoProfile -File scripts\start-dashboard.ps1`
2. Open `http://127.0.0.1:4173/apps/olympus-dashboard/`

## One-command launch

Run `powershell -NoProfile -File scripts\start-zeus.ps1`

## Main project entry

After running the command above, the root project home opens first:
`http://127.0.0.1:4173/`
