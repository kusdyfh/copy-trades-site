// netlify/functions/create-invoice.js
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { amount, plan } = body;

    if (!amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: false, message: "Amount is required" }),
      };
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const siteURL = process.env.SITE_URL || "https://your-site.netlify.app";

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        pay_currency: "usdttrc20",
        order_id: `ORDER-${Date.now()}`,
        order_description: `Subscription plan: ${plan}`,
        success_url: `${siteURL}/success.html`,
        cancel_url: `${siteURL}/cancel.html`,
      }),
    });

    const data = await response.json();
    console.log("NOWPayments response:", data);

    if (data && data.invoice_url) {
      return {
        statusCode: 200,
        body: JSON.stringify({ status: true, invoice_url: data.invoice_url }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: data?.message || "Failed to create invoice",
        }),
      };
    }
  } catch (err) {
    console.error("Error creating invoice:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: "Server error",
        error: err.message,
      }),
    };
  }
}
