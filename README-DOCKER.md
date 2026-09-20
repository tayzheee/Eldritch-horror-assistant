# Running Eldritch Horror Companion with Docker

This application is fully containerized and ready for local development, local LAN multiplayer party tracking, or cloud deployment.

## Quick Start with Docker Compose

Run the following command in the project root:

```bash
docker compose up --build
```

Then open your browser and navigate to:
```
http://localhost:3000
```

## Running with Docker CLI directly

### 1. Build the image:
```bash
docker build -t eldritch-tracker .
```

### 2. Run the container:
```bash
docker run -d --name eldritch-tracker -p 3000:3000 --restart unless-stopped eldritch-tracker
```

The web app will now be accessible at `http://localhost:3000` or via your local network IP (e.g. `http://192.168.1.X:3000`) so all players at the table can access the tracker from tablets, phones, or laptops.

## Online Deployment (Cloud Run / VPS / Fly.io)

This Dockerfile is cloud-ready:
- Listens on `0.0.0.0`
- Respects the `$PORT` environment variable (defaults to 3000)
- Optimized multi-stage build produces a minimal, hardened Node.js Alpine runtime image.
