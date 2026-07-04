# audit.ps1
# AERS Documentation Audit
# Flags duplicate IMPLEMENTATION_0XX files, empty docs, and other repo-standard violations
# before you commit.

param(
    [string]$DocsPath = "docs"
)

function Write-Section($title) {
    Write-Host ""
    Write-Host "=============================================" -ForegroundColor Green
    Write-Host " $title" -ForegroundColor Cyan
    Write-Host "=============================================" -ForegroundColor Green
}

if (-not (Test-Path $DocsPath)) {
    Write-Host "docs/ folder not found at path: $DocsPath" -ForegroundColor Red
    exit 1
}

$issuesFound = 0

# ---------------------------------------------------------------
# 1. Duplicate IMPLEMENTATION_0XX files (more than one file per number)
# ---------------------------------------------------------------
Write-Section "Checking for duplicate IMPLEMENTATION files"

$implFiles = Get-ChildItem -Path $DocsPath -Filter "IMPLEMENTATION_*.md"

$grouped = $implFiles | Group-Object {
    if ($_.Name -match '^(IMPLEMENTATION_\d+)') {
        $matches[1]
    } else {
        $_.Name
    }
}

foreach ($group in $grouped) {
    if ($group.Count -gt 1) {
        $issuesFound++
        Write-Host ""
        Write-Host "DUPLICATE: $($group.Name) has $($group.Count) files:" -ForegroundColor Yellow
        foreach ($f in $group.Group) {
            $size = (Get-Item $f.FullName).Length
            Write-Host "   - $($f.Name)  ($size bytes)" -ForegroundColor Yellow
        }
        Write-Host "   -> Keep ONE named file (e.g. IMPLEMENTATION_0XX-Descriptive-Name.md)." -ForegroundColor DarkYellow
        Write-Host "   -> Delete the bare '.md' and any '-Planned.md' variant." -ForegroundColor DarkYellow
    }
}

if ($issuesFound -eq 0) {
    Write-Host "No duplicate IMPLEMENTATION files found." -ForegroundColor Green
}

# ---------------------------------------------------------------
# 2. Empty or near-empty docs (likely unfinished stubs)
# ---------------------------------------------------------------
Write-Section "Checking for empty or stub docs"

$emptyThresholdBytes = 40  # anything smaller than this is basically an empty file
$allDocs = Get-ChildItem -Path $DocsPath -Filter "*.md"
$emptyCount = 0

foreach ($doc in $allDocs) {
    $size = (Get-Item $doc.FullName).Length
    if ($size -lt $emptyThresholdBytes) {
        $emptyCount++
        $issuesFound++
        Write-Host "EMPTY/STUB: $($doc.Name)  ($size bytes)" -ForegroundColor Yellow
    }
}

if ($emptyCount -eq 0) {
    Write-Host "No empty or stub docs found." -ForegroundColor Green
}

# ---------------------------------------------------------------
# 3. Duplicate root-level docs (e.g. ROADMAP.md + ROADMAP1.md)
# ---------------------------------------------------------------
Write-Section "Checking for duplicate root docs"

$coreDocs = @("ROADMAP", "CONTINUE_PROJECT", "PROJECT_STATUS", "WORKFLOW", "VLA", "VLA_INDEX")
$rootDupFound = $false

foreach ($core in $coreDocs) {
    $matches = Get-ChildItem -Path $DocsPath -Filter "$core*.md" | Where-Object {
        $_.BaseName -match "^$core(\d+)?$"
    }
    if ($matches.Count -gt 1) {
        $rootDupFound = $true
        $issuesFound++
        Write-Host ""
        Write-Host "DUPLICATE ROOT DOC: $core has $($matches.Count) versions:" -ForegroundColor Yellow
        foreach ($m in $matches) {
            Write-Host "   - $($m.Name)" -ForegroundColor Yellow
        }
        Write-Host "   -> Keep only $core.md" -ForegroundColor DarkYellow
    }
}

if (-not $rootDupFound) {
    Write-Host "No duplicate root docs found." -ForegroundColor Green
}

# ---------------------------------------------------------------
# Summary
# ---------------------------------------------------------------
Write-Section "AUDIT SUMMARY"

if ($issuesFound -eq 0) {
    Write-Host " Repository is clean. Safe to commit." -ForegroundColor Green
} else {
    Write-Host " $issuesFound issue(s) found. Fix before committing." -ForegroundColor Red
}
Write-Host ""
