import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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
  const livePrice = generatePrice();

  res.status(200).json({
    success: true,
    price: Number(livePrice.toFixed(2)),
  });
});

app.post("/api/buy", (req, res) => {
  /* get the purchase amount, calculate and return the gold amount */
  const { investAmountString } = req.body;
  const investAmount = Number(investAmountString);

  if (!livePrice) {
    res.status(404).json({
      success: false,
      error: "No live price",
    });
  }

  if (!investAmount || investAmount <= 0) {
    res.status(404).json({
      success: false,
      error: "Investment amount error",
    });
  };

  const goldOz = Number((investAmount / livePrice).toFixed(2));

  res.json({ goldOz });


  /* log record to file */
  

});

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
