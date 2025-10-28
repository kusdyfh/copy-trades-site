import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { amount, orderId, description, email } = JSON.parse(event.body || "{}");

    if (!amount) throw new Error("Missing 'amount' in request body");
    if (!process.env.NOWPAYMENTS_API_KEY) throw new Error("Missing NOWPAYMENTS_API_KEY");
    if (!process.env.SITE_URL) throw new Error("Missing SITE_URL");

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        pay_currency: "usdttrc20",
        order_id: orderId || `order-${Date.now()}`,
        order_description: description || "Broker CORP Subscription",
        ipn_callback_url: `${process.env.SITE_URL}/.netlify/functions/ipn`,
        success_url: `${process.env.SITE_URL}/#/wallet`,
        cancel_url: `${process.env.SITE_URL}/#/wallet`,
        is_fixed_rate: true,
        customer_email: email || ""
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("NOWPayments API Error:", data);
      throw new Error(data.message || "Payment API error");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        invoice_url: data.invoice_url,
        invoice_id: data.id,
        created_at: data.created_at,
      }),
    };

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: error.message,
      }),
    };
  }
};
