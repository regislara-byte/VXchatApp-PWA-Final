@echo off
REM audit.bat
REM Runs the AERS documentation audit before commit/push

powershell -ExecutionPolicy Bypass -File "%~dp0audit.ps1" -DocsPath "%~dp0..\docs"
pause
