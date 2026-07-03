@echo off
title VXchatApp Applied Engineering Push

REM ==========================================
REM Always run from repository root
REM ==========================================

cd /d "%~dp0"
cd ..

echo.
echo ============================================
echo        VXchatApp Applied Engineering Push
echo ============================================
echo.

if not exist ".git" (
    echo.
    echo ERROR:
    echo This is not a Git repository.
    pause
    exit /b
)

git status

echo.
set /p msg=Commit Message:

if "%msg%"=="" set msg=Repository Update

echo.
git add .

git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Nothing to commit.
    pause
    exit /b
)

git push origin main

if errorlevel 1 (
    echo.
    echo Push Failed.
    pause
    exit /b
)

echo.
echo ============================================
echo          PUSH SUCCESSFUL
echo ============================================

git log --oneline -1

pause