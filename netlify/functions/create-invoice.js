export default async (req, res) => {
  try {
    const body = JSON.parse(req.body);
    const { amount, plan } = body;

    if (!amount) {
      return res.status(400).json({ status: false, message: "Amount is required" });
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
        order_id: `ORDER-${Date.now()}`,
        order_description: `Subscription plan: ${plan}`,
        success_url: `${process.env.SITE_URL}/success.html`,
        cancel_url: `${process.env.SITE_URL}/cancel.html`,
      }),
    });

    const data = await response.json();
    console.log("NOWPayments response:", data);

    if (data.invoice_url) {
      return res.status(200).json({ status: true, invoice_url: data.invoice_url });
    } else {
      return res.status(400).json({ status: false, message: data.message || "Failed to create invoice" });
    }
  } catch (err) {
    console.error("Error creating invoice:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
