$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$sourcesRoot = Join-Path $root "sources"
$outputPaths = @(
    (Join-Path $root "data\\ecosystem.json"),
    (Join-Path $root "apps\\olympus-dashboard\\data\\ecosystem.json")
)

function Get-FrontmatterValue {
    param(
        [string[]]$Lines,
        [string]$Key
    )

    $line = $Lines | Where-Object { $_ -match "^${Key}:" } | Select-Object -First 1
    if (-not $line) { return "" }
    return ($line -replace "^${Key}:\s*", "").Trim().Trim('"')
}

function Get-RepoSummary {
    param([System.IO.DirectoryInfo]$RepoDir)

    $readme = Join-Path $RepoDir.FullName "README.md"
    $description = ""
    if (Test-Path $readme) {
        $content = Get-Content $readme -TotalCount 40
        $description = ($content | Where-Object {
            $_.Trim() -and
            $_ -notmatch '^\s*#' -and
            $_ -notmatch '^\s*<' -and
            $_ -notmatch '^\s*>' -and
            $_ -notmatch '^\s*\[!' -and
            $_ -notmatch '^\s*```'
        } | Select-Object -First 1).Trim()
    }

    [PSCustomObject]@{
        name = $RepoDir.Name
        path = $RepoDir.FullName.Replace($root + "\", "")
        description = $description
    }
}

$repos = Get-ChildItem $sourcesRoot -Directory | Sort-Object Name
$skills = New-Object System.Collections.Generic.List[object]
$agents = New-Object System.Collections.Generic.List[object]
$squads = New-Object System.Collections.Generic.List[object]
$repoSummaries = New-Object System.Collections.Generic.List[object]

foreach ($repo in $repos) {
    $repoSummaries.Add((Get-RepoSummary -RepoDir $repo))

    Get-ChildItem $repo.FullName -Recurse -Filter "SKILL.md" -File | ForEach-Object {
        $lines = Get-Content $_.FullName -TotalCount 24
        $name = Get-FrontmatterValue -Lines $lines -Key "name"
        $description = Get-FrontmatterValue -Lines $lines -Key "description"
        $relativePath = $_.FullName.Replace($root + "\", "")

        $skills.Add([PSCustomObject]@{
            id = ($relativePath -replace "\\", "/").ToLowerInvariant()
            repo = $repo.Name
            name = if ($name) { $name } else { Split-Path $_.DirectoryName -Leaf }
            description = $description
            path = $relativePath
            folder = $_.Directory.Name
            family = if ($relativePath -match "composio-skills") { "composio-automation" } elseif ($relativePath -match "document-skills") { "document-skill" } else { "general" }
        })
    }

    Get-ChildItem $repo.FullName -Recurse -File -Include "*.md" | Where-Object {
        $_.DirectoryName -match "\\agents($|\\)" -and
        $_.Name -ne "README.md"
    } | ForEach-Object {
        $lines = Get-Content $_.FullName -TotalCount 24
        $name = Get-FrontmatterValue -Lines $lines -Key "name"
        $description = Get-FrontmatterValue -Lines $lines -Key "description"
        $relativePath = $_.FullName.Replace($root + "\", "")

        $agents.Add([PSCustomObject]@{
            id = ($relativePath -replace "\\", "/").ToLowerInvariant()
            repo = $repo.Name
            name = if ($name) { $name } else { $_.BaseName }
            description = $description
            path = $relativePath
            squad = if ($relativePath -match "squads\\([^\\]+)\\agents") { $Matches[1] } else { "" }
        })
    }

    Get-ChildItem (Join-Path $repo.FullName "squads") -Directory -ErrorAction SilentlyContinue | ForEach-Object {
        $readme = Join-Path $_.FullName "README.md"
        $config = Join-Path $_.FullName "config.yaml"
        $description = ""

        if (Test-Path $readme) {
            $description = (Get-Content $readme -TotalCount 30 | Where-Object {
                $_.Trim() -and $_ -notmatch '^\s*[#>`]'
            } | Select-Object -First 1).Trim()
        }

        $agentCount = (Get-ChildItem $_.FullName -Recurse -File -Include "*.md" | Where-Object {
            $_.DirectoryName -match "\\agents($|\\)"
        } | Measure-Object).Count

        $relativePath = $_.FullName.Replace($root + "\", "")
        $squads.Add([PSCustomObject]@{
            id = ($relativePath -replace "\\", "/").ToLowerInvariant()
            repo = $repo.Name
            name = $_.Name
            description = $description
            path = $relativePath
            config = if (Test-Path $config) { $config.Replace($root + "\", "") } else { "" }
            agentCount = $agentCount
        })
    }
}

$payload = [PSCustomObject]@{
    generatedAt = (Get-Date).ToString("s")
    summary = [PSCustomObject]@{
        repoCount = $repos.Count
        skillCount = $skills.Count
        agentCount = $agents.Count
        squadCount = $squads.Count
    }
    repositories = $repoSummaries
    squads = $squads | Sort-Object name
    agents = $agents | Sort-Object name
    skills = $skills | Sort-Object name
}

$json = $payload | ConvertTo-Json -Depth 8
foreach ($outputPath in $outputPaths) {
    $dir = Split-Path -Parent $outputPath
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    Set-Content -Path $outputPath -Value $json -Encoding UTF8
}

Write-Output "Generated ecosystem data:"
$payload.summary | Format-List
