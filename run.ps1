# =====================================================================
#  OA Portal - one-command launcher
#
#    Right-click > Run with PowerShell,  or:   .\run.ps1
#    Lives in study\ ; drives the portal in study\oa-portal\
#
#  Checks the toolchain, installs/builds anything missing, starts the
#  server and opens the portal in your browser. Safe to re-run: it skips
#  every step that is already done.
#
#    .\run.ps1 -Rebuild    force a fresh frontend build
#    .\run.ps1 -Tests      regenerate all test data (slow, ~2 min)
#    .\run.ps1 -Stop       just stop a running server
#    .\run.ps1 -NoOpen     start without opening the browser
# =====================================================================
param(
    [switch]$Rebuild,
    [switch]$Tests,
    [switch]$Stop,
    [switch]$NoOpen,
    [int]$Port = 4321
)

# NOTE: deliberately NOT 'Stop'. In Windows PowerShell 5.1 a native command
# writing to stderr (npm does, routinely) is turned into a terminating
# NativeCommandError under 'Stop'. We check $LASTEXITCODE explicitly instead.
$ErrorActionPreference = 'Continue'
Set-Location -LiteralPath (Join-Path $PSScriptRoot 'oa-portal')

# Run a native command quietly and report its real exit code.
# Streams go to temp files rather than through `2>&1`, because merging a
# native command's stderr into the PowerShell pipeline turns ordinary
# warnings into NativeCommandError records and corrupts the exit status.
function Invoke-Quiet {
    # NOTE: the parameter is CmdArgs, not Args - $Args is a PowerShell
    # automatic variable and a parameter of that name silently never binds.
    param([string]$File, [string[]]$CmdArgs, [string]$WorkDir)

    if ($File -eq 'npm' -and (Get-Command 'npm.cmd' -ErrorAction SilentlyContinue)) { $File = 'npm.cmd' }

    $o = [System.IO.Path]::GetTempFileName()
    $e = [System.IO.Path]::GetTempFileName()
    try {
        $sp = @{
            FilePath = $File; ArgumentList = $CmdArgs; NoNewWindow = $true; Wait = $true;
            PassThru = $true; RedirectStandardOutput = $o; RedirectStandardError = $e
        }
        if ($WorkDir) { $sp.WorkingDirectory = (Resolve-Path $WorkDir).Path }
        $p = Start-Process @sp
        $out = (Get-Content $o -Raw -ErrorAction SilentlyContinue) + "`n" +
               (Get-Content $e -Raw -ErrorAction SilentlyContinue)
        return @{ ok = ($p.ExitCode -eq 0); code = $p.ExitCode; out = $out }
    } catch {
        return @{ ok = $false; code = -1; out = $_.Exception.Message }
    } finally {
        Remove-Item $o, $e -Force -ErrorAction SilentlyContinue
    }
}

function Say  ($m) { Write-Host "  $m" }
function Ok   ($m) { Write-Host "  [ok]   $m"   -ForegroundColor Green }
function Warn ($m) { Write-Host "  [warn] $m"   -ForegroundColor Yellow }
function Bad  ($m) { Write-Host "  [fail] $m"   -ForegroundColor Red }
function Head ($m) { Write-Host ""; Write-Host "  $m" -ForegroundColor Cyan; Write-Host "  $('-' * 60)" -ForegroundColor DarkGray }

function Stop-Portal {
    $ids = (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue).OwningProcess |
           Select-Object -Unique
    if ($ids) { foreach ($i in $ids) { Stop-Process -Id $i -Force -ErrorAction SilentlyContinue }; return $true }
    return $false
}

Write-Host ""
Write-Host "  OA PORTAL" -ForegroundColor White
Write-Host "  local practice judge" -ForegroundColor DarkGray

# ---------------------------------------------------------------- stop only
if ($Stop) {
    Head "Stopping"
    if (Stop-Portal) { Ok "server on port $Port stopped" } else { Say "nothing was running on port $Port" }
    Write-Host ""
    return
}

# ---------------------------------------------------------------- toolchain
Head "Toolchain"
$fatal = $false

