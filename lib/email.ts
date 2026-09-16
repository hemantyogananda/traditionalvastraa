import nodemailer from "nodemailer";
import { OrderEmailDetails } from "@/lib/types";
import { customerOrderConfirmationEmail, brandOrderNotificationEmail } from "@/lib/email-templates";

export const BRAND_ORDERS_EMAIL = "orders@traditionalvastraa.com";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD in .env.local (see .env.example)."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendOrderEmails(order: OrderEmailDetails) {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || `"Traditional Vastraa" <${BRAND_ORDERS_EMAIL}>`;

  const customerEmail = customerOrderConfirmationEmail(order);
  const brandEmail = brandOrderNotificationEmail(order);

  const results = await Promise.allSettled([
    transporter.sendMail({
      from,
      to: order.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
    }),
    transporter.sendMail({
      from,
      to: BRAND_ORDERS_EMAIL,
      subject: brandEmail.subject,
      html: brandEmail.html,
    }),
  ]);

  const failed = results.filter((r) => r.status === "rejected");
  return {
    customerSent: results[0].status === "fulfilled",
    brandSent: results[1].status === "fulfilled",
    errors: failed.map((f) => (f as PromiseRejectedResult).reason?.message || "Unknown email error"),
  };
}
