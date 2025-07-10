# auto_push.ps1 - VAXINX Pusher Script
cd "D:\ALTAR\ALTAR 7– VAXinXchat APP\github\vxchatapp\VXchatApp_PWA_Final"

# Ask for commit message
$commitMsg = Read-Host "📝 Enter commit message"

# Auto git punch
git add .
git commit -m "$commitMsg"
git push origin gh-pages

# Timestamp log
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path "push_log.txt" -Value "$timestamp | $commitMsg"

# Done
Write-Host "✅ Pushed to GitHub Pages successfully at $timestamp!"
