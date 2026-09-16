import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/email";
import { OrderEmailDetails } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const order = (await req.json()) as OrderEmailDetails;

    if (!order?.orderId || !order?.email || !Array.isArray(order.items)) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    const result = await sendOrderEmails(order);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Order email send failed:", err);
    return NextResponse.json({ error: err?.message || "Failed to send order emails" }, { status: 500 });
  }
}
