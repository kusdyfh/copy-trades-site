// ===== Router / Boot =====
const app = document.getElementById("app");
window.addEventListener("hashchange", render);
document.addEventListener("DOMContentLoaded", () => { initLang(); hydrateLiveStats(); render(); });
function route(){ return (location.hash.replace(/^#\//,'') || "home"); }
function render(){ app.innerHTML = (Routes[route()?.split('/')[0]]?.() || Home()); attach(); }

// ===== i18n =====
const I18N = {
  en:{brand:"Broker CORP",pro:"Pro • Gold",nav:{home:"Home",traders:"Traders",pricing:"Pricing",academy:"Academy",analytics:"Analytics",wallet:"Deposit",withdraw:"Withdraw",faq:"FAQ",contact:"Contact"},lang:"العربية",
      hero1:"Trade like a",hero2:"professional",heroDesc:"Verified traders • Transparent analytics • Full academy • Secure USDT (TRC20) payments.",
      explore:"Explore Traders", learn:"Start Learning",
      kpiTraders:"Traders", kpiWin:"Win Rate", kpiMk:"Markets", kpiRate:"Rating",
      subscribe:"Subscribe", subscribeNow:"Subscribe Now", back:"← Back",
      pricing:"Pricing", premium:"Premium", premiumDesc:"All traders + analytics", single:"Single Trader", singleDesc:"Choose one pro", trial:"Free Trial", trialDesc:"7 days",
      deposit:"Deposit", choosePlan:"Choose your plan", review:"Review", pay:"Pay (USDT • TRC20)",
      plan:"Plan", amount:"Amount", email:"Email (for receipt)", yourWallet:"Your USDT TRC20 address", next:"Next", continue:"Continue",
      payNote:"Invoice opens securely in a new tab. Keep this page open.", openInvoice:"Open Invoice", openModal:"Show Payment Modal",
      thanks:"✅ Thanks! Your payment is being processed and will be confirmed within minutes.",
      withdraw:"Withdraw (USDT • TRC20)", network:"Network", address:"Address", amt:"Amount (USDT)", feeHint:"Min 10$ / Max 10000$ • Fee 1% (min 1$)", emailUpd:"Email for updates", submit:"Submit",
      faqTitle:"FAQ", faq1q:"Do you guarantee profits?", faq1a:"No. Trading is risky; you can lose capital.", faq2q:"How are payments processed?", faq2a:"Via secure crypto processor (USDT TRC20).", faq3q:"How long for withdrawals?", faq3a:"1–3 business days after review.",
      contactTitle:"Contact", supportNote:"Support 24/7 via email or Telegram.", name:"Name", message:"Message", send:"Send", sent:"Message sent (preview).",
      liveStats:"Live platform statistics", statTraders:"Pro Traders", statProfit:"Total PnL (demo)", statUsers:"Active Users" },
  ar:{brand:"Broker CORP",pro:"احترافي • ذهبي",nav:{home:"الرئيسية",traders:"المتداولون",pricing:"الأسعار",academy:"الأكاديمية",analytics:"التحليلات",wallet:"الإيداع",withdraw:"السحب",faq:"الأسئلة",contact:"التواصل"},lang:"EN",
      hero1:"تداول مثل",hero2:"محترف",heroDesc:"متداولون موثوقون • تحليلات شفافة • أكاديمية كاملة • دفع آمن USDT (TRC20).",
      explore:"استكشف المتداولين", learn:"ابدأ التعلم",
      kpiTraders:"المتداولون", kpiWin:"معدل الربح", kpiMk:"الأسواق", kpiRate:"التقييم",
      subscribe:"اشتراك", subscribeNow:"اشترك الآن", back:"← رجوع",
      pricing:"الأسعار", premium:"الباقة المميزة", premiumDesc:"كل المتداولين + تحليلات", single:"متداول واحد", singleDesc:"اختر محترفًا واحدًا", trial:"تجربة مجانية", trialDesc:"7 أيام",
      deposit:"الإيداع", choosePlan:"اختر خطتك", review:"مراجعة", pay:"الدفع (USDT • TRC20)",
      plan:"الخطة", amount:"المبلغ", email:"البريد (للوصل)", yourWallet:"عنوان محفظتك USDT TRC20", next:"التالي", continue:"استمرار",
      payNote:"ستُفتح الفاتورة في تبويب آمن. أبقِ هذه الصفحة مفتوحة.", openInvoice:"فتح الفاتورة", openModal:"عرض نافذة الدفع",
      thanks:"✅ شكرًا! يتم الآن معالجة دفعتك وسيتم تأكيدها خلال دقائق.",
      withdraw:"السحب (USDT • TRC20)", network:"الشبكة", address:"العنوان", amt:"القيمة (USDT)", feeHint:"الحد الأدنى 10$ / الأعلى 10000$ • عمولة 1% (حد أدنى 1$)", emailUpd:"البريد للتحديثات", submit:"إرسال",
      faqTitle:"الأسئلة الشائعة", faq1q:"هل تضمنون الأرباح؟", faq1a:"لا. التداول مخاطرة وقد تخسر رأس المال.", faq2q:"كيف تتم المدفوعات؟", faq2a:"عبر معالج تشفير آمن (USDT TRC20).", faq3q:"مدة السحب؟", faq3a:"1–3 أيام عمل بعد المراجعة.",
      contactTitle:"التواصل", supportNote:"دعم 24/7 عبر البريد أو التليجرام.", name:"الاسم", message:"الرسالة", send:"إرسال", sent:"تم الإرسال (تجريبي).",
      liveStats:"إحصائيات المنصة الحية", statTraders:"المتداولون المحترفون", statProfit:"صافي الأرباح (تجريبي)", statUsers:"المستخدمون النشطون" }
};
function initLang(){ const saved=localStorage.getItem("lang")||"en"; setLang(saved); }
function setLang(l){ localStorage.setItem("lang",l); document.documentElement.setAttribute("lang",l); document.documentElement.setAttribute("dir", l==="ar"?"rtl":"ltr"); }
function t(k){ const l=document.documentElement.getAttribute("lang")||"en"; return k.split(".").reduce((o,kk)=>o?.[kk], I18N[l]) ?? k; }
function toggleLang(){ setLang((document.documentElement.getAttribute("lang")||"en")==="en"?"ar":"en"); render(); }

// ===== Header =====
function Header(){
  return `
  <header>
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
      <div class="logo">
        <div class="logo-mark"><i></i></div>
        <strong>${t("brand")}</strong>
        <span class="badge">${I18N[document.documentElement.lang||"en"].pro}</span>
      </div>
      <nav class="nav">
        <a href="#/home">${t("nav.home")}</a>
        <a href="#/traders">${t("nav.traders")}</a>
        <a href="#/pricing">${t("nav.pricing")}</a>
        <a href="#/academy">${t("nav.academy")}</a>
        <a href="#/analytics">${t("nav.analytics")}</a>
        <a href="#/wallet">${t("nav.wallet")}</a>
        <a href="#/withdraw">${t("nav.withdraw")}</a>
        <a href="#/faq">${t("nav.faq")}</a>
        <a href="#/contact">${t("nav.contact")}</a>
        <button class="badge" id="lang">${t("lang")}</button>
      </nav>
    </div>
  </header>`;
}

// ===== Home + Live stats =====
function Home(){
  return `
  ${Header()}
  <section class="section">
    <div class="container hero card">
      <div>
        <h1 style="font-size:34px;margin:0 0 10px">${t("hero1")} <span style="color:var(--gold)">${t("hero2")}</span></h1>
        <p class="text-muted">${t("heroDesc")}</p>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-primary btn-wide" href="#/traders">${t("explore")}</a>
          <a class="btn btn-ghost btn-wide" href="#/academy">${t("learn")}</a>
        </div>
      </div>
      <div class="card">
        <div class="kpis">
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiTraders")}</div><div style="font-size:28px;font-weight:800">${TRADERS.length}</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiWin")}</div><div style="font-size:28px;font-weight:800">76–92%</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiMk")}</div><div style="font-size:16px;font-weight:700">Forex/Crypto/Gold/Indices</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiRate")}</div><div style="font-size:28px;font-weight:800">4.6–4.9★</div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h3 style="margin:0 0 10px">${t("liveStats")}</h3>
      <div class="stats">
        <div class="stat"><div class="text-muted">${t("statTraders")}</div><div class="num" id="stat-tr">${TRADERS.length}</div></div>
        <div class="stat"><div class="text-muted">${t("statProfit")}</div><div class="num" id="stat-pnl">$0</div></div>
        <div class="stat"><div class="text-muted">${t("statUsers")}</div><div class="num" id="stat-users">0</div></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="grid-cards">
        ${TRADERS.slice(0,4).map(tr=>TopTraderCard(tr)).join("")}
      </div>
    </div>
  </section>`;
}

// stats simulation (persists in localStorage)
function hydrateLiveStats(){
  const base = JSON.parse(localStorage.getItem("live_stats")||"null") || {pnl:125000, users:4200, ts:Date.now()};
  // grow slightly over time
  const mins = Math.max(1, (Date.now()-base.ts)/60000);
  base.pnl += Math.round(mins*50);   // +$50 per minute (demo)
  base.users += Math.round(mins*2);  // +2 users per minute (demo)
  base.ts = Date.now();
  localStorage.setItem("live_stats", JSON.stringify(base));
  setTimeout(()=>{ const s=JSON.parse(localStorage.getItem("live_stats")); 
    const el1=document.getElementById("stat-pnl"); const el2=document.getElementById("stat-users");
    if(el1) el1.textContent="$"+s.pnl.toLocaleString();
    if(el2) el2.textContent=s.users.toLocaleString();
  },0);
}

// ===== Traders list / cards =====
function TopTraderCard(tr){
  const price = priceForTrader(tr);
  return `
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="avatar">${initials(tr.name)}</div>
        <div>
          <a href="#/trader/${tr.id}" style="text-decoration:underline;text-underline-offset:4px">${tr.name}</a>
          <div class="text-muted" style="font-size:.9rem">${tr.market} • ${tr.country} • ${tr.years}y</div>
        </div>
      </div>
      <div class="badge">$${price}/mo</div>
    </div>
    <div class="hr"></div>
    <div class="kpis">
      <div class="box"><div class="text-muted" style="font-size:.8rem">ROI</div><div style="font-size:18px;font-weight:700">${Math.round(tr.roi*100)}%</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">WIN</div><div style="font-size:18px;font-weight:700">${Math.round(tr.win*100)}%</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">EXP</div><div style="font-size:18px;font-weight:700">${tr.years}y</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">Style</div><div style="font-size:14px;font-weight:700">${tr.style}</div></div>
    </div>
    <div class="hr"></div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span class="text-muted" style="font-size:.9rem">${t("subscribe")} individually</span>
      <button class="btn btn-primary" data-sub="${tr.id}">${t("subscribe")}</button>
    </div>
  </div>`;
}
function Traders(){
  const cards = TRADERS.map(tr=>TopTraderCard(tr)).join("");
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">${t("nav.traders")}</h2><div class="grid-cards">${cards}</div></div></section>${ProfileModal()}`;
}

// ===== Trader profile (modal) =====
function ProfileModal(){
  return `
  <div id="profile-modal" class="modal">
    <div class="modal-header">
      <strong id="p-name">Trader</strong>
      <button class="modal-close" id="p-close">Close</button>
    </div>
    <div class="hr"></div>
    <div id="p-body" class="text-muted">Loading…</div>
    <div class="hr"></div>
    <div class="modal-actions">
      <button class="btn" id="p-back">${t("back")}</button>
      <button class="btn btn-primary" id="p-sub">${t("subscribeNow")}</button>
    </div>
  </div>
  <div id="p-backdrop" class="modal-backdrop"></div>`;
}
function openProfile(id){
  const tr = TRADERS.find(x=>x.id===id); if(!tr) return;
  const price = priceForTrader(tr);
  document.getElementById("p-name").textContent = tr.name + ` — $${price}/mo`;
  document.getElementById("p-body").innerHTML = `
    <div class="kpis" style="margin-bottom:10px">
      <div class="box"><div class="text-muted" style="font-size:.8rem">ROI</div><div style="font-size:18px;font-weight:800">${Math.round(tr.roi*100)}%</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">WIN</div><div style="font-size:18px;font-weight:800">${Math.round(tr.win*100)}%</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">EXP</div><div style="font-size:18px;font-weight:800">${tr.years}y</div></div>
      <div class="box"><div class="text-muted" style="font-size:.8rem">Market</div><div style="font-size:14px;font-weight:800">${tr.market} • ${tr.country}</div></div>
    </div>
    <div class="card">
      <div style="display:flex;align-items:center;gap:10px">
        <div class="avatar">${initials(tr.name)}</div>
        <div>
          <div style="font-weight:700">${tr.name}</div>
          <div class="text-muted" style="font-size:.9rem">${tr.style}</div>
        </div>
      </div>
      <div class="hr"></div>
      <p style="margin:0">${tr.bio}</p>
    </div>`;
  document.getElementById("profile-modal").classList.add("show");
  document.getElementById("p-backdrop").classList.add("show");
  // attach actions
  document.getElementById("p-sub").onclick = ()=>{
    sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price, name: tr.name }));
    sessionStorage.setItem("step","1"); location.hash="#/wallet";
  };
}
function closeProfile(){
  document.getElementById("profile-modal")?.classList.remove("show");
  document.getElementById("p-backdrop")?.classList.remove("show");
}

