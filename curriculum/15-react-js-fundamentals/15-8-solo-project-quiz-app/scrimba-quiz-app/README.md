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

## React Fundamentals Applied In This Project

These are the React fundamentals I had to practice, and how they were implemented:

- **Components and composition**
	- Broke the app into reusable UI parts (`App`, `StartScreen`, `GameScreen`, `QuestionCard`, `LoadingScreen`, `ErrorScreen`, `ConfirmSubmitModal`).
	- Kept each component focused on one responsibility.

- **State management with hooks**
	- Used `useState` to manage quiz flow state, question data, modal visibility, quiz options, and errors.
	- Grouped game state transitions in a custom hook (`useQuizGame`) for cleaner UI components.

- **Props and one-way data flow**
	- Passed data and handlers from parent to child components (for example: selected answers, form option updates, retry/start actions).
	- Kept source-of-truth state in one place and rendered children from that state.

- **Event handling**
	- Handled user interactions with `onClick`, `onChange`, and `onSubmit`.
	- Used handler functions to update state predictably (`selectAnswer`, option changes, start/check/replay actions).

- **Conditional rendering**
	- Rendered different screens (`start`, `loading`, `playing`, `checked`, `error`) based on status.
	- Showed UI only when needed (score text, change-settings button, confirm modal).

- **Rendering lists + keys**
	- Rendered question and answer choices with `.map(...)`.
	- Used stable `key` values (with `nanoid`) for question items.

- **Controlled form inputs**
	- Bound category, difficulty, and amount fields to React state (`quizOptions`).
	- Kept form values in sync via `value` + `onChange`.

- **Effects and cleanup**
	- Used `useEffect` where side effects are needed (focus handling, modal keyboard listeners, cleanup).
	- Added cleanup functions for listener removal and fetch cancellation safety.

- **Derived state**
	- Computed values such as `allAnswered`, `numUnanswered`, and `numCorrect` from source state instead of duplicating data.

- **Async data fetching**
	- Fetched API data with `async/await`.
	- Managed loading/error states and normalized API responses before rendering.

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
