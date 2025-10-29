// ✅ Broker CORP - Create Invoice Function (NOWPayments)
export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const {
      price_amount,
      price_currency,
      pay_currency,
      order_description,
      ipn_callback_url,
      order_id,
      success_url,
      cancel_url,
    } = body;

    // ✅ التحقق من الحقول المطلوبة
    if (!price_amount || !price_currency || !pay_currency) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: "price_amount, price_currency, and pay_currency are required",
        }),
      };
    }

    // ✅ بيانات الاتصال بـ NOWPayments
    const API_KEY = process.env.NOWPAYMENTS_API_KEY;
    const API_URL = "https://api.nowpayments.io/v1/invoice";

    // ✅ بناء الفاتورة
    const payload = {
      price_amount,
      price_currency,
      pay_currency,
      order_description,
      ipn_callback_url,
      order_id,
      success_url,
      cancel_url,
    };

    // ✅ إرسال الطلب إلى NOWPayments
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("NOWPayments error:", data);
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: false,
          message: data.message || "Failed to create invoice",
          data,
        }),
      };
    }

    // ✅ إرجاع رابط الفاتورة
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        invoice_url: data.invoice_url,
        invoice_id: data.id,
      }),
    };
  } catch (err) {
    console.error("Invoice error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      }),
    };
  }
}