// ===== Pricing / Academy / Analytics =====
function Pricing(){
  return `${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">${t("pricing")}</h2>
      <div class="grid-cards">
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div><div style="font-weight:700">${t("premium")}</div><div class="text-muted">${t("premiumDesc")}</div></div>
            <div style="font-size:28px;font-weight:800">$150</div>
          </div>
          <button class="btn btn-primary btn-wide" style="margin-top:10px" data-plan="premium">${t("subscribe")}</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div><div style="font-weight:700">${t("single")}</div><div class="text-muted">${t("singleDesc")}</div></div>
            <div style="font-size:28px;font-weight:800">$49</div>
          </div>
          <button class="btn btn-primary btn-wide" style="margin-top:10px" data-plan="single">${t("subscribe")}</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div><div style="font-weight:700">${t("trial")}</div><div class="text-muted">${t("trialDesc")}</div></div>
            <div style="font-size:28px;font-weight:800">$0</div>
          </div>
          <button class="btn btn-ghost btn-wide" style="margin-top:10px" data-plan="trial">${t("trial")}</button>
        </div>
      </div>
      <p class="text-muted" style="margin-top:8px;font-size:.85rem">USDT • TRC20</p>
    </div>
  </section>`;
}

function Academy(){
  const COURSES=[
   { title:"Master Forex (Beginner → Pro)", lessons:[
     {t:"Intro to Forex & Brokers", y:"https://www.youtube.com/watch?v=0X_5mA2r3iA"},
     {t:"Order Types, Spread & Slippage", y:"https://www.youtube.com/watch?v=V3v6w0-3M2o"},
     {t:"Risk & Position Sizing", y:"https://www.youtube.com/watch?v=QeOQu3wV0yA"},
     {t:"News vs Technicals", y:"https://www.youtube.com/watch?v=8vYz0i4zXqo"}
   ]},
   { title:"Pro Risk Management", lessons:[
     {t:"Institutional Risk Frameworks", y:"https://www.youtube.com/watch?v=cz6n8vTq6Hk"},
     {t:"Drawdown Control & Recovery", y:"https://www.youtube.com/watch?v=0eMkE3QTVvo"},
     {t:"Hedging Basics", y:"https://www.youtube.com/watch?v=qUe2tZcNNh4"}
   ]},
   { title:"Advanced Technical Analysis", lessons:[
     {t:"Market Structure & SMC", y:"https://www.youtube.com/watch?v=4b4JdG7gQy4"},
     {t:"Momentum & Trend Continuation", y:"https://www.youtube.com/watch?v=Su1c8b7QW2w"},
     {t:"Patterns & Backtesting 101", y:"https://www.youtube.com/watch?v=Z8lG2wq2Q7g"}
   ]}
  ];
  const grid = COURSES.map(c=>`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font-weight:700">${c.title}</div><div class="text-muted" style="font-size:.9rem">Lessons: ${c.lessons.length}</div></div>
        <span class="badge">Academy</span>
      </div>
      <div class="hr"></div>
      <ul style="margin:0;padding-left:18px">${c.lessons.map(l=>`<li style="margin:6px 0"><a class="btn" style="padding:.55rem .8rem" target="_blank" rel="noopener" href="${l.y}">${l.t}</a></li>`).join("")}</ul>
    </div>`).join("");
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">${t("nav.academy")}</h2><p class="text-muted">Curated lessons & real YouTube resources.</p><div class="grid-cards">${grid}</div></div></section>`;
}

