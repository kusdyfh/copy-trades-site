// ---------- Router ----------
const app = document.getElementById("app");
window.addEventListener("hashchange", render);
document.addEventListener("DOMContentLoaded", render);
function route(){ return (location.hash.replace(/^#\//,'') || "home"); }
function render(){ app.innerHTML = (Routes[route()]?.() || Home()); attach(); }

// ---------- Header ----------
function Header(){
  return `
  <header>
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:34px;height:34px;border-radius:10px;border:1px solid var(--border);display:grid;place-items:center;background:#0b0b0b">
          <div style="width:10px;height:10px;border-radius:999px;background:var(--gold)"></div>
        </div>
        <strong>Broker CORP</strong>
        <span class="badge">Pro • Gold</span>
      </div>
      <nav class="nav">
        <a href="#/home">Home</a>
        <a href="#/traders">Traders</a>
        <a href="#/pricing">Pricing</a>
        <a href="#/academy">Academy</a>
        <a href="#/analytics">Analytics</a>
        <a href="#/wallet">Wallet</a>
        <a href="#/faq">FAQ</a>
        <a href="#/contact">Contact</a>
      </nav>
    </div>
  </header>`;
}

// ---------- Sections ----------
function Home(){
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <div class="card" style="display:grid;gap:16px;grid-template-columns:1.2fr .8fr;align-items:center">
        <div>
          <h1 style="font-size:36px;line-height:1.15;margin:0 0 10px">
            Trade like a <span style="color:var(--gold)">professional</span>
          </h1>
          <p class="text-muted">Verified top traders • Transparent analytics • Complete academy • Secure USDT (TRC20) payments.</p>
          <div style="margin-top:14px;display:flex;gap:10px">
            <a class="btn btn-primary" href="#/traders">Explore Traders</a>
            <a class="btn btn-ghost" href="#/academy">Start Learning</a>
          </div>
        </div>
        <div class="card">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;text-align:center">
            <div class="card"><div class="text-muted" style="font-size:.85rem">Traders</div><div style="font-size:28px;font-weight:700">60</div></div>
            <div class="card"><div class="text-muted" style="font-size:.85rem">Win Rate</div><div style="font-size:28px;font-weight:700">76–89%</div></div>
            <div class="card"><div class="text-muted" style="font-size:.85rem">Markets</div><div style="font-size:18px;font-weight:700">Forex/Crypto/Gold/Indices</div></div>
            <div class="card"><div class="text-muted" style="font-size:.85rem">Rating</div><div style="font-size:28px;font-weight:700">4.6–4.9★</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function Traders(){
  const cards = TRADERS.map(tr=>{
    const price = priceForTrader(tr);
    return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <div>
            <a href="#/trader/${tr.id}" style="text-decoration:underline;text-underline-offset:4px">${tr.name}</a>
            <div class="text-muted" style="font-size:.85rem">${tr.market} • ${tr.country} • ${tr.years}y</div>
          </div>
          <div class="badge">$${price}/mo</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center;margin-top:10px">
          <div><div class="text-muted" style="font-size:.8rem">ROI</div><div style="font-size:18px;font-weight:700">${Math.round(tr.roi*100)}%</div></div>
          <div><div class="text-muted" style="font-size:.8rem">Win</div><div style="font-size:18px;font-weight:700">${Math.round(tr.win*100)}%</div></div>
          <div><div class="text-muted" style="font-size:.8rem">Exp</div><div style="font-size:18px;font-weight:700">${tr.years}y</div></div>
        </div>
        <div class="hr"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
          <span class="text-muted" style="font-size:.9rem">${tr.style}</span>
          <button class="btn btn-primary" data-sub="${tr.id}">Subscribe</button>
        </div>
      </div>`;
  }).join("");
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 10px">Pro Traders</h2>
      <p class="text-muted" style="margin:0 0 14px">Pick a trader to view profile or subscribe instantly.</p>
      <div class="grid-cards">${cards}</div>
    </div>
  </section>`;
}

function TraderProfile(){
  const id = (location.hash.split("/")[2]||"").trim();
  const tr = TRADERS.find(x=>x.id===id);
  if(!tr) return `${Header()}<section class="section"><div class="container">Not found</div></section>`;
  const price = priceForTrader(tr);
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <a href="#/traders" class="badge">← Back</a>
      <div class="card" style="margin-top:12px">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:14px">
          <div>
            <h2 style="margin:0">${tr.name}</h2>
            <div class="text-muted" style="font-size:.9rem;margin-top:4px">${tr.market} • ${tr.country} • ${tr.years}y</div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span class="badge">ROI ${Math.round(tr.roi*100)}%</span>
            <span class="badge">Win ${Math.round(tr.win*100)}%</span>
            <span class="badge">$${price}/mo</span>
          </div>
        </div>
        <div class="hr"></div>
        <p class="text-muted" style="margin:0 0 10px">${tr.style}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary" data-sub="${tr.id}">Subscribe Now</button>
          <a class="btn btn-ghost" href="#/wallet">Go to Wallet</a>
        </div>
      </div>
    </div>
  </section>`;
}

function Pricing(){
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">Pricing</h2>
      <div class="grid-cards">
        <div class="card">
          <div style="display:flex;justify-content:space-between"><div><div style="font-weight:600">Premium</div><div class="text-muted">All traders + analytics</div></div><div style="font-size:28px;font-weight:700">$150</div></div>
          <button class="btn btn-primary" style="margin-top:10px" data-plan="premium">Subscribe</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between"><div><div style="font-weight:600">Single Trader</div><div class="text-muted">Choose one pro</div></div><div style="font-size:28px;font-weight:700">$49</div></div>
          <button class="btn btn-primary" style="margin-top:10px" data-plan="single">Subscribe</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between"><div><div style="font-weight:600">Free Trial</div><div class="text-muted">7 days</div></div><div style="font-size:28px;font-weight:700">$0</div></div>
          <button class="btn btn-ghost" style="margin-top:10px" data-plan="trial">Start Trial</button>
        </div>
      </div>
      <p class="text-muted" style="margin-top:8px;font-size:.85rem">Payments are processed securely.</p>
    </div>
  </section>`;
}

function Academy(){
  // دروس حقيقية + روابط يوتيوب (أمثلة تعليمية)
  const COURSES = [
    { id:"fx", title:"Master Forex (Beginner → Pro)", lessons:[
      {t:"Intro to Forex & Brokers", y:"https://www.youtube.com/watch?v=0X_5mA2r3iA"},
      {t:"Order Types, Spread & Slippage", y:"https://www.youtube.com/watch?v=V3v6w0-3M2o"},
      {t:"Risk & Position Sizing", y:"https://www.youtube.com/watch?v=QeOQu3wV0yA"},
      {t:"News vs Technicals", y:"https://www.youtube.com/watch?v=8vYz0i4zXqo"},
    ]},
    { id:"risk", title:"Pro Risk Management", lessons:[
      {t:"Institutional Risk Frameworks", y:"https://www.youtube.com/watch?v=cz6n8vTq6Hk"},
      {t:"Drawdown Control & Recovery", y:"https://www.youtube.com/watch?v=0eMkE3QTVvo"},
      {t:"Hedging Basics", y:"https://www.youtube.com/watch?v=qUe2tZcNNh4"},
    ]},
    { id:"ta", title:"Advanced Technical Analysis", lessons:[
      {t:"Market Structure & SMC", y:"https://www.youtube.com/watch?v=4b4JdG7gQy4"},
      {t:"Momentum & Trend Continuation", y:"https://www.youtube.com/watch?v=Su1c8b7QW2w"},
      {t:"Patterns & Backtesting 101", y:"https://www.youtube.com/watch?v=Z8lG2wq2Q7g"},
    ]},
    { id:"harmonics", title:"Harmonics & Elliott Waves", lessons:[
      {t:"Harmonic Basics", y:"https://www.youtube.com/watch?v=_vU2nXU0yqE"},
      {t:"Elliott Wave Essentials", y:"https://www.youtube.com/watch?v=rJ3U8xGz1lM"},
    ]},
    { id:"volume", title:"Volume & Time Analysis", lessons:[
      {t:"Volume Profile", y:"https://www.youtube.com/watch?v=3H1bLz2kI8c"},
      {t:"Time Cycles", y:"https://www.youtube.com/watch?v=3mQY0Xw9nWQ"},
    ]},
  ];
  const grid = COURSES.map(c=>`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:600">${c.title}</div>
          <div class="text-muted" style="font-size:.9rem">Lessons: ${c.lessons.length}</div>
        </div>
        <span class="badge">Academy</span>
      </div>
      <div class="hr"></div>
      <ul style="margin:0;padding-left:18px">
        ${c.lessons.map(l=>`<li style="margin:6px 0">
          <a class="btn" style="padding:.45rem .7rem" href="${l.y}" target="_blank" rel="noopener">${l.t}</a>
        </li>`).join("")}
      </ul>
    </div>`).join("");
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">Academy</h2>
      <p class="text-muted" style="margin:0 0 14px">Curated lessons & real YouTube resources.</p>
      <div class="grid-cards">${grid}</div>
    </div>
  </section>`;
}

function Analytics(){
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">Analytics & Insights</h2>
      <div class="grid-cards">
        <div class="card"><div style="font-weight:600;margin-bottom:6px">Live stats</div><p class="text-muted">Real-time performance (demo).</p></div>
        <div class="card"><div style="font-weight:600;margin-bottom:6px">Performance reports</div><p class="text-muted">Monthly summaries (coming soon).</p></div>
        <div class="card"><div style="font-weight:600;margin-bottom:6px">Smart alerts</div><p class="text-muted">Actionable alerts & recommendations.</p></div>
      </div>
    </div>
  </section>`;
}

function Wallet(){
  const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
  const step = Number(sessionStorage.getItem("step")||"1");
  const label = (!sel ? "—" : (sel.type==="plan" ? sel.name : (TRADERS.find(x=>x.id===sel.traderId)?.name || "Trader")));
  const amount = (!sel ? null : (sel.type==="plan" ? sel.amount : sel.price));

  const steps = (cur)=>`
    <div style="display:flex;align-items:center;gap:16px;font-size:.95rem">
      <div class="step ${cur>=1?"active":""}"><span class="dot"></span>Choose</div>
      <div class="step ${cur>=2?"active":""}"><span class="dot"></span>Review</div>
      <div class="step ${cur>=3?"active":""}"><span class="dot"></span>Pay</div>
    </div>`;

  const selectHTML = `
    <div class="card">
      <div style="font-weight:600;margin-bottom:8px">Choose your plan</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button class="btn" data-p="premium">Premium $150</button>
        <button class="btn" data-p="single">Single $49</button>
        <span class="text-muted" style="font-size:.9rem">Or pick a trader from <a href="#/traders" style="text-decoration:underline;text-underline-offset:3px">Traders</a>.</span>
      </div>
      ${sel? `<div style="margin-top:10px;font-size:.95rem">Selected: <b>${label}${amount?` – $${amount}/mo`:""}</b></div>` : ""}
      <div style="margin-top:12px"><button class="btn btn-primary" data-next="2" ${!sel?"disabled":""}>Next</button></div>
    </div>`;

  const reviewHTML = `
    <div class="card">
      <div style="font-weight:600;margin-bottom:6px">Review</div>
      <div class="text-muted" style="font-size:.95rem">Plan: <b>${label}</b></div>
      <div class="text-muted" style="font-size:.95rem">Amount: <b>$${amount}</b></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
        <input class="input" id="email" type="email" placeholder="Email (for receipt)"/>
        <input class="input" id="pay_wallet" placeholder="Your USDT TRC20 address"/>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn" data-prev="1">Back</button>
        <button class="btn btn-primary" data-next="3" id="go-pay" ${!sel?"disabled":""}>Continue</button>
      </div>
    </div>`;

  const payHTML = `
    <div class="card">
      <div style="font-weight:600;margin-bottom:6px">Pay (USDT • TRC20)</div>
      <p class="text-muted" style="margin:0 0 10px">An invoice will open in a new tab. After paying, click the button below.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary" id="pay-now">Open Invoice</button>
        <button class="btn" id="paid-done">I completed the payment</button>
      </div>
      <p id="pay-msg" class="text-muted" style="margin-top:10px"></p>
    </div>`;

  const withdrawHTML = `
    <div class="card">
      <h3 style="margin:0 0 8px">USDT Withdrawal</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
        <div><label class="text-muted" style="font-size:.85rem">Network</label><input class="input" value="TRC20" disabled/></div>
        <div><label class="text-muted" style="font-size:.85rem">Address</label><input class="input" id="w-address" placeholder="T..."/></div>
        <div><label class="text-muted" style="font-size:.85rem">Amount (USDT)</label><input class="input" id="w-amount" type="number" min="10" max="10000"/><p class="text-muted" style="font-size:.8rem;margin:.35rem 0 0">Min 10$ / Max 10000$ • Fee 1% (min 1$)</p></div>
      </div>
      <div class="text-muted" id="w-fee" style="margin-top:6px;font-size:.95rem"></div>
      <div style="margin-top:10px;display:flex;gap:8px">
        <input class="input" id="w-email" placeholder="Email for status updates"/>
        <button class="btn btn-ghost" id="w-submit">Submit</button>
      </div>
      <p class="text-muted" id="w-msg" style="margin-top:8px"></p>
    </div>`;

  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 10px">Wallet</h2>
      ${steps(step)}
      <div style="display:grid;gap:14px;grid-template-columns:1fr 1fr;margin-top:12px">
        <div>${step===1?selectHTML: step===2?reviewHTML: payHTML}</div>
        <div>${withdrawHTML}</div>
      </div>
    </div>
  </section>`;
}

function FAQ(){
  const list = [
    {q:"Do you guarantee profits?", a:"No. Trading is risky; you can lose capital."},
    {q:"How are payments processed?", a:"Payments are handled securely via our crypto processor."},
    {q:"How long do withdrawals take?", a:"Usually 1–3 business days after review."}
  ];
  const grid = list.map(x=>`<div class="card"><div style="font-weight:600">${x.q}</div><p class="text-muted" style="margin-top:6px">${x.a}</p></div>`).join("");
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">FAQ</h2><div class="grid-cards">${grid}</div></div></section>`;
}

function Contact(){
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">Contact</h2>
      <div class="card">
        <p class="text-muted">Support 24/7 via email or Telegram.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
          <input class="input" id="c-name" placeholder="Name"/>
          <input class="input" id="c-email" placeholder="Email"/>
        </div>
        <textarea class="input" id="c-msg" rows="4" style="margin-top:10px" placeholder="Message"></textarea>
        <button class="btn btn-primary" id="c-send" style="margin-top:10px">Send</button>
        <p class="text-muted" id="c-status" style="margin-top:8px"></p>
      </div>
    </div>
  </section>`;
}

// ---------- Routes ----------
const Routes = {
  "": Home, "home": Home,
  "traders": Traders,
  "trader": TraderProfile, // /#/trader/:id
  "pricing": Pricing,
  "academy": Academy,
  "analytics": Analytics,
  "wallet": Wallet,
  "faq": FAQ,
  "contact": Contact,
};

// ---------- Attach handlers ----------
function attach(){
  // Subscribe by trader
  document.querySelectorAll("[data-sub]")?.forEach(el=>{
    el.onclick = ()=>{
      const id = el.getAttribute("data-sub");
      const tr = TRADERS.find(x=>x.id===id); if(!tr) return;
      sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price: priceForTrader(tr), name: tr.name }));
      sessionStorage.setItem("step","1");
      location.hash = "#/wallet";
    };
  });
  // Subscribe by plan
  document.querySelectorAll("[data-plan]")?.forEach(el=>{
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
  // Wallet Stepper
  const next = document.querySelector("[data-next]");
  const prev = document.querySelector("[data-prev]");
  next && (next.onclick = ()=> { sessionStorage.setItem("step", next.getAttribute("data-next")); render(); });
  prev && (prev.onclick = ()=> { sessionStorage.setItem("step", prev.getAttribute("data-prev")); render(); });

  const goPay = document.getElementById("go-pay");
  goPay && (goPay.onclick = ()=>{
    const email = document.getElementById("email").value.trim();
    const w = document.getElementById("pay_wallet").value.trim();
    if(!email || !w) return alert("Please fill email and your USDT TRC20 address.");
    sessionStorage.setItem("checkout_email", email);
    sessionStorage.setItem("checkout_wallet", w);
    sessionStorage.setItem("step","3"); render();
  });

  const payBtn = document.getElementById("pay-now");
  payBtn && (payBtn.onclick = createInvoice);

  // Mock “I completed the payment” success info for UX
  const paidDone = document.getElementById("paid-done");
  paidDone && (paidDone.onclick = ()=>{
    const box = document.getElementById("pay-msg");
    box.innerHTML = "✅ Thanks! Your payment is being processed. It will be handled within a few minutes.";
  });

  // Withdraw UX
  const amtEl = document.getElementById("w-amount");
  const feeBox = document.getElementById("w-fee");
  amtEl && amtEl.addEventListener("input", ()=>{
    const amt = Number(amtEl.value||0);
    const fee = Math.max(1, Math.round(amt*0.01*100)/100);
    const total = Math.max(0, amt - fee);
    feeBox.innerHTML = `Fee: <b>${fee}$</b> • Will send: <b>${total}$</b>`;
  });
  const wSubmit = document.getElementById("w-submit");
  wSubmit && (wSubmit.onclick = submitWithdrawal);

  // Contact (client-side demo)
  const cSend = document.getElementById("c-send");
  cSend && (cSend.onclick = ()=>{
    const name = document.getElementById("c-name").value.trim();
    const email= document.getElementById("c-email").value.trim();
    const m    = document.getElementById("c-msg").value.trim();
    if(!name || !email || !m) return document.getElementById("c-status").textContent="Please fill all fields.";
    document.getElementById("c-status").textContent="Message sent (preview).";
  });
}

// ---------- Payments ----------
async function createInvoice(){
  try{
    const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
    if(!sel){ alert("Select a plan first."); return;}
    const amount = sel.type==="plan" ? sel.amount : sel.price;
    const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const email = sessionStorage.getItem("checkout_email")||"";
    const userWallet = sessionStorage.getItem("checkout_wallet")||"";

    const res = await fetch("/.netlify/functions/create-invoice", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        amount, // 🔥 المهم: نرسل السعر هنا
        orderId,
        description: `Subscription for ${sel.type==="plan"? sel.name : (sel.name || "Trader")}`,
        email,
        userWallet
      })
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || data.error || "Payment API error");
    if(data.invoice_url){
      window.open(data.invoice_url, "_blank"); // يفتح الفاتورة (ستظهر العنوان والـ QR)
    }else{
      alert("Invoice created, but no URL returned.");
    }
  }catch(err){
    alert("Payment init failed: " + err.message);
  }
}

// ---------- Withdraw ----------
async function submitWithdrawal(){
  try{
    const addr = document.getElementById("w-address").value.trim();
    const amt  = Number(document.getElementById("w-amount").value||0);
    const email= document.getElementById("w-email").value.trim();
    const msg  = document.getElementById("w-msg");
    if(!addr || addr.length<10){ msg.textContent="Enter valid address"; return; }
    if(isNaN(amt) || amt<10 || amt>10000){ msg.textContent="Amount must be 10–10000$"; return; }
    const res = await fetch("/.netlify/functions/submit-withdrawal", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, network:"TRC20", address:addr, amount:amt })
    });
    if(!res.ok){ throw new Error(await res.text()); }
    msg.textContent = "Withdrawal request submitted. We will process it ASAP.";
    document.getElementById("w-address").value="";
    document.getElementById("w-amount").value="";
  }catch(e){
    document.getElementById("w-msg").textContent = "Error: " + e.message;
  }
}
