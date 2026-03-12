import { describe, test, expect } from 'vitest'

import { render, screen } from '@testing-library/react'

import App from './App'

describe("Accessibility", () => {
    test("ensures troll face image is accessible", () => {
        render(<App />)

        expect(screen.getByAltText("Troll face")).toBeInTheDocument()
    })

    test("ensures the meme image is accessible", () => {
        render(<App />)

        expect(screen.getByAltText("One Does Not Simply")).toBeInTheDocument()
    })
})

