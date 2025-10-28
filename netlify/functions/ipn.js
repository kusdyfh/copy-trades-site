// Netlify Function: ipn
// Verifies NOWPayments IPN HMAC signature (x-nowpayments-sig) with your IPN secret.

import crypto from "crypto";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;
    if (!ipnSecret) return { statusCode: 500, body: "Missing NOWPAYMENTS_IPN_SECRET" };

    const rawBody = event.body || "";
    const sigHeader = event.headers["x-nowpayments-sig"] || event.headers["X-Nowpayments-Sig"];
    if (!sigHeader) return { statusCode: 400, body: "Missing signature" };

    const expected = crypto.createHmac("sha512", ipnSecret).update(rawBody, "utf8").digest("hex");
    const ok = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sigHeader));

    if (!ok) return { statusCode: 401, body: "Invalid signature" };

    // Parse event and TODO: update your storage (KV/DB) if needed
    const payload = JSON.parse(rawBody || "{}");
    // Example log
    console.log("NOWPayments IPN OK:", payload.payment_status, payload.order_id, payload.payment_id);

    return { statusCode: 200, body: "OK" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