foreach ($t in @(
    @{ n = 'node';  need = $true;  why = 'runs the server'      },
    @{ n = 'npm';   need = $true;  why = 'installs the frontend' },
    @{ n = 'g++';   need = $true;  why = 'compiles C++ answers'  },
    @{ n = 'javac'; need = $false; why = 'compiles Java answers' }
)) {
    $c = Get-Command $t.n -ErrorAction SilentlyContinue
    if ($c) {
        $v = try { (& $t.n --version 2>&1 | Select-Object -First 1) } catch { '' }
        if (-not $v) { $v = try { (& $t.n -version 2>&1 | Select-Object -First 1) } catch { '' } }
        Ok ("{0,-6} {1}" -f $t.n, $v)
    }
    elseif ($t.need) { Bad "$($t.n) not found - $($t.why)"; $fatal = $true }
    else             { Warn "$($t.n) not found - $($t.why). C++ will still work." }
}
if ($fatal) { Write-Host ""; Bad "Install the missing tools, then run this again."; Write-Host ""; return }

# ---------------------------------------------------------------- storage
Head "Storage"
$mongoUp = $false
try {
    $t = New-Object System.Net.Sockets.TcpClient
    $iar = $t.BeginConnect('127.0.0.1', 27017, $null, $null)
    if ($iar.AsyncWaitHandle.WaitOne(1200, $false) -and $t.Connected) { $mongoUp = $true }
    $t.Close()
} catch {}
if ($mongoUp) { Ok "MongoDB reachable on 127.0.0.1:27017 - code and progress persist there" }
else          { Warn "no local MongoDB - falling back to JSON files in .data\ (works fine)" }

# ---------------------------------------------------------------- deps
Head "Dependencies"
if (-not (Test-Path 'node_modules\mongodb')) {
    Say "installing mongodb driver..."
    $r = Invoke-Quiet 'npm' @('install', '--no-audit', '--no-fund')
    if ($r.ok) { Ok "server dependencies installed" } else { Bad "npm install failed"; Say $r.out; return }
} else { Ok "server dependencies present" }

if (-not (Test-Path 'frontend\node_modules')) {
    Say "installing frontend packages (first run, ~40s)..."
    $r = Invoke-Quiet 'npm' @('--prefix', 'frontend', 'install', '--no-audit', '--no-fund')
    if ($r.ok) { Ok "frontend packages installed" } else { Bad "npm install failed"; Say $r.out; return }
} else { Ok "frontend packages present" }

# ---------------------------------------------------------------- test data
Head "Problem data"
$missing = @(Get-ChildItem 'problems' -Directory -ErrorAction SilentlyContinue |
             Where-Object { -not (Test-Path (Join-Path $_.FullName 'tests')) })
if ($Tests -or $missing.Count -gt 0) {
    $total = (Get-ChildItem 'problems' -Directory).Count
    # A fresh clone has NO test data at all: those files were validated before
    # they were committed and the generators are seeded, so regenerating them
    # byte-for-byte does not need the brute-force cross-check repeated. When
    # only some problems are missing data, somebody is authoring - validate.
    $fresh = (-not $Tests) -and ($missing.Count -eq $total)
    if ($missing.Count -gt 0) { Say "$($missing.Count) problem(s) have no tests yet" }
    if ($fresh) {
        Say "first run: generating test data for $total problems (~10 minutes, once)..."
        $r = Invoke-Quiet 'node' @('tools/build_tests.js', '--fast')
    } else {
        Say "generating and validating test data (this takes a few minutes)..."
        $r = Invoke-Quiet 'node' @('tools/build_tests.js')
    }
    ($r.out -split "`r?`n") | Where-Object { $_ -match 'stress|slowest|ALL PROBLEMS|FAILURE' } | ForEach-Object { Say $_.Trim() }
    if ($r.ok) { Ok "test data built and validated" } else { Bad "test generation reported failures - see above" }
} else {
    $n = (Get-ChildItem 'problems\*\tests\*.in' -ErrorAction SilentlyContinue).Count
    $p = (Get-ChildItem 'problems' -Directory).Count
    Ok "$n hidden tests across $p problems"
}

