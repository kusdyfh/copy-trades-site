import crypto from "crypto";
import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    if (!ipnSecret) return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };

    const raw = event.body || "";
    const sigHeader = event.headers["x-nowpayments-sig"] || event.headers["X-Nowpayments-Sig"];
    if (!sigHeader) return { statusCode: 400, body: "Missing signature" };

    const expected = crypto.createHmac("sha512", ipnSecret).update(raw, "utf8").digest("hex");
    const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sigHeader));
    if (!ok) return { statusCode: 401, body: "Invalid signature" };

    const payload = JSON.parse(raw || "{}"); // يحتوي ipn_payload (خطة المستخدم)
    const store = getStore("broker-corp");
    const key = "transactions.json";

    const cur = JSON.parse((await store.get(key)) || "[]");
    const rec = {
      payment_id: payload.payment_id,
      order_id: payload.order_id,
      payment_status: payload.payment_status,
      price_amount: payload.price_amount,
      pay_amount: payload.pay_amount,
      pay_currency: payload.pay_currency,
      ipn_payload: payload.ipn_payload || null,
      ts: new Date().toISOString()
    };
    cur.push(rec);
    await store.set(key, JSON.stringify(cur));

    return { statusCode: 200, body: "OK" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
