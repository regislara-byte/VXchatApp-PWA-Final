@echo off
title VXchatApp-PWA-Final GitHub Push

echo.
echo ============================================
echo      VXchatApp-PWA-Final
echo      Applied Engineering Push
echo ============================================
echo.

git status

echo.
set /p msg=Commit Message: 

if "%msg%"=="" set msg=Repository Update

echo.
git add .

echo.
git commit -m "%msg%"

echo.
git push origin main

echo.
echo ============================================
echo      PUSH COMPLETE
echo ============================================
echo.

pause