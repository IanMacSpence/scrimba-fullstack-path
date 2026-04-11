import nodemailer from "nodemailer";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getMailerTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendReceiptEmail({ toEmail, receiptFile, receiptPath }) {
  const transporter = await getMailerTransport();
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER;

  return transporter.sendMail({
    from: fromEmail,
    to: toEmail,
    subject: "Your GoldDigger purchase receipt",
    text: "Thank you for your purchase. Your PDF receipt is attached.",
    attachments: [
      {
        filename: receiptFile,
        path: receiptPath,
      },
    ],
  });
}
