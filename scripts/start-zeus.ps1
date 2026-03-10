param(
    [int]$Port = 4173
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$url = "http://127.0.0.1:$Port/"
$python = "C:\Users\Caio Brugger\AppData\Local\Programs\Python\Python313\python.exe"

Set-Location $root

$existing = Get-CimInstance Win32_Process | Where-Object {
    $_.Name -eq "python.exe" -and
    $_.CommandLine -like "*http.server $Port*"
} | Select-Object -First 1

if (-not $existing) {
    Start-Process -FilePath $python -WorkingDirectory $root -ArgumentList "-m", "http.server", "$Port" | Out-Null
    Start-Sleep -Seconds 2
}

Start-Process $url | Out-Null
Write-Output "Zeus dashboard available at $url"
