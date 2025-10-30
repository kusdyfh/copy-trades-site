import fs from "fs";
import path from "path";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { amount, wallet, notes } = body;

    if (!amount || !wallet) {
      return {
        statusCode: 400,
        body: JSON.stringify({ status: false, message: "Amount and wallet are required" }),
      };
    }

    const filePath = path.join("netlify", "functions", "data", "withdrawals.json");

    // قراءة الملف أو إنشاءه
    let existing = [];
    if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    const newRequest = {
      id: "W-" + Date.now(),
      amount,
      wallet,
      notes: notes || "",
      date: new Date().toISOString(),
      status: "Pending",
    };

    existing.push(newRequest);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ status: true, message: "Withdrawal request saved" }),
    };
  } catch (err) {
    console.error("❌ Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: false, message: "Server error", error: err.message }),
    };
  }
}