function Analytics(){
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">${t("nav.analytics")}</h2><div class="grid-cards">
  <div class="card"><div style="font-weight:700">Live stats</div><p class="text-muted">See homepage for live counters (demo).</p></div>
  <div class="card"><div style="font-weight:700">Reports</div><p class="text-muted">Monthly summaries coming soon.</p></div>
  <div class="card"><div style="font-weight:700">Smart alerts</div><p class="text-muted">Actionable notifications & risk flags.</p></div>
  </div></div></section>`;
}

// ===== Wallet (Deposit) =====
function Wallet(){
  const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
  const step = Number(sessionStorage.getItem("step")||"1");
  const label = (!sel ? "—" : (sel.type==="plan" ? sel.name : (TRADERS.find(x=>x.id===sel.traderId)?.name || "Trader")));
  const amount = (!sel ? null : (sel.type==="plan" ? sel.amount : sel.price));
  const steps = (cur)=>`
    <div style="display:flex;align-items:center;gap:16px;font-size:.95rem">
      <div class="step ${cur>=1?"active":""}"><span class="dot"></span>${t("choosePlan")}</div>
      <div class="step ${cur>=2?"active":""}"><span class="dot"></span>${t("review")}</div>
      <div class="step ${cur>=3?"active":""}"><span class="dot"></span>${t("pay")}</div>
    </div>`;
  const selectHTML = `
    <div class="card">
      <div style="font-weight:700;margin-bottom:8px">${t("choosePlan")}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button class="btn" data-p="premium">${t("premium")} $150</button>
        <button class="btn" data-p="single">${t("single")} $49</button>
        <span class="text-muted" style="font-size:.9rem">Or pick from <a href="#/traders" style="text-decoration:underline;text-underline-offset:3px">${t("nav.traders")}</a>.</span>
      </div>
      ${sel? `<div style="margin-top:10px;font-size:.95rem">${t("plan")}: <b>${label}${amount?` – $${amount}/mo`:""}</b></div>` : ""}
      <div style="margin-top:12px"><button class="btn btn-primary btn-wide" data-next="2" ${!sel?"disabled":""}>${t("next")}</button></div>
    </div>`;
  const reviewHTML = `
    <div class="card">
      <div style="font-weight:700;margin-bottom:6px">${t("review")}</div>
      <div class="text-muted" style="font-size:.95rem">${t("plan")}: <b>${label}</b></div>
      <div class="text-muted" style="font-size:.95rem">${t("amount")}: <b>$${amount}</b></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
        <input class="input" id="email" type="email" placeholder="${t("email")}"/>
        <input class="input" id="pay_wallet" placeholder="${t("yourWallet")}"/>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn" data-prev="1">${t("back")}</button>
        <button class="btn btn-primary btn-wide" data-next="3" id="go-pay" ${!sel?"disabled":""}>${t("continue")}</button>
      </div>
    </div>`;
  const payHTML = `
    <div class="card">
      <div style="font-weight:700;margin-bottom:6px">${t("pay")}</div>
      <p class="text-muted" style="margin:0 0 10px">${t("payNote")}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary btn-wide" id="pay-now">${t("openInvoice")}</button>
        <button class="btn btn-ghost btn-wide" id="open-modal">${t("openModal")}</button>
      </div>
      <div id="pay-msg" style="margin-top:12px"></div>
    </div>`;
  return `${Header()}
  <section class="section">
    <div class="container" style="max-width:760px">
      <h2 style="margin:0 0 10px">${t("deposit")}</h2>
      ${steps(step)}
      <div style="display:grid;gap:14px;grid-template-columns:1fr;margin-top:12px">
        ${step===1?selectHTML: step===2?reviewHTML: payHTML}
      </div>
    </div>
  </section>
  ${PaymentModal()}`;
}

// ===== Withdraw =====
function Withdraw(){
  return `${Header()}
  <section class="section">
    <div class="container" style="max-width:760px">
      <h2 style="margin:0 0 10px">${t("withdraw")}</h2>
      <div class="card">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          <div><label class="text-muted" style="font-size:.85rem">${t("network")}</label><input class="input" value="TRC20" disabled/></div>
          <div><label class="text-muted" style="font-size:.85rem">${t("address")}</label><input class="input" id="w-address" placeholder="T..."/></div>
          <div><label class="text-muted" style="font-size:.85rem">${t("amt")}</label><input class="input" id="w-amount" type="number" min="10" max="10000"/><p class="text-muted" style="font-size:.8rem;margin:.35rem 0 0">${t("feeHint")}</p></div>
        </div>
        <div class="text-muted" id="w-fee" style="margin-top:6px;font-size:.95rem"></div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <input class="input" id="w-email" placeholder="${t("emailUpd")}"/>
          <button class="btn btn-primary" id="w-submit">${t("submit")}</button>
        </div>
        <p class="text-muted" id="w-msg" style="margin-top:8px"></p>
      </div>
    </div>
  </section>`;
}

// ===== FAQ / Contact =====
function FAQ(){
  const list=[{q:t("faq1q"),a:t("faq1a")},{q:t("faq2q"),a:t("faq2a")},{q:t("faq3q"),a:t("faq3a")}];
  const grid=list.map(x=>`<div class="card"><div style="font-weight:700">${x.q}</div><p class="text-muted" style="margin-top:6px">${x.a}</p></div>`).join("");
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">${t("faqTitle")}</h2><div class="grid-cards">${grid}</div></div></section>`;
}
function Contact(){
  return `${Header()}<section class="section"><div class="container" style="max-width:760px">
    <h2 style="margin:0 0 12px">${t("contactTitle")}</h2>
    <div class="card">
      <p class="text-muted">${t("supportNote")}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">
        <input class="input" id="c-name" placeholder="${t("name")}"/>
        <input class="input" id="c-email" placeholder="Email"/>
      </div>
      <textarea class="input" id="c-msg" rows="4" style="margin-top:10px" placeholder="${t("message")}"></textarea>
      <button class="btn btn-primary" id="c-send" style="margin-top:10px">${t("send")}</button>
      <p class="text-muted" id="c-status" style="margin-top:8px"></p>
    </div>
  </div></section>`;
}

