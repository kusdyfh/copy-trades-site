// ====== Hero Section ======
const app = document.getElementById("app");
document.getElementById("year").textContent = new Date().getFullYear();

function Hero() {
  return `
    <section class="py-12">
      <h1 class="text-4xl font-bold mb-2">Welcome to Broker CORP</h1>
      <p class="text-neutral-400 mb-4">Professional trading platform connecting you to verified traders worldwide.</p>
      <button class="px-4 py-2 border rounded" onclick="show('traders')">Explore Traders</button>
    </section>`;
}

// ====== Traders List ======
function TradersList() {
  return `
    <section class="py-12">
      <h2 class="text-2xl font-semibold mb-4">Top Traders</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${TRADERS.map(
          (t) => `
          <div class="card">
            <div class="font-semibold">${t.name} <span class="text-xs text-neutral-500">(${t.market})</span></div>
            <div class="text-neutral-400 text-sm">ROI ${Math.round(t.roi * 100)}% | WIN ${Math.round(t.win * 100)}%</div>
            <div class="text-neutral-400 text-sm">Experience: ${t.years} yrs</div>
            <div class="mt-2 text-lg font-bold">$${priceForTrader(t)}/month</div>
            <button class="mt-3 px-3 py-2 border rounded text-sm" onclick="openProfile('${t.id}')">View Profile</button>
          </div>`
        ).join("")}
      </div>
    </section>`;
}

// ====== Trader Profile ======
function TraderProfile(id) {
  const t = TRADERS.find((x) => x.id === id);
  if (!t) return `<p>Trader not found</p>`;
  return `
    <section class="py-12">
      <button class="mb-6 text-sm underline" onclick="show('traders')">← Back to traders</button>
      <h2 class="text-3xl font-bold mb-2">${t.name}</h2>
      <p class="text-neutral-400 mb-4">${t.market} trader from ${t.country}</p>
      <p class="text-sm mb-3">ROI: ${Math.round(t.roi * 100)}% | WIN Rate: ${Math.round(t.win * 100)}% | Experience: ${t.years} years</p>
      <p class="text-neutral-300 mb-6 italic">“${t.style}.”</p>
      <div class="text-xl font-semibold mb-3">Subscription: $${priceForTrader(t)}/month</div>
      <button class="px-5 py-3 border rounded-xl" onclick="subscribe('${t.id}')">Subscribe Now</button>
    </section>`;
}

// ====== Wallet ======
function Wallet() {
  const plan = localStorage.getItem("plan") || "None";
  return `
    <section class="py-12">
      <h2 class="text-2xl font-semibold mb-4">Wallet</h2>
      <p>Selected Trader: <b>${plan}</b></p>
      <p class="text-neutral-400 mt-2">Use NOWPayments for secure payment.</p>
      <button class="mt-4 px-4 py-2 border rounded" onclick="show('traders')">Back to Traders</button>
    </section>`;
}

// ====== Navigation ======
function show(page) {
  if (page === "home") app.innerHTML = Hero();
  if (page === "traders") app.innerHTML = TradersList();
  if (page === "wallet") app.innerHTML = Wallet();
}

// ====== Profile Navigation ======
function openProfile(id) {
  app.innerHTML = TraderProfile(id);
}

// ====== Subscribe Action ======
function subscribe(id) {
  const t = TRADERS.find((x) => x.id === id);
  localStorage.setItem("plan", t.name);
  show("wallet");
}

// ====== Start ======
show("home");
