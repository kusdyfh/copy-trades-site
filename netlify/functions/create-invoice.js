import fetch from "node-fetch";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) return { statusCode: 500, body: "Missing NOWPAYMENTS_API_KEY" };

    const payload = JSON.parse(event.body || "{}");

    // TRC20 فقط
    const body = {
      price_amount: payload.price_amount,
      price_currency: payload.price_currency || "usd",
      order_id: payload.order_id,
      success_url: payload.success_url,
      cancel_url: payload.cancel_url,
      ipn_callback_url: process.env.IPN_OVERRIDE_URL || (process.env.URL || "") + "/.netlify/functions/ipn",
      is_fee_paid_by_user: true,
      // معلومات العميل (اختيارية)
      customer_email: payload.customer_email,
      // ipn_payload يُعاد كما هو في IPN
      ipn_payload: payload.ipn_payload || {}
    };

    const resp = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await resp.json();
    if (!resp.ok) return { statusCode: resp.status, body: JSON.stringify(data) };

    return { statusCode: 200, body: JSON.stringify({ invoice_url: data.invoice_url, id: data.id }) };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
