import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    // نحلل البيانات القادمة من الطلب
    const { amount, orderId, description, email, userWallet } = JSON.parse(event.body || "{}");

    // التحقق من القيم الأساسية
    if (!amount) throw new Error("Missing 'amount' in request body");
    if (!process.env.NOWPAYMENTS_API_KEY) throw new Error("Missing NOWPAYMENTS_API_KEY");
    if (!process.env.SITE_URL) throw new Error("Missing SITE_URL");

    // إنشاء الفاتورة عبر NOWPayments
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: amount,                  // 💰 المبلغ المطلوب
        price_currency: "usd",                 // العملة بالدولار
        pay_currency: "usdttrc20",             // شبكة TRC20 فقط
        order_id: orderId || `order-${Date.now()}`,
        order_description: description || "Broker CORP Subscription",
        ipn_callback_url: `${process.env.SITE_URL}/.netlify/functions/ipn`, // Webhook
        success_url: `${process.env.SITE_URL}/#/wallet`,                     // عند النجاح
        cancel_url: `${process.env.SITE_URL}/#/wallet`,                      // عند الإلغاء
        is_fixed_rate: true,                   // سعر ثابت
        // حقول اختيارية إضافية لتسهيل مراجعة الدفع لاحقًا
        customer_email: email || "",
        customer_wallet: userWallet || ""
      }),
    });

    const data = await response.json();

    // التحقق من الاستجابة
    if (!response.ok) {
      console.error("NOWPayments API Error:", data);
      throw new Error(data.message || "Payment API error");
    }

    // ✅ نجاح: نرجع رابط الفاتورة
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
    // ❌ خطأ: نرجع رسالة مفهومة
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: false,
        message: error.message,
      }),
    };
  }
};
