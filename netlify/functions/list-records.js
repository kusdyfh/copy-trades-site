import { getStore } from "@netlify/blobs";

export async function handler(event) {
  try {
    const type = (event.queryStringParameters?.type || "").trim(); // "transactions" | "withdrawals"
    if (!["transactions","withdrawals"].includes(type)) {
      return { statusCode: 400, body: "Query ?type=transactions or ?type=withdrawals" };
    }
    const store = getStore("broker-corp");
    const key = type + ".json";
    const data = (await store.get(key)) || "[]";
    return { statusCode: 200, headers: { "Content-Type":"application/json" }, body: data };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
