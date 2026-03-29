# Research Compiler (Web)

## Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Prisma + SQLite

## Setup
1) Install dependencies
2) Create the database and Prisma client
3) Run dev server

```
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Environment
- `GEMINI_API_KEY` (optional, reserved for future compiler augmentation)

## Notes
- Compile logic is local and rule-based for now.
- MCP policy and skills files live at repo root.

