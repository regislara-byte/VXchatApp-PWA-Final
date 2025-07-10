@echo off
echo === Auto Push VXchatApp Vault to GitHub ===
git add .
git commit -m "⚡ Quick push update – README or minor tweaks"
git push
echo === DONE! Vault successfully committed & pushed. ===
pause
