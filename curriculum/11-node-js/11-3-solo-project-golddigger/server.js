import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const PORT = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const publicDir = path.join(__dirname, 'public')

let price = 1950

function generatePrice() {
  const change = (Math.random() - 0.5) * 10 // -5 to +5
  price += change
  return price
}

app.use(express.json())

app.use(express.static(publicDir))

app.get('/api/price', (req, res) => {
    const price = generatePrice()

    res.status(200).json({
        success: true,
        price: Number(price.toFixed(2))
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'))
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, '404.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})