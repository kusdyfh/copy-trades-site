const app = document.getElementById("app");

// Router
window.addEventListener("hashchange", render);
function route() { return (location.hash.replace(/^#\//,'') || "home"); }
function render(){ app.innerHTML = Routes[route()]?.() || Home(); attach(); }
function navActive(){ /* اختياري: تمييز الرابط النشط */ }
document.addEventListener("DOMContentLoaded", render);

// ---------- Sections ----------
function Home(){
  return `
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 grid gap-8 lg:grid-cols-2 items-center">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold leading-[1.15]">Professional Trading Platform <span class="text-teal-400">Broker CORP</span></h1>
        <p class="mt-4 text-neutral-300">Top traders, advanced analytics, and a complete academy — in one platform.</p>
        <div class="mt-6 flex gap-3">
          <a class="btn" href="#/traders">Explore Traders</a>
          <a class="btn" href="#/academy">Explore Academy</a>
        </div>
      </div>
      <div class="card">
        <h3 class="font-semibold mb-3">Platform Stats</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="card text-center p-4"><div class="text-sm text-neutral-400">Traders</div><div class="text-3xl mt-1 font-semibold">60</div></div>
          <div class="card text-center p-4"><div class="text-sm text-neutral-400">Markets</div><div class="text-3xl mt-1 font-semibold">Forex/Crypto/Gold/Indices</div></div>
          <div class="card text-center p-4"><div class="text-sm text-neutral-400">Win Rate</div><div class="text-3xl mt-1 font-semibold">~76–89%</div></div>
          <div class="card text-center p-4"><div class="text-sm text-neutral-400">Rating</div><div class="text-3xl mt-1 font-semibold">4.6–4.9★</div></div>
        </div>
      </div>
    </div>
  </section>`;
}

function Traders(){
  const cards = TRADERS.map(tr=>{
    const price = priceForTrader(tr);
    return `<div class="card">
      <div class="flex items-center justify-between">
        <div>
          <a class="font-semibold underline underline-offset-4" href="#/trader/${tr.id}">${tr.name}</a>
          <div class="text-xs text-neutral-400">${tr.market} • ${tr.country} • ${tr.years}y</div>
        </div>
        <div class="badge">$${price}/mo</div>
      </div>
      <div class="mt-3 grid grid-cols-3 gap-3 text-center">
        <div><div class="text-xs text-neutral-400">ROI</div><div class="text-lg font-semibold">${Math.round(tr.roi*100)}%</div></div>
        <div><div class="text-xs text-neutral-400">Win</div><div class="text-lg font-semibold">${Math.round(tr.win*100)}%</div></div>
        <div><div class="text-xs text-neutral-400">Exp</div><div class="text-lg font-semibold">${tr.years}y</div></div>
      </div>
      <div class="mt-3 flex items-center justify-between">
        <span class="text-sm text-neutral-300">${tr.style}</span>
        <button class="btn" data-sub="${tr.id}">Subscribe</button>
      </div>
    </div>`;
  }).join("");
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-2">Pro Traders</h2>
    <p class="text-neutral-400 mb-6">Pick a trader to view profile or subscribe</p>
    <div class="grid-cards">${cards}</div>
  </div></section>`;
}

function TraderProfile(){
  const id = (location.hash.split("/")[2]||"").trim();
  const tr = TRADERS.find(x=>x.id===id);
  if(!tr) return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">Not found</div></section>`;
  const price = priceForTrader(tr);
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <a class="badge inline-block mb-4" href="#/traders">← Back</a>
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold">${tr.name}</h2>
          <div class="text-sm text-neutral-400 mt-1">${tr.market} • ${tr.country} • ${tr.years}y</div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge">ROI ${Math.round(tr.roi*100)}%</span>
          <span class="badge">Win ${Math.round(tr.win*100)}%</span>
          <span class="badge">$${price}/mo</span>
        </div>
      </div>
      <div class="mt-6 grid md:grid-cols-3 gap-6">
        <div class="card p-4">
          <div class="font-semibold mb-2">Overview</div>
          <p class="text-sm text-neutral-300">${tr.name} runs a disciplined approach across ${tr.market} with strict risk control.</p>
        </div>
        <div class="card p-4 md:col-span-2">
          <div class="font-semibold mb-2">Strategy</div>
          <p class="text-sm text-neutral-300">${tr.style}</p>
        </div>
      </div>
      <div class="mt-6 flex gap-3">
        <button class="btn" data-sub="${tr.id}">Subscribe Now</button>
        <a class="btn" href="#/wallet">Go to Wallet</a>
      </div>
    </div></div></section>`;
}

function Pricing(){
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-6">Pricing</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="card">
        <div class="flex items-center justify-between">
          <div><div class="font-semibold text-lg">Premium</div><div class="text-neutral-400 text-sm">Monthly</div></div>
          <div class="text-3xl font-bold">$150</div>
        </div>
        <button class="btn mt-4" data-plan="premium">Subscribe</button>
      </div>
      <div class="card">
        <div class="flex items-center justify-between">
          <div><div class="font-semibold text-lg">Single Trader</div><div class="text-neutral-400 text-sm">Monthly</div></div>
          <div class="text-3xl font-bold">$49</div>
        </div>
        <button class="btn mt-4" data-plan="single">Subscribe</button>
      </div>
      <div class="card">
        <div class="flex items-center justify-between">
          <div><div class="font-semibold text-lg">Free Trial</div><div class="text-neutral-400 text-sm">7 days</div></div>
          <div class="text-3xl font-bold">$0</div>
        </div>
        <button class="btn mt-4" data-plan="trial">Start Trial</button>
      </div>
    </div>
    <p class="text-xs text-neutral-500 mt-3">Payments are processed securely.</p>
  </div></section>`;
}

function Academy(){
  const COURSES = [
    { id:"c1", title:"Mastering Forex", lessons:["Intro to FX","Order Types","Risk & Sizing","Technical vs Fundamental"] },
    { id:"c2", title:"Pro Risk Management", lessons:["Institutional Frameworks","Drawdown Control","Hedging Basics"] },
    { id:"c3", title:"Advanced Technicals", lessons:["Market Structure","Momentum","Patterns","Backtesting 101"] },
  ];
  const grid = COURSES.map(c=>`
    <div class="card">
      <div class="font-semibold">${c.title}</div>
      <div class="text-sm text-neutral-400">Lessons: ${c.lessons.length}</div>
      <details class="mt-3">
        <summary class="cursor-pointer">View Curriculum</summary>
        <ul class="mt-2 space-y-1 text-sm">
          ${c.lessons.map(l=>`<li class="flex items-center justify-between gap-3">
            <span>${l}</span><button class="text-xs btn" data-done="${c.id}">Mark done</button></li>`).join("")}
        </ul>
      </details>
    </div>`).join("");
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-6">Academy</h2>
    <div class="grid-cards">${grid}</div>
  </div></section>`;
}

function Analytics(){
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-6">Analytics & Insights</h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div class="card"><div class="font-semibold mb-2">Live stats</div><p class="text-sm text-neutral-400">Real-time performance (demo).</p></div>
      <div class="card"><div class="font-semibold mb-2">Performance reports</div><p class="text-sm text-neutral-400">Download monthly summaries (coming soon).</p></div>
      <div class="card"><div class="font-semibold mb-2">Smart alerts</div><p class="text-sm text-neutral-400">Actionable alerts & recommendations.</p></div>
    </div>
  </div></section>`;
}

function Wallet(){
  const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
  const step = Number(sessionStorage.getItem("step")||"1");
  const label = (!sel ? "—" : (sel.type==="plan" ? sel.name : (TRADERS.find(x=>x.id===sel.traderId)?.name || "Trader")));
  const amount = (!sel ? null : (sel.type==="plan" ? sel.amount : sel.price));

  const steps = (cur)=>`
    <div class="flex items-center gap-6 text-sm">
      <div class="step ${cur>=1?"active":""}"><span class="dot"></span>Choose</div>
      <div class="step ${cur>=2?"active":""}"><span class="dot"></span>Review</div>
      <div class="step ${cur>=3?"active":""}"><span class="dot"></span>Pay</div>
    </div>`;

  const selectHTML = `
    <div class="card">
      <div class="font-semibold mb-3">Choose your plan</div>
      <div class="flex flex-wrap gap-2">
        <button class="btn" data-p="premium">Premium $150</button>
        <button class="btn" data-p="single">Single $49</button>
        <span class="text-xs text-neutral-400">Or pick a trader from <a class="underline" href="#/traders">Traders</a>.</span>
      </div>
      ${sel? `<div class="mt-3 text-sm">Selected: <b>${label}${amount?` – $${amount}/mo`:""}</b></div>` : ""}
      <div class="mt-4"><button class="btn" data-next="2" ${!sel?"disabled":""}>Next</button></div>
    </div>`;

  const reviewHTML = `
    <div class="card">
      <div class="font-semibold mb-2">Review</div>
      <div class="text-sm">Plan: <b>${label}</b></div>
      <div class="text-sm">Amount: <b>$${amount}</b></div>
      <div class="grid md:grid-cols-2 gap-3 mt-4">
        <input class="input" id="email" type="email" placeholder="Email (for receipt)"/>
        <input class="input" id="pay_wallet" placeholder="Your USDT TRC20 address"/>
      </div>
      <div class="mt-4 flex gap-2">
        <button class="btn" data-prev="1">Back</button>
        <button class="btn" data-next="3" id="go-pay" ${!sel?"disabled":""}>Continue</button>
      </div>
    </div>`;

  const payHTML = `
    <div class="card">
      <div class="font-semibold mb-2">Pay</div>
      <p class="text-sm text-neutral-400">Invoice will be created securely.</p>
      <button class="btn mt-2" id="pay-now">Pay Now</button>
    </div>`;

  const withdrawHTML = `
    <div class="card">
      <h3 class="font-semibold mb-2">USDT Withdrawal</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div><label class="text-sm text-neutral-400 mb-1 block">Network</label><input class="input" id="w-network" value="TRC20" disabled/><p class="text-xs text-neutral-500 mt-1">TRC20 only</p></div>
        <div><label class="text-sm text-neutral-400 mb-1 block">Address</label><input class="input" id="w-address" placeholder="T..."/></div>
        <div><label class="text-sm text-neutral-400 mb-1 block">Amount (USDT)</label><input class="input" id="w-amount" type="number" min="10" max="10000"/><p class="text-xs text-neutral-500 mt-1">Min 10$ / Max 10000$ • Fee 1% (min 1$)</p></div>
      </div>
      <div class="mt-2 text-sm" id="w-fee"></div>
      <div class="mt-3 flex gap-2">
        <input class="input" id="w-email" placeholder="Email for status updates"/>
        <button class="btn" id="w-submit">Submit</button>
      </div>
      <p class="text-sm mt-2" id="w-msg"></p>
    </div>`;

  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-4">Wallet</h2>
    ${steps(step)}
    <div class="grid gap-6 lg:grid-cols-2 mt-4">
      <div>${step===1?selectHTML: step===2?reviewHTML: payHTML}</div>
      <div>${withdrawHTML}</div>
    </div>
  </div></section>`;
}

function FAQ(){
  const list = [
    {q:"Do you guarantee profits?", a:"No. Trading is risky; you can lose capital."},
    {q:"How are payments processed?", a:"We use a secure crypto payment processor."},
    {q:"How long do withdrawals take?", a:"Usually 1–3 business days after review."}
  ];
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-4">FAQ</h2>
    <div class="grid-cards">
      ${list.map(x=>`<div class="card"><div class="font-semibold">${x.q}</div><p class="text-sm text-neutral-300 mt-1">${x.a}</p></div>`).join("")}
    </div>
  </div></section>`;
}

function Contact(){
  return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
    <h2 class="text-2xl font-semibold mb-4">Contact</h2>
    <div class="card">
      <p class="text-sm text-neutral-400">Support 24/7 via email/Telegram.</p>
      <div class="grid md:grid-cols-2 gap-4 mt-4">
        <input class="input" id="c-name" placeholder="Name"/>
        <input class="input" id="c-email" placeholder="Email"/>
      </div>
      <textarea class="input mt-3" rows="4" id="c-msg" placeholder="Message"></textarea>
      <button class="btn mt-4" id="c-send">Send</button>
      <p class="text-sm mt-2" id="c-status"></p>
    </div>
  </div></section>`;
}

// Routes map
const Routes = {
  "": Home,
  "home": Home,
  "traders": Traders,
  "trader": TraderProfile, // uses hash /trader/:id
  "pricing": Pricing,
  "academy": Academy,
  "analytics": Analytics,
  "wallet": Wallet,
  "faq": FAQ,
  "contact": Contact,
};

// ---------- Attach Handlers ----------
function attach(){
  // buttons style
  document.querySelectorAll("button.btn, a.btn").forEach(b=> b.classList.add("btn"));

  // generic subs (from traders/pricing/profile)
  document.querySelectorAll("[data-sub]").forEach(el=>{
    el.onclick = ()=>{
      const id = el.getAttribute("data-sub");
      const tr = TRADERS.find(x=>x.id===id); if(!tr) return;
      sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price: priceForTrader(tr) }));
      sessionStorage.setItem("step","1");
      location.hash = "#/wallet";
    };
  });
  document.querySelectorAll("[data-plan]").forEach(el=>{
    el.onclick = ()=>{
      const p = el.getAttribute("data-plan");
      const obj = (p==="premium") ? {type:"plan", name:"Premium", amount:150}
               : (p==="single")  ? {type:"plan", name:"Single", amount:49}
               : {type:"plan", name:"Trial", amount:0};
      sessionStorage.setItem("plan", JSON.stringify(obj));
      sessionStorage.setItem("step","1");
      location.hash = "#/wallet";
    };
  });

  // wallet stepper
  const next = document.querySelector("[data-next]");
  const prev = document.querySelector("[data-prev]");
  next && (next.onclick = ()=> { sessionStorage.setItem("step", next.getAttribute("data-next")); render(); });
  prev && (prev.onclick = ()=> { sessionStorage.setItem("step", prev.getAttribute("data-prev")); render(); });

  // move to step 2 after filling details
  const goPay = document.getElementById("go-pay");
  goPay && (goPay.onclick = ()=>{
    const email = document.getElementById("email").value.trim();
    const w = document.getElementById("pay_wallet").value.trim();
    if(!email || !w) return alert("Please fill email and your USDT TRC20 address.");
    sessionStorage.setItem("checkout_email", email);
    sessionStorage.setItem("checkout_wallet", w);
    sessionStorage.setItem("step","3"); render();
  });

  // pay now
  const payBtn = document.getElementById("pay-now");
  payBtn && (payBtn.onclick = createInvoiceNOW);

  // withdrawal calc & submit
  const amtEl = document.getElementById("w-amount");
  const feeBox = document.getElementById("w-fee");
  amtEl && amtEl.addEventListener("input", ()=>{
    const amt = Number(amtEl.value||0);
    const fee = Math.max(1, Math.round(amt*0.01*100)/100);
    const total = Math.max(0, amt - fee);
    feeBox.innerHTML = `Fee: <b>${fee}$</b> • Will send: <b>${total}$</b>`;
  });

  const wSubmit = document.getElementById("w-submit");
  wSubmit && (wSubmit.onclick = async ()=>{
    const addr = document.getElementById("w-address").value.trim();
    const amt  = Number(document.getElementById("w-amount").value||0);
    const email= document.getElementById("w-email").value.trim();
    const msg  = document.getElementById("w-msg");
    if(!addr || addr.length<10){ msg.textContent="Enter valid address"; return; }
    if(isNaN(amt) || amt<10 || amt>10000){ msg.textContent="Amount must be 10–10000$"; return; }
    try{
      const res = await fetch("/.netlify/functions/submit-withdrawal", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, network:"TRC20", address:addr, amount:amt })
      });
      if(!res.ok){ throw new Error(await res.text()); }
      msg.textContent = "Withdrawal request submitted. We will process it ASAP.";
      document.getElementById("w-address").value="";
      document.getElementById("w-amount").value="";
    }catch(e){ msg.textContent="Error: "+e.message; }
  });

  // contact
  const cSend = document.getElementById("c-send");
  cSend && (cSend.onclick = ()=>{
    const name = document.getElementById("c-name").value.trim();
    const email= document.getElementById("c-email").value.trim();
    const m    = document.getElementById("c-msg").value.trim();
    if(!name || !email || !m) return document.getElementById("c-status").textContent="Please fill all fields.";
    document.getElementById("c-status").textContent="Message sent (preview).";
  });
}

// ---------- NOWPayments via serverless ----------
async function createInvoiceNOW(){
  try{
    const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
    if(!sel){ alert("Select a plan first."); return;}
    const amount = sel.type==="plan" ? sel.amount : sel.price;
    const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const email = sessionStorage.getItem("checkout_email")||"";
    const userWallet = sessionStorage.getItem("checkout_wallet")||"";

    const res = await fetch("/.netlify/functions/create-invoice", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",
        order_id: orderId,
        customer_email: email,
        customer_wallet: userWallet,
        success_url: location.origin + "/#/home",
        cancel_url: location.origin + "/#/wallet",
        ipn_payload: { plan: sel } // يُعاد في الـ IPN
      })
    });
    if(!res.ok){ const tx = await res.text(); throw new Error(tx); }
    const data = await res.json(); // { invoice_url }
    window.open(data.invoice_url, "_blank");
  }catch(err){
    console.error(err);
    alert("Payment init failed: " + err.message);
  }
}