// ===== Payment Modal & Functions =====
function PaymentModal(){
  return `
  <div id="payment-modal" class="modal">
    <div class="modal-header">
      <strong>${t("pay")}</strong>
      <button class="modal-close" id="m-close">Close</button>
    </div>
    <div class="hr"></div>
    <div id="m-body" class="text-muted">Preparing…</div>
    <div class="hr"></div>
    <div class="modal-actions">
      <button class="btn btn-primary" id="m-done">I completed the payment</button>
      <button class="btn" id="m-open">${t("openInvoice")}</button>
    </div>
  </div>
  <div id="backdrop" class="modal-backdrop"></div>`;
}

async function createInvoice(opts={}){
  try{
    const sel = JSON.parse(sessionStorage.getItem("plan")||"null"); if(!sel){ alert("Select a plan first."); return;}
    const amount = sel.type==="plan" ? sel.amount : sel.price;
    const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const email = sessionStorage.getItem("checkout_email")||"";
    const res = await fetch("/.netlify/functions/create-invoice", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ amount, orderId, description:`Subscription for ${sel.name||"Trader"}`, email })
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.message||data.error||"Payment API error");
    if(!opts.showModal && data.invoice_url){ window.open(data.invoice_url,"_blank"); }
    if(opts.showModal){ openPayModal({ amount, url:data.invoice_url }); }
    else{ const box=document.getElementById("pay-msg"); if(box){ box.innerHTML=`<span class="text-muted">Invoice created. Click <b>${t("openInvoice")}</b> to see the address & QR (USDT • TRC20).</span>`; } }
  }catch(e){ alert("Payment init failed: "+e.message); }
}
function openPayModal({amount,url}){
  document.getElementById("m-body").innerHTML = `<p>Send <b>${amount} USDT</b> on <b>TRC20</b> to the address shown on the secure invoice.<br/>After paying, press “I completed the payment”.</p>`;
  document.getElementById("m-open").setAttribute("data-url", url||"");
  document.getElementById("payment-modal").classList.add("show");
  document.getElementById("backdrop").classList.add("show");
}
function closePayModal(){ document.getElementById("payment-modal")?.classList.remove("show"); document.getElementById("backdrop")?.classList.remove("show"); }

