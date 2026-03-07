# Quizzical (Scrimba Solo Project)

A React quiz app that fetches trivia questions from OpenTDB and lets users choose category, difficulty, and number of questions.

## Tech Stack

- React 19 + Vite
- ESLint
- OpenTDB API
- `he` for decoding HTML entities
- `nanoid` for stable question IDs

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Main Focus Areas (Scrimba Project)

These are the core project goals I focused on for the solo build:

- Fetch trivia questions from OpenTDB and normalize the API response for the UI.
- Render multiple-choice question cards and allow one selected answer per question.
- Check answers and show final score.
- Handle loading, playing, checked, and error states.
- Add quiz setup controls for category, difficulty, and number of questions.

## Side Improvements I Also Built

Beyond the baseline project requirements, I also worked on these improvements:

- Refactored game logic into a custom hook (`useQuizGame`) to keep `App` lean.
- Split UI into focused components (`StartScreen`, `GameScreen`, `LoadingScreen`, `ErrorScreen`, modal).
- Added race-condition protections for API requests (in-flight guards, request IDs, abort support).
- Added OpenTDB session token handling to reduce repeated questions.
- Added user-facing API guidance for edge cases (including response codes 1 and 5).
- Improved accessibility:
	- keyboard-friendly answer controls,
	- score and status announcements,
	- modal Escape support,
	- modal focus restoration + focus trap.
- Improved layout behavior when many questions are loaded (scrollable quiz container).

## Notes

- Trivia data comes from OpenTDB: https://opentdb.com/
- Question wording/content is owned by the API provider.
