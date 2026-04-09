let livePrice;

const investForm = document.querySelector("form");

const dialog = document.querySelector("dialog");
const dialogGoldAmount = document.getElementById("dialog-gold-amount");
const dialogInvestAmount = document.getElementById("dialog-invest-amount");
const dialogOkBtn = document.getElementById("dialog-ok-btn");

/* Form handler */
investForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const investAmount = formData.get("investmentAmount");

  const response = await fetch("/api/buy", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ investAmountString: investAmount })
  })

  const data = await response.json()

  const goldOz = Number(data.goldOz)

  dialogGoldAmount.textContent = `${goldOz} ${goldOz === 1 ? "ounce" : "ounces"}`;

  dialogInvestAmount.textContent = investAmount;
  dialog.showModal();
});

/* Close the dialog */
dialogOkBtn.addEventListener("click", () => {
  dialog.close();
});

/* Get price */
async function getPrice() {
  const response = await fetch("/api/price");
  const data = await response.json();

  livePrice = Number(data.price.toFixed(2));

  const priceEl = document.getElementById("price-display");

  priceEl.textContent = livePrice;
}

getPrice();
setInterval(getPrice, 3000);
