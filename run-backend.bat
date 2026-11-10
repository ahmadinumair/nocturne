@echo off
title HORLOGERIE NOCTURNE - Rust Backend
echo =========================================================
echo   HORLOGERIE NOCTURNE - RUST BACKEND SERVICE (AXUM)
echo =========================================================
echo.

where cargo >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [PERINGATAN] Rust / Cargo belum terpasang di komputer Anda.
    echo.
    echo Untuk menginstal Rust:
    echo   1. Kunjungi https://rustup.rs atau jalankan: winget install Rustlang.Rustup
    echo   2. Ikuti petunjuk di layar (pilih opsi 1 - default)
    echo   3. Buka ulang terminal ini dan jalankan run-backend.bat kembali.
    echo.
    echo Catatan: Website React sudah dapat dijalankan langsung dan memiliki
    echo simulasi klien mandiri tanpa harus menunggu instalasi Rust!
    echo.
    pause
    exit /b 1
)

cd backend
echo Mengompilasi dan menjalankan Rust Axum Backend di port 8080...
cargo run
pause