// ===== Routes =====
const Routes = { "":Home,"home":Home,"traders":Traders,"pricing":Pricing,"academy":Academy,"analytics":Analytics,"wallet":Wallet,"withdraw":Withdraw,"faq":FAQ,"contact":Contact };

// ===== Attach actions after render =====
function attach(){
  const langBtn=document.getElementById("lang"); langBtn&&(langBtn.onclick=toggleLang);

  // subscribe from cards
  document.querySelectorAll("[data-sub]")?.forEach(el=>{
    el.onclick=()=>{ const id=el.getAttribute("data-sub"); openProfile(id); };
  });

  // modal close/back
  const pc=document.getElementById("p-close"); pc&&(pc.onclick=closeProfile);
  const pb=document.getElementById("p-back"); pb&&(pb.onclick=closeProfile);

  // choose plan
  document.querySelectorAll("[data-plan]")?.forEach(el=>{
    el.onclick=()=>{
      const p=el.getAttribute("data-plan");
      const obj=(p==="premium")?{type:"plan",name:t("premium"),amount:150}:(p==="single")?{type:"plan",name:t("single"),amount:49}:{type:"plan",name:t("trial"),amount:0};
      sessionStorage.setItem("plan", JSON.stringify(obj));
      sessionStorage.setItem("step","1"); location.hash="#/wallet";
    };
  });
  document.querySelectorAll("[data-p]")?.forEach(el=>{
    el.onclick=()=>{ const p=el.getAttribute("data-p"); const obj=(p==="premium")?{type:"plan",name:t("premium"),amount:150}:{type:"plan",name:t("single"),amount:49}; sessionStorage.setItem("plan",JSON.stringify(obj)); render(); };
  });

  // wallet wizard
  const nxt=document.querySelector("[data-next]"); const prv=document.querySelector("[data-prev]");
  nxt&&(nxt.onclick=()=>{ sessionStorage.setItem("step",nxt.getAttribute("data-next")); render(); });
  prv&&(prv.onclick=()=>{ sessionStorage.setItem("step",prv.getAttribute("data-prev")); render(); });

  const goPay=document.getElementById("go-pay");
  goPay&&(goPay.onclick=()=>{ const email=document.getElementById("email").value.trim(); const w=document.getElementById("pay_wallet").value.trim(); if(!email||!w) return alert("Please fill email & wallet."); sessionStorage.setItem("checkout_email",email); sessionStorage.setItem("checkout_wallet",w); sessionStorage.setItem("step","3"); render(); });

  const payBtn=document.getElementById("pay-now"); payBtn&&(payBtn.onclick=()=>createInvoice());
  const openModalBtn=document.getElementById("open-modal"); openModalBtn&&(openModalBtn.onclick=()=>createInvoice({showModal:true}));

  const mClose=document.getElementById("m-close"); mClose&&(mClose.onclick=closePayModal);
  const mDone=document.getElementById("m-done"); mDone&&(mDone.onclick=()=>{ document.getElementById("m-body").innerHTML=t("thanks"); });

  // withdraw UI
  const amtEl=document.getElementById("w-amount"); const feeBox=document.getElementById("w-fee");
  amtEl&&amtEl.addEventListener("input",()=>{ const amt=Number(amtEl.value||0); const fee=Math.max(1,Math.round(amt*0.01*100)/100); const total=Math.max(0,amt-fee); feeBox.innerHTML=`Fee: <b>${fee}$</b> • Will send: <b>${total}$</b>`; });
  const wSubmit=document.getElementById("w-submit");
  wSubmit&&(wSubmit.onclick=submitWithdrawal);

  // contact form
  const cSend=document.getElementById("c-send");
  cSend&&(cSend.onclick=()=>{ const n=document.getElementById("c-name").value.trim(), e=document.getElementById("c-email").value.trim(), m=document.getElementById("c-msg").value.trim(); document.getElementById("c-status").textContent = (!n||!e||!m)?"Please fill all fields.":t("sent"); });
}

// ===== Withdraw submit =====
async function submitWithdrawal(){
  try{
    const addr=document.getElementById("w-address").value.trim();
    const amt=Number(document.getElementById("w-amount").value||0);
    const email=document.getElementById("w-email").value.trim();
    const msg=document.getElementById("w-msg");
    if(!addr||addr.length<10){ msg.textContent="Enter valid address"; return; }
    if(isNaN(amt)||amt<10||amt>10000){ msg.textContent="Amount must be 10–10000$"; return; }
    try{
      const r=await fetch("/.netlify/functions/submit-withdrawal",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,network:"TRC20",address:addr,amount:amt})});
      if(!r.ok) throw new Error(await r.text());
      msg.textContent="Withdrawal request submitted. We will process it ASAP.";
    }catch{
      const list=JSON.parse(localStorage.getItem("withdrawals")||"[]"); list.push({ts:Date.now(),email,network:"TRC20",address:addr,amount:amt}); localStorage.setItem("withdrawals",JSON.stringify(list)); msg.textContent="Saved locally (preview).";
    }
    document.getElementById("w-address").value=""; document.getElementById("w-amount").value="";
  }catch(e){ document.getElementById("w-msg").textContent="Error: "+e.message; }
}
