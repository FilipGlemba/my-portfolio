import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required to send emails.");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export const sendOrderConfirmation = async (email: string, orderId: string, total: number) => {
  await getResend().emails.send({
    from: "orders@fitgear.app",
    to: email,
    subject: "FitGear order confirmation",
    html: `<html><body><h1>Thank you for your order</h1><p>Your order <strong>#${orderId}</strong> was confirmed. Total: ${total.toFixed(2)} EUR.</p><p>We’ll notify you once it ships.</p></body></html>`,
  });
};
