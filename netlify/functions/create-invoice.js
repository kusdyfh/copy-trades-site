export async function handler(event) {
  console.log("✅ create-invoice function started");

  try {
    const body = JSON.parse(event.body || "{}");
    console.log("🟡 Received body:", body);

    const { amount, plan } = body;
    if (!amount) {
      console.log("❌ Missing amount in body");
      return {
        statusCode: 400,
        body: JSON.stringify({ status: false, message: "Amount is required" }),
      };
    }

    const apiKey = process.env.NOWPAYMENTS_API_KEY;
    const siteURL = process.env.SITE_URL || "https://copytrades.netlify.app";
    console.log("🟢 Using API Key (first 6 chars):", apiKey?.slice(0, 6));

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
    console.log("💬 NOWPayments response:", data);

    if (data && data.invoice_url) {
      console.log("✅ Invoice created successfully:", data.invoice_url);
      return {
        statusCode: 200,
        body: JSON.stringify({ status: true, invoice_url: data.invoice_url }),
      };
    } else {
      console.log("⚠️ Invoice creation failed:", data.message);
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: data?.message || "Failed to create invoice",
        }),
      };
    }
  } catch (err) {
    console.error("🔥 Error creating invoice:", err);
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
