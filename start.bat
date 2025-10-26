@echo off
echo ========================================
echo Hotel Booking System Startup Script
echo ========================================
echo.

echo Checking if MongoDB is running...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MongoDB is not installed or not in PATH
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    echo Or start MongoDB manually if already installed
    pause
    exit /b 1
)

echo MongoDB found. Starting services...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm install && npm run dev"
cd ..

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "npm install && npm start"
cd ..

echo.
echo ========================================
echo Services Starting...
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Default Admin Account:
echo Email: admin@hotelbooking.com
echo Password: admin123
echo.
echo Default User Accounts:
echo Email: john@example.com, Password: password123
echo Email: jane@example.com, Password: password123
echo Email: mike@example.com, Password: password123
echo.
echo To seed the database with sample data, run:
echo cd backend && node scripts/seedData.js
echo.
echo Press any key to exit...
pause >nul