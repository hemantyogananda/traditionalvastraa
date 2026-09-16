import Razorpay from "razorpay";
import crypto from "crypto";

function getKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error(
      "Razorpay keys are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local (see .env.example)."
    );
  }
  return { keyId, keySecret };
}

export function getRazorpayInstance(): Razorpay {
  const { keyId, keySecret } = getKeys();
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function verifyPaymentSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const { keySecret } = getKeys();
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  const expectedBuf = Buffer.from(expected, "utf8");
  const actualBuf = Buffer.from(params.signature, "utf8");
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}
