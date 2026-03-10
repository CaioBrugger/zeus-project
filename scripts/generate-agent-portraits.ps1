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

$outputDir = Join-Path $root "apps\\olympus-dashboard\\assets\\portraits"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$style = "Create a premium mythic editorial portrait in a consistent visual universe. Greek god inspired character, realistic face, cinematic lighting, luxurious drapery, marble and gold atmosphere, elegant fantasy-tech direction, no text, portrait composition, 4:5."

$jobs = @(
    @{ File = "zeus-orchestrator.png"; Prompt = "$style Character: Zeus as sovereign orchestrator of an AI ecosystem, silver beard, luminous eyes, royal blue and gold robes, subtle lightning around a celestial command sigil." },
    @{ File = "mnemosyne-memory-keeper.png"; Prompt = "$style Character: Mnemosyne as keeper of project memory, serene woman with dark braided hair, moonlit ivory robes, floating memory tablets and constellation scrolls." },
    @{ File = "athena-strategist.png"; Prompt = "$style Character: Athena as systems strategist, wise armored scholar, owl insignia, bronze and ivory palette, tactical diagrams glowing like star maps." },
    @{ File = "hephaestus-builder.png"; Prompt = "$style Character: Hephaestus as builder of tools and interfaces, powerful artisan in volcanic forge light, obsidian workshop, golden mechanical glyphs and crafted panels." },
    @{ File = "hermes-integrator.png"; Prompt = "$style Character: Hermes as integration messenger, agile youthful figure, winged sandals, sapphire and gold palette, ribbons of connected portals and symbols orbiting him." },
    @{ File = "artemis-debugger.png"; Prompt = "$style Character: Artemis as bug hunter, focused huntress with silver bow, moonlit forest-tech environment, tracking glowing error fragments with precision." },
    @{ File = "apollo-quality.png"; Prompt = "$style Character: Apollo as guardian of quality, radiant figure with laurel crown, sunlit marble hall, instruments of balance, clarity and review sigils." },
    @{ File = "hestia-soul-keeper.png"; Prompt = "$style Character: Hestia as soul keeper of a living project, warm dignified guardian beside a sacred hearth, amber firelight, scrolls of principles and memory tablets." }
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
                aspectRatio = "4:5"
                imageSize = "1K"
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
