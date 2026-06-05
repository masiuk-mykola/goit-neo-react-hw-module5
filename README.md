# Movie Explorer (React + TypeScript + Vite)

Minimal movie-search application built with React, TypeScript and Vite. It demonstrates fetching movie data (TMDB), routing, and small UI components such as lists, cast, and reviews.

## Quickstart

- Requirements: Node.js (v18+ recommended) and npm
- Install dependencies:

```bash
npm install
```

- Add your TMDB API key in a `.env.local` file at the project root:

```env
VITE_API_KEY=your_tmdb_api_key_here
```

- Run the dev server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

(These scripts come from `package.json`.)

## Environment

- The app reads the API key from `import.meta.env.VITE_API_KEY` (set via `.env.local`). Do not commit your real API key to source control.

## Project structure (important parts)

- `src/api/` — API helpers and requests
- `src/components/` — UI components (MovieList, MovieCast, MovieReviews, Navigation)
- `src/pages/` — route pages (HomePage, MoviesPage, MovieDetailsPage)
- `src/types/` — TypeScript types

## Notes

- This repository uses Vite, React 19 and TypeScript.
- The included `.env.local` in your workspace currently contains a `VITE_API_KEY`; replace it with your own key when sharing or deploying.

## Where to get an API key

- Create an account at https://www.themoviedb.org/ and request an API key.

## License

This project is provided for learning purposes.
