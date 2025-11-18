# Card Counter Trainer

A blackjack card-counting trainer focused on **running count** and **true count** drills,
with a roadmap toward a full-featured app (distractions, analytics, and strategy coaching).

## Project Structure

- `frontend/` – React app (trainer UI, drills)
- `backend/` – Flask API (for sessions, analytics, user data – minimal in V1)
- `.github/workflows/ci.yml` – CI to run frontend and backend tests

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