$starterCount = (Get-ChildItem 'problems\*\starters\main.cpp' -ErrorAction SilentlyContinue).Count
$problemCount = (Get-ChildItem 'problems' -Directory).Count
if ($starterCount -lt $problemCount) {
    Invoke-Quiet 'node' @('tools/make_starters.js') | Out-Null
    Ok "starter templates generated"
} else { Ok "starter templates present" }

if (-not (Test-Path 'server\catalog.generated.json')) {
    Invoke-Quiet 'node' @('tools/build_catalog.js') | Out-Null
    Ok "question catalogue built from the plan"
}

# ---------------------------------------------------------------- frontend
Head "Frontend"
$needBuild = $Rebuild -or -not (Test-Path 'frontend\dist\index.html')
if (-not $needBuild) {
    $newestSrc = (Get-ChildItem 'frontend\src', 'frontend\index.html' -Recurse -File |
                  Sort-Object LastWriteTime -Descending | Select-Object -First 1).LastWriteTime
    $built = (Get-Item 'frontend\dist\index.html').LastWriteTime
    if ($newestSrc -gt $built) { $needBuild = $true; Say "source is newer than the last build" }
}
if ($needBuild) {
    Say "building..."
    # call vite through node directly - the npm shim behaves badly under
    # Start-Process on Windows and reports false failures
    $vite = 'node_modules\vite\bin\vite.js'
    if (Test-Path (Join-Path 'frontend' $vite)) {
        $r = Invoke-Quiet 'node' @($vite, 'build') -WorkDir 'frontend'
    } else {
        $r = Invoke-Quiet 'npm' @('--prefix', 'frontend', 'run', 'build')
    }
    ($r.out -split "`r?`n") | Where-Object { $_ -match 'built in|dist/assets' } | ForEach-Object { Say $_.Trim() }
    if ($r.ok) { Ok "frontend built" }
    else {
        Bad "frontend build failed (exit $($r.code))"
        ($r.out -split "`r?`n") | Where-Object { $_.Trim() } | Select-Object -First 12 | ForEach-Object { Say $_.Trim() }
        return
    }
} else { Ok "frontend build is up to date" }

# ---------------------------------------------------------------- launch
Head "Server"
if (Stop-Portal) { Say "stopped a server already using port $Port"; Start-Sleep -Milliseconds 900 }

New-Item -ItemType Directory -Force -Path '.data' | Out-Null
$env:PORT = "$Port"
Start-Process -FilePath 'node' -ArgumentList 'server/index.js' -WindowStyle Hidden `
    -RedirectStandardOutput '.data\server.log' -RedirectStandardError '.data\server.err'

$url = "http://localhost:$Port"
$up = $false
for ($i = 0; $i -lt 40; $i++) {
    Start-Sleep -Milliseconds 400
    try {
        $r = Invoke-WebRequest "$url/api/me" -UseBasicParsing -TimeoutSec 3
        $up = $true; break
    } catch {
        if ($_.Exception.Response -and $_.Exception.Response.StatusCode.value__ -eq 401) { $up = $true; break }
    }
}

if (-not $up) {
    Bad "server did not come up"
    if (Test-Path '.data\server.err') { Get-Content '.data\server.err' | Select-Object -First 15 | ForEach-Object { Say $_ } }
    Write-Host ""
    return
}

Ok "running at $url"
Get-Content '.data\server.log' -ErrorAction SilentlyContinue |
    Where-Object { $_ -match 'storage|problems|accounts' } | ForEach-Object { Say $_.Trim() }

if (-not $NoOpen) { Start-Process $url; Ok "opened in your browser" }

Write-Host ""
Write-Host "  Sign in:  Subhodeep / 123456   or   kashish / 123456" -ForegroundColor White
Write-Host "  Your code:  workspace\   (open this folder in VS Code)" -ForegroundColor DarkGray
Write-Host "  Stop it:    .\run.ps1 -Stop" -ForegroundColor DarkGray
Write-Host ""

# tool version probes above can leave a stale non-zero code behind
$global:LASTEXITCODE = 0
exit 0
