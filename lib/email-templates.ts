import { OrderEmailDetails } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const COLORS = {
  maroon: "#6B0F1A",
  maroonDark: "#4A0A12",
  gold: "#C9A227",
  goldDark: "#A9820F",
  blushLight: "#FAE3E3",
  cream: "#FFF8F0",
  sage: "#8A9A5B",
};

function itemsTableRows(items: OrderEmailDetails["items"]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #F0E0E0;font-family:Georgia,serif;color:${COLORS.maroonDark};font-size:14px;">
            ${item.name}
            ${item.size ? `<br/><span style="color:#8a6b6b;font-size:12px;">Size: ${item.size}</span>` : ""}
            ${item.color ? `<br/><span style="color:#8a6b6b;font-size:12px;">Color: ${item.color}</span>` : ""}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0E0E0;text-align:center;color:${COLORS.maroonDark};font-size:14px;">
            x${item.quantity}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #F0E0E0;text-align:right;color:${COLORS.maroonDark};font-size:14px;">
            ${formatPrice(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join("");
}

function baseLayout(opts: { preheader: string; heading: string; intro: string; body: string }) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${opts.heading}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.cream};font-family:'Segoe UI',Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;">${opts.preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(107,15,26,0.08);">
            <tr>
              <td style="background-color:${COLORS.maroon};padding:28px 32px;text-align:center;">
                <span style="font-family:Georgia,serif;font-size:22px;letter-spacing:1px;color:${COLORS.gold};font-weight:bold;">
                  Traditional Vastraa
                </span>
                <div style="color:${COLORS.blushLight};font-size:12px;margin-top:4px;letter-spacing:0.5px;">
                  Tradition Woven with Style
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="font-family:Georgia,serif;color:${COLORS.maroonDark};font-size:20px;margin:0 0 12px;">
                  ${opts.heading}
                </h1>
                <p style="color:#5a4a4a;font-size:14px;line-height:1.6;margin:0 0 24px;">
                  ${opts.intro}
                </p>
                ${opts.body}
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.cream};padding:20px 32px;text-align:center;border-top:1px solid #F0E0E0;">
                <p style="margin:0;color:#8a6b6b;font-size:12px;">
                  ${siteConfig.name} &middot; <a href="mailto:${siteConfig.email}" style="color:${COLORS.maroon};text-decoration:none;">${siteConfig.email}</a> &middot; ${siteConfig.whatsapp}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function orderSummaryTable(order: OrderEmailDetails) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <thead>
        <tr>
          <th align="left" style="font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#8a6b6b;padding-bottom:8px;border-bottom:2px solid ${COLORS.gold};">Item</th>
          <th align="center" style="font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#8a6b6b;padding-bottom:8px;border-bottom:2px solid ${COLORS.gold};">Qty</th>
          <th align="right" style="font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#8a6b6b;padding-bottom:8px;border-bottom:2px solid ${COLORS.gold};">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsTableRows(order.items)}
      </tbody>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:4px 0;color:#5a4a4a;font-size:14px;">Subtotal</td>
        <td align="right" style="padding:4px 0;color:#5a4a4a;font-size:14px;">${formatPrice(order.subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#5a4a4a;font-size:14px;">Shipping</td>
        <td align="right" style="padding:4px 0;color:#5a4a4a;font-size:14px;">${order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0 0;color:${COLORS.maroonDark};font-size:16px;font-weight:bold;border-top:1px solid #F0E0E0;">Total</td>
        <td align="right" style="padding:10px 0 0;color:${COLORS.maroonDark};font-size:16px;font-weight:bold;border-top:1px solid #F0E0E0;">${formatPrice(order.total)}</td>
      </tr>
    </table>`;
}

function paymentBadge(order: OrderEmailDetails) {
  const label =
    order.paymentMethod === "COD"
      ? "Cash on Delivery"
      : order.paymentMethod === "UPI"
        ? "UPI"
        : "Card";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="background-color:${COLORS.blushLight};border-radius:8px;padding:12px 16px;">
          <span style="color:${COLORS.maroonDark};font-size:13px;">
            <strong>Payment:</strong> ${label}
            ${order.transactionId ? ` &middot; <strong>Txn ID:</strong> ${order.transactionId}` : ""}
          </span>
        </td>
      </tr>
    </table>`;
}

export function customerOrderConfirmationEmail(order: OrderEmailDetails) {
  const body = `
    ${paymentBadge(order)}
    ${orderSummaryTable(order)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr>
        <td style="font-size:13px;color:#5a4a4a;line-height:1.6;">
          <strong style="color:${COLORS.maroonDark};">Shipping to:</strong><br/>
          ${order.customerName}<br/>
          ${order.address}, ${order.city}, ${order.state} - ${order.pincode}<br/>
          ${order.phone}
        </td>
      </tr>
    </table>
    <p style="color:#5a4a4a;font-size:13px;line-height:1.6;margin-top:20px;">
      We'll notify you again once your order ships. For any questions, reply to this email or reach us on WhatsApp at ${siteConfig.whatsapp}.
    </p>`;

  return {
    subject: `Order Confirmed — #${order.orderId} | Traditional Vastraa`,
    html: baseLayout({
      preheader: `Your order #${order.orderId} for ${formatPrice(order.total)} has been placed successfully.`,
      heading: `Thank you, ${order.customerName.split(" ")[0]}! 🪷`,
      intro: `Your order <strong>#${order.orderId}</strong> has been placed successfully and is being prepared with care.`,
      body,
    }),
  };
}

export function brandOrderNotificationEmail(order: OrderEmailDetails) {
  const body = `
    ${paymentBadge(order)}
    ${orderSummaryTable(order)}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="font-size:13px;color:#5a4a4a;line-height:1.6;">
          <strong style="color:${COLORS.maroonDark};">Customer:</strong><br/>
          ${order.customerName}<br/>
          ${order.email}<br/>
          ${order.phone}<br/><br/>
          <strong style="color:${COLORS.maroonDark};">Ship to:</strong><br/>
          ${order.address}, ${order.city}, ${order.state} - ${order.pincode}
        </td>
      </tr>
    </table>`;

  return {
    subject: `🔔 New Order #${order.orderId} — ${formatPrice(order.total)}`,
    html: baseLayout({
      preheader: `New order #${order.orderId} received from ${order.customerName} for ${formatPrice(order.total)}.`,
      heading: "New Order Received",
      intro: `A new order has just come in. Here are the details:`,
      body,
    }),
  };
}
