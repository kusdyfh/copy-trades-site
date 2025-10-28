const app = document.getElementById("app");
document.getElementById("year").textContent = new Date().getFullYear();

// ====== Hero Section ======
function Hero() {
  return `
    <section class="py-12">
      <h1 class="text-4xl font-bold mb-2">Welcome to Broker CORP</h1>
      <p class="text-neutral-400 mb-4">Professional trading platform preview.</p>
      <button class="px-4 py-2 border rounded" onclick="show('wallet')">Subscribe Premium</button>
    </section>`;
}

// ====== Traders Section ======
function Traders() {
  return `
    <section class="py-12">
      <h2 class="text-2xl font-semibold mb-4">Top Traders</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${TRADERS.map(
          (t) => `
          <div class="card">
            <div class="font-semibold">${t.name}</div>
            <div class="text-neutral-400 text-sm">
              ROI ${Math.round(t.roi * 100)}% | WIN ${Math.round(t.win * 100)}%
            </div>
            <div class="mt-2 text-lg font-bold">$${priceForTrader(t)}</div>
            <button 
              class="mt-3 px-3 py-2 border rounded text-sm" 
              onclick="subscribe('${t.id}')">
              Subscribe
            </button>
          </div>`
        ).join("")}
      </div>
    </section>`;
}

// ====== Pricing Section ======
function Pricing() {
  return `
    <section class="py-12">
      <h2 class="text-2xl font-semibold mb-4">Plans</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="card">
          <div class="font-semibold">Premium</div>
          <div class="text-3xl font-bold">$150</div>
        </div>
        <div class="card">
          <div class="font-semibold">Single Trader</div>
          <div class="text-3xl font-bold">$49</div>
        </div>
      </div>
    </section>`;
}

// ====== Wallet Section ======
function Wallet() {
  const plan = localStorage.getItem("plan") || "Premium";
  return `
    <section class="py-12">
      <h2 class="text-2xl font-semibold mb-4">Wallet</h2>
      <p>Selected plan: <b>${plan}</b></p>
      <button 
        class="mt-4 px-4 py-2 border rounded" 
        onclick="show('home')">
        Back Home
      </button>
    </section>`;
}

// ====== Navigation ======
function show(page) {
  if (page === "home") app.innerHTML = Hero() + Traders() + Pricing();
  if (page === "wallet") app.innerHTML = Wallet();
}

// ====== Subscribe Action ======
function subscribe(id) {
  const t = TRADERS.find((x) => x.id === id);
  localStorage.setItem("plan", t.name);
  show("wallet");
}

// ====== Start App ======
show("home");
