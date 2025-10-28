import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const { email, network, address, amount } = JSON.parse(event.body || "{}");
    if (network !== "TRC20") return { statusCode: 400, body: "TRC20 only" };
    if (!address || String(address).length < 10) return { statusCode: 400, body: "Invalid address" };
    const amt = Number(amount);
    if (Number.isNaN(amt) || amt < 10 || amt > 10000) return { statusCode: 400, body: "Amount must be 10–10000" };

    const store = getStore("broker-corp");
    const key = "withdrawals.json";

    const cur = JSON.parse((await store.get(key)) || "[]");
    cur.push({
      email: email || null,
      network,
      address,
      amount: amt,
      status: "Pending",
      ts: new Date().toISOString()
    });
    await store.set(key, JSON.stringify(cur));

    return { statusCode: 200, body: "Saved" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
