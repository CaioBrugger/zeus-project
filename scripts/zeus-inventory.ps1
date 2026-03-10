$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$sources = Join-Path $root "sources"

function Get-SkillCount($path) {
    if (-not (Test-Path $path)) { return 0 }
    return (Get-ChildItem $path -Directory | Measure-Object).Count
}

function Get-FileCount($path) {
    if (-not (Test-Path $path)) { return 0 }
    return (Get-ChildItem $path -File | Measure-Object).Count
}

$report = [PSCustomObject]@{
    Sources = Get-SkillCount $sources
    AnthropicSkills = Get-SkillCount (Join-Path $sources "skills\\skills")
    AwesomeClaudeSkills = Get-SkillCount (Join-Path $sources "awesome-claude-skills")
    SuperpowersSkills = Get-SkillCount (Join-Path $sources "superpowers\\skills")
    GSDAgents = Get-FileCount (Join-Path $sources "get-shit-done\\agents")
    SquadAgents = Get-FileCount (Join-Path $sources "aiox-core\\squads\\claude-code-mastery\\agents")
}

$report | Format-List
