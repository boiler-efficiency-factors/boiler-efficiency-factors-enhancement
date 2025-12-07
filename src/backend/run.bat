@echo off
:: ==========================================
:: 프로젝트 경로로 이동 (본인 경로로 수정 필수!)
:: ==========================================
cd C:\workspace\boiler-efficiency-factors\src\backend

echo Starting Development Servers...

:: 1. Docker Redis 실행 (이미 컨테이너가 만들어져 있다고 가정)
start "Redis Server" cmd /c "docker start redis"

:: 2. Django 서버 실행 (새 창에서)
:: venv를 켜고 runserver를 실행합니다.
start "Django Server" cmd /k "call venv\Scripts\activate && python manage.py runserver 0.0.0.0:8000"

:: 3. Celery 워커 실행 (새 창에서)
:: venv를 켜고 celery를 실행합니다.
start "Celery Worker" cmd /k "call venv\Scripts\activate && celery -A boiler_analysis worker --loglevel=info --pool=solo"

echo All servers started!