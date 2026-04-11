import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createReceiptPdf } from "./utils/pdf.js";
import { isValidEmail, sendReceiptEmail } from "./utils/email.js";

const app = express();

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
const receiptsDir = path.join(__dirname, "receipts");
const purchasesLogPath = path.join(__dirname, "purchases.txt");

fs.mkdirSync(receiptsDir, { recursive: true });

let livePrice = 1950;

function generatePrice() {
  const change = (Math.random() - 0.5) * 10; // -5 to +5
  livePrice += change;
  return livePrice;
}

function buildPurchaseRecord(investAmount, pricePerOz) {
  const goldOz = Number((investAmount / pricePerOz).toFixed(2));
  const timestamp = new Date().toISOString();
  const receiptId = `receipt-${Date.now()}`;
  const receiptFile = `${receiptId}.pdf`;
  const receiptUrl = `/api/receipts/${receiptFile}`;
  const logLine = `${timestamp} | amount paid: £${investAmount.toFixed(2)} | price per Oz: £${pricePerOz.toFixed(2)} | gold sold: ${goldOz.toFixed(2)} Oz | receipt: ${receiptFile}\n`;

  return {
    investAmount,
    pricePerOz,
    goldOz,
    timestamp,
    receiptId,
    receiptFile,
    receiptUrl,
    logLine,
  };
}

async function savePurchaseAndReceipt(purchaseRecord) {
  await fs.promises.appendFile(purchasesLogPath, purchaseRecord.logLine);

  await createReceiptPdf({
    receiptsDir,
    receiptFile: purchaseRecord.receiptFile,
    timestamp: purchaseRecord.timestamp,
    investAmount: purchaseRecord.investAmount,
    pricePerOz: purchaseRecord.pricePerOz,
    goldOz: purchaseRecord.goldOz,
  });
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

app.post("/api/buy", async (req, res) => {
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

  const purchaseRecord = buildPurchaseRecord(investAmount, livePrice);

  try {
    await savePurchaseAndReceipt(purchaseRecord);

    return res.json({
      success: true,
      goldOz: purchaseRecord.goldOz,
      receiptId: purchaseRecord.receiptId,
      receiptUrl: purchaseRecord.receiptUrl,
    });
  } catch (err) {
    console.error("Error saving purchase or receipt:", err);

    return res.status(500).json({
      success: false,
      error: "Failed to save purchase receipt",
    });
  }
});

app.get("/api/receipts/:receiptFile", (req, res) => {
  const { receiptFile } = req.params;

  if (receiptFile !== path.basename(receiptFile) || path.extname(receiptFile) !== ".pdf") {
    return res.status(400).json({
      success: false,
      error: "Invalid receipt file name",
    });
  }

  const receiptPath = path.join(receiptsDir, receiptFile);

  return res.download(receiptPath, receiptFile, (err) => {
    if (!err) {
      return;
    }

    if (err.code === "ENOENT") {
      if (!res.headersSent) {
        res.status(404).json({
          success: false,
          error: "Receipt not found",
        });
      }
      return;
    }

    console.error("Error sending receipt:", err);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: "Failed to send receipt",
      });
    }
  });
});

app.post("/api/receipts/email", async (req, res) => {
  const { email, receiptId } = req.body || {};

  if (!isValidEmail(email || "")) {
    return res.status(400).json({
      success: false,
      error: "Enter a valid email address",
    });
  }

  if (typeof receiptId !== "string" || !receiptId.startsWith("receipt-")) {
    return res.status(400).json({
      success: false,
      error: "Invalid receipt id",
    });
  }

  const receiptFile = `${receiptId}.pdf`;

  if (receiptFile !== path.basename(receiptFile)) {
    return res.status(400).json({
      success: false,
      error: "Invalid receipt file name",
    });
  }

  const receiptPath = path.join(receiptsDir, receiptFile);

  try {
    await fs.promises.access(receiptPath, fs.constants.F_OK);
  } catch {
    return res.status(404).json({
      success: false,
      error: "Receipt not found",
    });
  }

  try {
    await sendReceiptEmail({
      toEmail: email,
      receiptFile,
      receiptPath,
    });

    return res.json({
      success: true,
      message: "Receipt email sent",
    });
  } catch (err) {
    if (err.message === "SMTP_NOT_CONFIGURED") {
      return res.status(503).json({
        success: false,
        error: "Email not configured on server (set SMTP env vars)",
      });
    }

    console.error("Error sending receipt email:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send receipt email",
    });
  }
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
