$ErrorActionPreference = "Stop"
Write-Host "Setting up Student Bursary Claims System..." -ForegroundColor Cyan

if (-not (Test-Path "backend/.env")) { Copy-Item "backend/.env.example" "backend/.env" }
if (-not (Test-Path "frontend/.env")) { Copy-Item "frontend/.env.example" "frontend/.env" }

Push-Location backend
npm install
Pop-Location

Push-Location frontend
npm install
Pop-Location

Write-Host "Setup complete." -ForegroundColor Green
Write-Host "Run .\\run-backend.ps1 in one PowerShell window and .\\run-frontend.ps1 in another."
