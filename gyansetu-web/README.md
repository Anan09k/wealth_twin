# GyanSetu Full Website (Frontend + Backend)

## Stack
- Frontend: Vite + Vanilla JS/CSS/HTML
- Backend: Node.js + Express REST API
- Deployment: Docker + docker-compose

## Run locally (without Docker)
```bash
cd gyansetu-web/backend && npm install && npm run dev
cd gyansetu-web/frontend && npm install && npm run dev
```
Frontend: http://localhost:5173  
Backend: http://localhost:8080/api/health

## Run with Docker (deploy-ready)
```bash
docker compose -f docker-compose.gyansetu.yml up --build
```
Site: http://localhost:3000

## API endpoints
- `GET /api/health`
- `GET /api/programs`
- `GET /api/testimonials`
- `POST /api/leads` with JSON `{ name, email, interest }`
- `GET /api/leads`
