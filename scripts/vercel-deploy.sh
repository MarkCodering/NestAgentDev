#!/usr/bin/env bash
set -euo pipefail

if ! command -v vercel >/dev/null 2>&1; then
  echo "Vercel CLI not found. Install with: npm install -g vercel" >&2
  exit 1
fi

TARGET=${1:-all}
MODE=${2:---prod}

case "$MODE" in
  --prod|--preview) ;; 
  *)
    echo "Unknown mode: $MODE (use --prod or --preview)" >&2
    exit 1
    ;;
esac

deploy_backend() {
  echo "Deploying backend (NestJS) from repo root..."
  vercel $MODE
}

deploy_frontend() {
  echo "Deploying frontend (Next.js) from ./frontend..."
  vercel $MODE --cwd frontend
}

case "$TARGET" in
  backend)
    deploy_backend
    ;;
  frontend)
    deploy_frontend
    ;;
  all)
    deploy_backend
    deploy_frontend
    ;;
  *)
    echo "Usage: $0 [backend|frontend|all] [--prod|--preview]" >&2
    exit 1
    ;;
esac
