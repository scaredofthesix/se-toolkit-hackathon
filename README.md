# WhatToEat

A full-stack web application that helps users find personalized recipe suggestions based on their nutrition goals, cooking experience, and available ingredients.

## Features

- Choose a nutrition goal (weight loss, muscle gain, maintenance, healthy eating)
- Select cooking experience level (beginner, intermediate, advanced)
- Input ingredients you have at home with autocomplete
- Get recipes ranked by ingredient match percentage
- Log meals and track daily/weekly calorie intake
- Save favorite recipes
- Auto-generate shopping lists for missing ingredients

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Python FastAPI + SQLAlchemy
- **Database**: PostgreSQL 16
- **Auth**: JWT + bcrypt

---

## Quick Start with Docker

```bash
# Start all services (PostgreSQL + Backend + Frontend)
docker-compose up --build

# In a new terminal, seed the database
docker-compose exec backend python -m app.seed
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Manual Setup (without Docker)

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 16

### 1. Database

```bash
# Create the database
psql -U postgres -c "CREATE USER whattoeat WITH PASSWORD 'whattoeat';"
psql -U postgres -c "CREATE DATABASE whattoeat OWNER whattoeat;"
```

### 2. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment
cp .env.example .env

# Run the seed script (creates tables + sample data)
python -m app.seed

# Start the server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/ingredients?search=` | Autocomplete ingredients |
| POST | `/api/recipes/match` | Match recipes by ingredients |
| GET | `/api/recipes/:id` | Get recipe details |
| POST | `/api/meals/log` | Log a meal |
| GET | `/api/meals/today` | Today's meals + calories |
| GET | `/api/meals/week` | Weekly calorie summary |
| POST | `/api/favorites/:id` | Toggle favorite |
| GET | `/api/favorites` | Get favorites |
| POST | `/api/shopping-list/generate/:id` | Generate shopping list |
| GET | `/api/shopping-list` | Get shopping list |
| PATCH | `/api/shopping-list/:id` | Toggle item checked |

## Calorie Targets by Goal

| Goal | Daily Calories |
|------|---------------|
| Weight Loss | 1,500 - 1,800 |
| Muscle Gain | 2,500 - 3,000 |
| Maintenance | 2,000 - 2,200 |
| Healthy Eating | ~2,000 (balanced macros) |

## Seed Data

The seed script (`python -m app.seed`) populates:
- **55 ingredients** across 6 categories (meat, dairy, vegetable, grain, fruit, spice/pantry)
- **30 recipes** with real instructions, calorie/macro data, and goal tags
