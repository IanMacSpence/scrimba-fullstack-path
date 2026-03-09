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


    test("displays the labels Top Text and Bottom Text, two text input fields with the placeholder texts One does not simply and Walk into Mordor, the button with the text Get a new meme image", () => {
        render(<Main />)

        expect(screen.getByText("Top Text")).toBeInTheDocument()
        expect(screen.getByText("Bottom Text")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("One does not simply")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Walk into Mordor")).toBeInTheDocument()
        expect(
            screen.getByRole("button", { name: "Get a new meme image 🖼" })
        ).toBeInTheDocument()
    })

    


    
})