import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const { amount, orderId, description } = JSON.parse(event.body);

    // ✅ التحقق من المفتاح
    if (!process.env.NOWPAYMENTS_API_KEY) {
      throw new Error("Missing NOWPAYMENTS_API_KEY");
    }

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
        ipn_callback_url: `${process.env.SITE_URL}/.netlify/functions/ipn`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment API error");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
