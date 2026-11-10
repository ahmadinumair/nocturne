@echo off
title HORLOGERIE NOCTURNE - React Frontend
echo =========================================================
echo   HORLOGERIE NOCTURNE - REACT FRONTEND (VITE)
echo =========================================================
echo.

cd frontend

if not exist node_modules (
    echo Menginstal dependensi npm...
    npm install
)

echo Menjalankan Vite Development Server...
npm run dev
pause

