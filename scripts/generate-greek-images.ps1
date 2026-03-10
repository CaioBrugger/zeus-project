param(
    [string]$ApiKey = $env:GEMINI_API_KEY,
    [string]$Model = "gemini-3.1-flash-image-preview"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $root ".env.local"
if ((-not $ApiKey) -and (Test-Path $envFile)) {
    $line = Get-Content $envFile | Where-Object { $_ -match '^GEMINI_API_KEY=' } | Select-Object -First 1
    if ($line) {
        $ApiKey = ($line -replace '^GEMINI_API_KEY=', '').Trim()
    }
}

if (-not $ApiKey) {
    throw "Set GEMINI_API_KEY before running this script."
}

$outputDir = Join-Path $root "apps\\olympus-dashboard\\assets\\generated"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$jobs = @(
    @{
        File = "zeus-hero.png"
        Prompt = "Create a cinematic digital painting for a software platform called Zeus Project. Theme: Greek god Zeus as a strategic orchestrator in a celestial control room above Olympus. Marble consoles, golden holographic dashboards, lightning shaped data streams, midnight blue sky, premium editorial style, ultra detailed, no text, wide 16:9."
    },
    @{
        File = "athena-skills.png"
        Prompt = "Create a refined Greek mythology illustration for a technology dashboard. Athena as patron of skills and knowledge, surrounded by scrolls transforming into glowing interface cards, owl motifs, marble library, gold and ivory palette, elegant high-end concept art, no text, 4:3."
    },
    @{
        File = "hermes-automation.png"
        Prompt = "Create a dramatic Greek mythology scene for automation workflows. Hermes as messenger of integrations and MCP tools, sprinting through luminous corridors connecting many portals and apps, bronze and sapphire palette, crisp futuristic mythic style, no text, 4:3."
    },
    @{
        File = "hephaestus-forge.png"
        Prompt = "Create a mythic forge scene for coding agents and squads. Hephaestus forging glowing software sigils, agent emblems, and dashboard panels in a volcanic workshop of black stone and gold, premium fantasy-tech art direction, no text, 4:3."
    }
)

foreach ($job in $jobs) {
    $uri = "https://generativelanguage.googleapis.com/v1beta/models/$Model`:generateContent"
    $body = @{
        contents = @(
            @{
                role = "user"
                parts = @(
                    @{
                        text = $job.Prompt
                    }
                )
            }
        )
        generationConfig = @{
            responseModalities = @("Image")
            imageConfig = @{
                aspectRatio = if ($job.File -eq "zeus-hero.png") { "16:9" } else { "4:3" }
                imageSize = "2K"
            }
        }
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Method Post -Uri $uri -Headers @{
        "x-goog-api-key" = $ApiKey
    } -ContentType "application/json" -Body $body

    $imagePart = $response.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if (-not $imagePart) {
        throw "No image returned for $($job.File)"
    }

    $bytes = [Convert]::FromBase64String($imagePart.inlineData.data)
    $target = Join-Path $outputDir $job.File
    [IO.File]::WriteAllBytes($target, $bytes)
    Write-Output "Saved $target"
}
