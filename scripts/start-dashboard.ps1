$ErrorActionPreference = "Stop"

param(
    [int]$Port = 4173
)

$root = Split-Path -Parent $PSScriptRoot

Set-Location $root
Write-Output "Serving Olympus Dashboard at http://127.0.0.1:$Port/apps/olympus-dashboard/"
python -m http.server $Port
