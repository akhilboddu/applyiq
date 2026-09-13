# ApplyIQ

A full-stack job-application tracker built with React, Express and PostgreSQL. It includes an application dashboard, a drag-and-drop Kanban board, JWT authentication, streaming AI cover letters and realtime status updates.

This repository is the educational starter app. Production hardening and the broader application-pack product are separate work in progress.

## Student app-upgrade prompt

**[Open the reusable student prompt](STUDENT-APP-UPGRADE-PROMPT.md)**

Copy the entire prompt into your coding assistant while your own app repository is open. It asks the assistant to understand your existing app, improve its functionality and design, implement the changes, and verify the result through Chrome CDP. It is designed to work with different apps and stacks.

The prompt does not include credentials or private business configuration. Configure your own development environment and Chrome CDP access before using it.

## Project structure

- `client/`: React 19, Vite, React Router, React Query, Tailwind CSS, Recharts and dnd-kit.
- `server/`: Express 5, Prisma/PostgreSQL, authentication, application API, OpenAI integration and Socket.IO.
- [`course/slides/`](course/slides/): the course introduction and Modules 1–7, with Slidev presentation sources, styles and diagrams.
- `render.yaml`: Render deployment blueprint.
- `server/DEPLOYMENT.md`: environment and deployment notes; check them against the current configuration.

## Local setup

Use a Node.js version supported by the package dependencies and a local or disposable PostgreSQL database.

1. Run `npm ci` in `server/` and in `client/`.
2. Copy each directory's `.env.example` to `.env` and supply your own values. For local development, set the API's `CLIENT_URL` to the client origin, normally `http://localhost:5173`, and the client's `VITE_API_URL` to `http://localhost:3000`.
3. In `server/`, run `npm run build` and `npx prisma migrate deploy` against your development database.
4. Run `npm run dev` in each directory.

Never commit `.env` files, credentials, user CVs or database exports. Server integration tests require a separate disposable database; see `server/tests/setup.js` before running them.
