# new-project

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/reaganstock/new-project)

ultrareach AI outreach platform built with React, Vite, TailwindCSS, Framer Motion, Zustand, and React Flow.

## Features

- Multi-platform DM campaign builder (Instagram, LinkedIn, Twitter/X, TikTok, Slack, WhatsApp, etc.)
- Message sequence editor with AI-powered suggestions, preview, and variant management
- Visual workflow builder with drag-and-drop steps: send DM, wait time, conditional branches, end campaign
- Save, tag, and reuse message templates across campaigns
- Full TypeScript support and strict linting

## Quick Start

### Prerequisites

- Node.js >=16
- npm or yarn

### Installation

```bash
git clone https://github.com/reaganstock/new-project.git
cd new-project
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite development server at http://localhost:5173

### Build & Preview

```bash
npm run build      # production bundle
npm run preview    # serve production build locally
```

### Linting

```bash
npm run lint
```

Runs ESLint with the project’s configuration.

## Project Structure

```
src/
  ├── components/
  │   ├── campaigns/sequence/  # message editor, AI suggestions, template modal
  │   ├── campaigns/steps/     # campaign creation steps (Name, Accounts, Schedule, Sequence)
  │   └── workflow/            # workflow editor, controls, node config
  ├── stores/                  # Zustand stores for templates and workflow
  ├── App.tsx                  # root application component
  └── main.tsx                 # entry point
```

## Configuration

- tsconfig.app.json: TypeScript compiler options for the app
- tailwind.config.js: TailwindCSS setup
- vite.config.ts: Vite bundler configuration

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.
