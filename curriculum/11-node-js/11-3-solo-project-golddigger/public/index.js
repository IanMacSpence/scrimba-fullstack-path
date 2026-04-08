

async function getPrice() {
    const response = await fetch('/api/price')
    const data = await response.json()

    const priceDisplay = document.getElementById("price-display")

    priceDisplay.textContent = data.price
}

setInterval(getPrice, 3000)
