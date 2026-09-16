import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ verified: false, error: "Missing payment fields" }, { status: 400 });
    }

    const verified = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    });

    if (!verified) {
      return NextResponse.json({ verified: false, error: "Signature mismatch" }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch (err: any) {
    console.error("Razorpay verify failed:", err);
    return NextResponse.json({ verified: false, error: err?.message || "Verification failed" }, { status: 500 });
  }
}
