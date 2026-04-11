import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export function createReceiptPdf({ receiptsDir, receiptFile, timestamp, investAmount, pricePerOz, goldOz }) {
  return new Promise((resolve, reject) => {
    const receiptPath = path.join(receiptsDir, receiptFile);
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(receiptPath);

    doc.on("error", reject);
    stream.on("error", reject);
    stream.on("finish", () => resolve(receiptPath));

    doc.pipe(stream);

    doc.fontSize(24).text("GoldDigger Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Receipt ID: ${receiptFile.replace(".pdf", "")}`);
    doc.text(`Date: ${timestamp}`);
    doc.moveDown();
    doc.text(`Amount paid: GBP ${investAmount.toFixed(2)}`);
    doc.text(`Price per Oz: GBP ${pricePerOz.toFixed(2)}`);
    doc.text(`Gold purchased: ${goldOz.toFixed(2)} Oz`);
    doc.moveDown();
    doc.text("Thank you for investing with GoldDigger.");

    doc.end();
  });
}
