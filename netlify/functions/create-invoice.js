// Node 18+ has global fetch — no node-fetch import needed
export async function handler(event) {
  try {
    const { amount, orderId, description, email } = JSON.parse(event.body || "{}");
    if (!amount) return resp(400, { status:false, message:"price_amount is required" });

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    if (!apiKey) return resp(500, { status:false, message:"Missing NOWPAYMENTS_API_KEY" });

    // Build invoice payload for NOWPayments
    const payload = {
      price_amount: Number(amount),
      price_currency: "usd",
      pay_currency: "usdttrc20",
      order_id: orderId || ("ORD-"+Date.now()),
      order_description: description || "Broker CORP subscription",
      success_url: process.env.SITE_URL || "https://example.com",
      cancel_url: process.env.SITE_URL || "https://example.com",
      is_fixed_rate: true,
      is_fee_paid_by_user: true,
      // IPN optional; do NOT send ipn_payload (caused earlier error)
    };

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      return resp(res.status, { status:false, message:data.message||"NOWPayments error", raw:data });
    }

    return resp(200, { status:true, invoice_url:data.invoice_url, id:data.id });
  } catch (e) {
    return resp(500, { status:false, message:e.message });
  }
}
const resp = (status, body) => ({ statusCode: status, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
