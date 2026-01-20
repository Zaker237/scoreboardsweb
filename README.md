# Scoreboards

Scoreboards is an football (soccer) scoreboard and statistics frontend application.
It provides a modern, responsive UI to display matches, results, standings, player statistics, and competition data.

This repository contains only the frontend of the Scoreboards platform and is designed to work with a REST API backend.

## ✨ Features

- 🏟️- Match listings (upcoming, live, finished)

- ⚽ Goals, cards, substitutions timeline

- 📊 Team & player statistics

- 🏆 League & cup competitions

- 🎨 Built with shadcn/ui and Tailwind CSS

- ⚡ Fast rendering with Next.js

- 🧑‍💻 Open for community contributions

## 🛠️ Tech Stack

- Next.js

- React

- TypeScript

- shadcn/ui

- Tailwind CSS

- Axios

## 📂 Project Structure

```
├── app/               # Next.js App Router (routes, layouts, pages)
├── components/        # Reusable UI components (shared & feature-based)
├── constants/         # App-wide constants (routes, config, static values)
├── contexts/          # React Context providers (auth, theme, settings)
├── enums/             # TypeScript enums (statuses, types, roles)
├── interfaces/        # Domain interfaces (API responses, DTOs)
├── lib/               # App setup & external integrations
├── public/            # Static assets (images, icons, fonts)
├── reducers/          # Reducers (useReducer / global state logic)
├── services/          # API service layer (Axios, endpoints)
└── types/             # Shared & generic TypeScript types
```

## 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Zaker237/scoreboardsweb.git
cd scoreboardsweb
```

### Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### Configure environment variables

Create a .env.local file:

```bash
NEXT_PUBLIC_API_HOST=http://localhost:8000/api
```

Adjust the URL to match your backend.

### Run the development server

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## 🔌 Backend Integration

This frontend expects a REST API providing:

- Matches

- Teams

- Players

- Goals, cards, substitutions

- Competitions (leagues & cups)

The backend implementation is not included in this repository.

## 🤝 Contributing

Contributions are welcome! 🎉

### How to contribute:

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add my feature"
```

4. Push to your fork

5. Open a Pull Request

### Please:

- Follow existing code style

- Keep components small and reusable

- Use TypeScript types where possible

## 📌 Roadmap

- [ ] Live match updates

- [ ] Dark mode improvements

- [ ] mobile app

- [ ] i18n (multi-language support)

## ⭐ Support

If you like this project:

- ⭐ Star the repo

- 🐛 Open issues

- 💡 Suggest features

- 🤝 Contribute code
