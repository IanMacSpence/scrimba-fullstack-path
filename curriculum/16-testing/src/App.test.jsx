import { describe, test, expect } from 'vitest'
import { userEvent } from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import App from './App'

describe("App", () => {
    test("updates the top text", async() => {
        // Arrange
        const user = userEvent.setup()
        render(<App />)
        const topTextbox = screen.getAllByRole('textbox')[0]
        
        // Act
        await user.clear(topTextbox)
        await user.type(topTextbox, "A coder does not simply")

        // Assert
        expect(screen.getByText("A coder does not simply")).toBeInTheDocument()
    })

    test("updates the bottom text", async() => {
        const user = userEvent.setup()
        render(<App />)
        const bottomTextbox = screen.getAllByRole('textbox')[1]

        await user.clear(bottomTextbox)
        await user.type(bottomTextbox, "Code without coffee")

        expect(screen.getByText("Code without coffee")).toBeInTheDocument()
    })

    test("displays a new image after the user clicks the Get a new meme image button", async()=> {
        // Arrange
        const user = userEvent.setup()
        render(<App />)
        const memeButton = screen.getAllByRole('button')[0]

        // Act
        await user.click(memeButton)

        // Assert
        expect(screen.getAllByRole("img")[1].src).toBe("https://i.imgflip.com/1c1uej.jpg")
    })
})

