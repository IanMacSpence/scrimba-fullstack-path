import { test, expect, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Main from './Main'

describe("Main", () => {
    test("displays the top line", () => {
        render(<Main />)

        expect(screen.getByText("One does not simply")).toBeInTheDocument()
    })

    test("displays the bottom line", () => {
        render(<Main />)

        expect(screen.getByText("Walk into Mordor")).toBeInTheDocument()
    })

    test("displays the meme image", () => {
        render(<Main />)

        expect(screen.getByRole("img").src).toBe("https://i.imgflip.com/1bij.jpg")
    })
})