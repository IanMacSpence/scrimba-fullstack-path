import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");

let livePrice = 1950;

function generatePrice() {
  const change = (Math.random() - 0.5) * 10; // -5 to +5
  livePrice += change;
  return livePrice;
}

app.use(express.json());

app.use(express.static(publicDir));

app.get("/api/price", (req, res) => {
  try {

    livePrice = generatePrice();
    
    res.json({
      success: true,
      price: Number(livePrice.toFixed(2)),
    });
  } catch (err) {
    console.error("Error generating price:", err)

    return res.status(500).json({
      success: false,
      error: "Failed to generate live price"
    })
  }
});

app.post("/api/buy", (req, res) => {
  /* get the purchase amount, calculate and return the gold amount */
  const { investAmountString } = req.body;
  const investAmount = Number(investAmountString);

  if (!Number.isFinite(livePrice) || livePrice <= 0) {
    return res.status(503).json({
      success: false,
      error: "Live price unavailable",
    });
  }

  if (!Number.isFinite(investAmount) || investAmount <= 0) {
    return res.status(400).json({
      success: false,
      error: "Enter a valid investment amount",
    });
  }

  const goldOz = Number((investAmount / livePrice).toFixed(2));

  const logLine = `${new Date().toISOString()} | amount paid: £${investAmount.toFixed(2)} | price per Oz: £${livePrice.toFixed(2)} | gold sold: ${goldOz.toFixed(2)} Oz\n`;

  /* log record to file */
  fs.appendFile(path.join(__dirname, "purchases.txt"), logLine, (err) => {
    if (err) {
      console.error("Error writing to file:", err);

      return res.status(500).json({
        success: false,
        error: "Failed to save purchase",
      });
    }
    /* send gold amount in response */
    return res.json({
      success: true,
      goldOz,
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use("/api", (req, res) => {
  res.status(404).json({ success: false, error: "API route not found" });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
