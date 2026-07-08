import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  throw new Error("RESEND_API_KEY is required.");
}

const resend = new Resend(apiKey);

export const sendOrderConfirmation = async (email: string, orderId: string, total: number) => {
  await resend.emails.send({
    from: "orders@fitgear.app",
    to: email,
    subject: "FitGear order confirmation",
    html: `<html><body><h1>Thank you for your order</h1><p>Your order <strong>#${orderId}</strong> was confirmed. Total: ${total.toFixed(2)} EUR.</p><p>We’ll notify you once it ships.</p></body></html>`,
  });
};
