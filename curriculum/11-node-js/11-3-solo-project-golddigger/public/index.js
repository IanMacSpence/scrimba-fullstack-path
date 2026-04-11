let livePrice;

const investForm = document.querySelector("form");

const dialog = document.querySelector("dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogErrorMessage = document.getElementById("dialog-error-message");
const dialogSummary = document.getElementById("investment-summary");
const dialogGoldAmount = document.getElementById("dialog-gold-amount");
const dialogInvestAmount = document.getElementById("dialog-invest-amount");
const dialogOkBtn = document.getElementById("dialog-ok-btn");
const connectionStatusEl = document.getElementById("connection-status");
const priceEl = document.getElementById("price-display");
const REQUEST_TIMEOUT_MS = 6000;

function showBuyError(message) {
  dialogTitle.textContent = "Error";
  dialog.setAttribute("aria-describedby", "dialog-error-message");
  dialogSummary.hidden = true;
  dialogErrorMessage.hidden = false;
  dialogErrorMessage.textContent = message;
  dialog.showModal();
}

function showBuySuccess(goldOz, investAmount) {
  dialogTitle.textContent = "Summary";
  dialog.setAttribute("aria-describedby", "investment-summary");
  dialogErrorMessage.hidden = true;
  dialogSummary.hidden = false;
  dialogGoldAmount.textContent = `${goldOz} ${goldOz === 1 ? "ounce" : "ounces"}`;
  dialogInvestAmount.textContent = investAmount.toFixed(2);
  dialog.showModal();
}

function showPriceError(message) {
  connectionStatusEl.textContent = message;
  priceEl.textContent = "----.--";
  livePrice = undefined;
}

async function parseJsonSafe(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

/* Form handler */
investForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const investAmount = Number(formData.get("investmentAmount"));

  if (!Number.isFinite(investAmount) || investAmount <= 0) {
    showBuyError("Please enter a valid investment amount.");
    return;
  }

  if (!Number.isFinite(livePrice) || livePrice <= 0) {
    showBuyError("Live price unavailable. Please wait a moment and try again.");
    return;
  }

  try {
    const response = await fetchWithTimeout("/api/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ investAmountString: investAmount }),
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        showBuyError(data.error || "Input error. Please check your values.");
      } else {
        showBuyError(data.error || "Server error. Please try again later.");
      }
      return;
    }

    const goldOz = Number(data.goldOz);

    if (!Number.isFinite(goldOz)) {
      showBuyError("Unexpected server response. Please try again.");
      return;
    }

    showBuySuccess(goldOz, investAmount);
    investForm.reset();
  } catch (err) {
    console.error("Buy request failed:", err);
    if (err.name === "AbortError") {
      showBuyError("Request timed out. Please try again.");
    } else {
      showBuyError("Network error. Check your connection and try again.");
    }
  }
});

/* Close the dialog */
dialogOkBtn.addEventListener("click", () => {
  dialog.close();
});

/* Get price */
async function getPrice() {
  try {
    const response = await fetchWithTimeout("/api/price");
    const data = await parseJsonSafe(response);

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500) {
        showPriceError(data.error || "Price unavailable.");
      } else {
        showPriceError(data.error || "Server issue loading price.");
      }
      return;
    }

    const nextPrice = Number(data.price);

    if (!Number.isFinite(nextPrice)) {
      showPriceError("Invalid price response.");
      return;
    }

    livePrice = Number(nextPrice.toFixed(2));

    priceEl.textContent = livePrice.toFixed(2);
    connectionStatusEl.textContent = "Live Price 🟢";
  } catch (err) {
    console.error("Price request failed:", err);
    if (err.name === "AbortError") {
      showPriceError("Live Price timed out 🔴");
    } else {
      showPriceError("Live Price unavailable 🔴");
    }
  }
}

getPrice();
setInterval(getPrice, 3000);
