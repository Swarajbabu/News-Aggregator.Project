@echo off
echo ========================================================
echo   Starting Lovely News Server at http://localhost:3000
echo ========================================================
echo.
start "" "http://localhost:3000"
python -m http.server 3000
if errorlevel 1 (
    echo Python server stopped or not found, trying Node serve...
    npx -y serve -l 3000 .
)
pause
