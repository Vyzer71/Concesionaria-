# Script para empujar los cambios a GitHub
# Requiere tener Git instalado (https://git-scm.com/download/win)

Write-Host "Iniciando configuración de Git..." -ForegroundColor Cyan

# Inicializar si no está inicializado
if (-not (Test-Path .git)) {
    git init
    Write-Host "Repositorio Git inicializado." -ForegroundColor Green
}

# Agregar archivos
git add .
Write-Host "Archivos agregados al área de preparación." -ForegroundColor Green

# Commit
git commit -m "Rebranding completo: Concesionaria de Messi"
Write-Host "Commit creado con éxito." -ForegroundColor Green

# Renombrar rama a main
git branch -M main

# Configurar origen remoto
git remote remove origin 2>$null
git remote add origin https://github.com/Vyzer71/Concesionaria-
Write-Host "Repositorio remoto configurado a: https://github.com/Vyzer71/Concesionaria-" -ForegroundColor Green

Write-Host ""
Write-Host "Para empujar los cambios, ejecute el siguiente comando en su terminal con Git:" -ForegroundColor Yellow
Write-Host "git push -u origin main" -ForegroundColor Yellow -NoNewline
Write-Host " (puede requerir iniciar sesión en GitHub en su navegador)" -ForegroundColor Gray
