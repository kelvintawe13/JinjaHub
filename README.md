# Jinja Edu-Hub (JinjaHub)

An education and employment platform for Jinja: browse courses, register and verify an account, learn inside the Learning Space, and find local jobs. Employers can post hiring needs through a dedicated application flow.

![stack](https://img.shields.io/badge/React-18-blue) ![stack](https://img.shields.io/badge/TypeScript-5-blue) ![stack](https://img.shields.io/badge/Vite-5-purple) ![stack](https://img.shields.io/badge/Tailwind_CSS-3.4-teal)

---

## Features

- **Landing page** — hero, sector strip, course showcase, job teaser, success stories, FAQs, partner logos, and a final CTA
- **Courses** — catalog with detail pages per course
- **How It Works** — a step-by-step walkthrough (steps & next-steps data driven)
- **Jobs** — browsable job listings with job cards
- **Learning Space** (auth required) — dashboard, learning, messages, profile, and certificate sections
- **Authentication** — sign up, sign up details (apply), email verification (code input), sign in, forgot password, and reset password flows
- **Employer funnel** — `/employers` redirects employers to the contact form with the hiring topic pre-selected
- **Responsive UI** — Tailwind CSS with custom design tokens (`forest`, `ink`, `paper`), Framer Motion animations, Lucide icons

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | React 18 + TypeScript 5             |
| Build tool | Vite 5                              |
| Routing    | React Router DOM 6                  |
| Styling    | Tailwind CSS 3 (`tailwind-merge`)   |
| Animation  | Framer Motion 11                    |
| Icons      | Lucide React                        |
| Testing    | (planned) Vitest                    |
| Auth       | Mock auth (`src/utils/mockAuth.ts`) |

## Requirements

- **Node.js ≥ 20**
- **npm ≥ 10**
- Operating systems: **macOS** (Apple Silicon or Intel), **Linux**, or **Windows** (native or WSL). Architectures: **x64** and **arm64**.
- No database or backend server needed — data currently comes from `src/data/` and mock utilities.

## Getting Started

```bash
# 1. Clone (into ~/Downloads/JinjaHub at the moment) and install dependencies
cd JinjaHub
npm install

# 2. Start the dev server (auto-opens at the printed URL)
npm run dev
```

Then open: `http://localhost:5173/`

## Commands

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start the Vite development server (HMR)    |
| `npm run build`   | Bundle into `dist/`                        |
| `npm run preview` | Preview the built app locally              |
| `npm run lint`    | ESLint across `.js/.jsx/.ts/.tsx` files    |

## Routes

| Route                      | Page                              | Access   |
| -------------------------- | --------------------------------- | -------- |
| `/`                        | Landing                           | Public   |
| `/courses`                 | Courses                           | Public   |
| `/courses/:course`         | Course detail                     | Public   |
| `/how-it-works`            | How it works                      | Public   |
| `/jobs`                    | Jobs                              | Public   |
| `/about`, `/contact`       | About, Contact                    | Public   |
| `/sign-up`, `/sign-in`     | Register, Sign in                 | Public   |
| `/verify`                  | Sign up details / verification    | Public   |
| `/forgot-password`, `/reset-password` | Password recovery      | Public   |
| `/apply`, `/apply/received`| Employer application + receipt    | Public   |
| `/dashboard`               | Learning Space — dashboard        | Protected|
| `/learning`                | Learning Space — learning         | Protected|
| `/messages`                | Learning Space — messages         | Protected|
| `/profile`                 | Learning Space — profile          | Protected|
| `/certificate`             | Learning Space — certificate      | Protected|
| `/employers`               | → redirects to `/contact?topic=hiring` | Public |

## Project Structure

```
├── index.html                  # App shell
├── package.json                # Dependencies, scripts, engine requirements
├── tailwind.config.js          # Tailwind theme (forest/ink/paper palette)
├── tsconfig.json               # TypeScript config (bundler mode, strict)
├── vite.config.ts              # Vite + React plugin
└── src/
    ├── App.tsx                 # Router & route tree
    ├── index.tsx               # Entry point
    ├── components/
    │   ├── auth/               # Auth layout, code input
    │   ├── cards/              # Course, job, stat, story, partner cards
    │   ├── landing/            # Hero, sections for the landing page
    │   ├── layout/             # Navbar, footer, scroll manager, auth guard
    │   └── ui/                 # Reusable primitives (buttons, fields, alerts…)
    ├── contexts/AuthContext.tsx # Auth state provider
    ├── data/                   # Static course/job/faq/story content
    ├── hooks/                  # useAuth, countdown, resend timer, form helpers
    ├── pages/                  # Route pages (landing, auth, learning)
    ├── types/                  # Auth & content type definitions
    └── utils/                  # Validation, storage, mock auth/contact, cn()
```

## Notes

- `src/package.json` is a leftover manifest from the code-generation tool ("Magic Patterns") that produced this project. It is **not used** at runtime; the root `package.json` is the source of truth. It can be deleted safely.
- The content lives in `src/data/` — new courses, jobs, sectors, FAQs, etc., can be added by editing those modules.
- Authentication is mocked for demo purposes; real auth/verification will need a backend.

## License

Private and unlicensed for now — all rights reserved by the Jinja Edu-Hub team.
