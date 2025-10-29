// =======================================
// Router / Bootstrap
// =======================================
const app = document.getElementById("app");
window.addEventListener("hashchange", render);
document.addEventListener("DOMContentLoaded", () => {
  initLang();
  render();
});

function route(){ return (location.hash.replace(/^#\//,'') || "home"); }
function render(){ app.innerHTML = (Routes[route()]?.() || Home()); attach(); }

// =======================================
// i18n (EN default, AR optional)
// =======================================
const I18N = {
  en: {
    brand: "Broker CORP",
    proGold: "Pro • Gold",
    nav: { home:"Home", traders:"Traders", pricing:"Pricing", academy:"Academy", analytics:"Analytics", wallet:"Deposit", withdraw:"Withdraw", faq:"FAQ", contact:"Contact" },
    heroTitle1: "Trade like a",
    heroTitle2: "professional",
    heroDesc: "Verified traders • Transparent analytics • Full academy • Secure USDT (TRC20) payments.",
    exploreTraders: "Explore Traders",
    startLearning: "Start Learning",
    kpiTraders:"Traders", kpiWin:"Win Rate", kpiMarkets:"Markets", kpiRating:"Rating",
    proTraders:"Pro Traders",
    subscribe:"Subscribe",
    back:"← Back",
    pricingTitle:"Pricing",
    premium:"Premium",
    premiumDesc:"All traders + analytics",
    single:"Single Trader",
    singleDesc:"Choose one pro",
    trial:"Free Trial",
    trialDesc:"7 days",
    subscribeNow:"Subscribe Now",
    depositTitle:"Deposit",
    choosePlan:"Choose your plan",
    orPickTrader:"Or pick a trader from",
    next:"Next",
    review:"Review",
    plan:"Plan", amount:"Amount",
    email:"Email (for receipt)",
    yourWallet:"Your USDT TRC20 address",
    continue:"Continue",
    payTitle:"Pay (USDT • TRC20)",
    payNote:"Invoice opens securely in a new tab. Keep this page open.",
    openInvoice:"Open Invoice",
    openModal:"Show Payment Modal",
    paymentThanks:"✅ Thanks! Your payment is being processed. It will be handled within a few minutes.",
    withdrawTitle:"Withdraw (USDT • TRC20)",
    network:"Network", address:"Address", amt:"Amount (USDT)",
    feeHint:"Min 10$ / Max 10000$ • Fee 1% (min 1$)",
    emailUpdates:"Email for updates",
    submit:"Submit",
    savedLocal:"Saved locally (preview).",
    faqTitle:"FAQ",
    faq1q:"Do you guarantee profits?", faq1a:"No. Trading is risky; you can lose capital.",
    faq2q:"How are payments processed?", faq2a:"Via a secure crypto processor (USDT • TRC20).",
    faq3q:"How long do withdrawals take?", faq3a:"Usually 1–3 business days after review.",
    contactTitle:"Contact",
    supportNote:"Support 24/7 via email or Telegram.",
    name:"Name", message:"Message", send:"Send", sent:"Message sent (preview).",
    lang:"العربية"
  },
  ar: {
    brand: "Broker CORP",
    proGold: "احترافي • ذهبي",
    nav: { home:"الرئيسية", traders:"المتداولون", pricing:"الأسعار", academy:"الأكاديمية", analytics:"التحليلات", wallet:"الإيداع", withdraw:"السحب", faq:"الأسئلة", contact:"التواصل" },
    heroTitle1: "تداول مثل",
    heroTitle2: "محترف",
    heroDesc: "متداولون موثوقون • تحليلات شفافة • أكاديمية كاملة • دفع آمن USDT (TRC20).",
    exploreTraders: "استكشف المتداولين",
    startLearning: "ابدأ التعلم",
    kpiTraders:"المتداولون", kpiWin:"معدل الربح", kpiMarkets:"الأسواق", kpiRating:"التقييم",
    proTraders:"المتداولون المحترفون",
    subscribe:"اشتراك",
    back:"← رجوع",
    pricingTitle:"الأسعار",
    premium:"الباقة المميزة",
    premiumDesc:"كل المتداولين + تحليلات",
    single:"متداول واحد",
    singleDesc:"اختر محترفًا واحدًا",
    trial:"تجربة مجانية",
    trialDesc:"7 أيام",
    subscribeNow:"اشترك الآن",
    depositTitle:"الإيداع",
    choosePlan:"اختر خطتك",
    orPickTrader:"أو اختر من",
    next:"التالي",
    review:"مراجعة",
    plan:"الخطة", amount:"المبلغ",
    email:"البريد (للوصل)",
    yourWallet:"عنوان محفظتك USDT TRC20",
    continue:"استمرار",
    payTitle:"الدفع (USDT • TRC20)",
    payNote:"ستُفتح الفاتورة في تبويب آمن. أبقِ هذه الصفحة مفتوحة.",
    openInvoice:"فتح الفاتورة",
    openModal:"عرض نافذة الدفع",
    paymentThanks:"✅ شكرًا لك! يتم الآن معالجة دفعتك، وسيتم تأكيدها خلال دقائق.",
    withdrawTitle:"السحب (USDT • TRC20)",
    network:"الشبكة", address:"العنوان", amt:"القيمة (USDT)",
    feeHint:"الحد الأدنى 10$ / الحد الأعلى 10000$ • عمولة 1% (بحد أدنى 1$)",
    emailUpdates:"البريد لتحديث الحالة",
    submit:"إرسال",
    savedLocal:"حُفظ محليًا (عرض تجريبي).",
    faqTitle:"الأسئلة الشائعة",
    faq1q:"هل تضمنون الأرباح؟", faq1a:"لا. التداول مخاطرة وقد تخسر رأس المال.",
    faq2q:"كيف تتم معالجة المدفوعات؟", faq2a:"من خلال معالج تشفير آمن (USDT • TRC20).",
    faq3q:"كم يستغرق السحب؟", faq3a:"عادة 1–3 أيام عمل بعد المراجعة.",
    contactTitle:"التواصل",
    supportNote:"دعم 24/7 عبر البريد أو التليجرام.",
    name:"الاسم", message:"الرسالة", send:"إرسال", sent:"تم الإرسال (عرض تجريبي).",
    lang:"EN"
  }
};

function initLang(){
  const saved = localStorage.getItem("lang") || "en";
  document.documentElement.setAttribute("lang", saved);
  document.documentElement.setAttribute("dir", saved==="ar" ? "rtl" : "ltr");
}
function t(key){
  const lang = document.documentElement.getAttribute("lang") || "en";
  const obj = I18N[lang];
  return key.split(".").reduce((o,k)=>o?.[k], obj) ?? key;
}
function toggleLang(){
  const cur = document.documentElement.getAttribute("lang") || "en";
  const next = cur==="en" ? "ar" : "en";
  localStorage.setItem("lang", next);
  document.documentElement.setAttribute("lang", next);
  document.documentElement.setAttribute("dir", next==="ar" ? "rtl" : "ltr");
  render();
}

// =======================================
// Traders dataset: generate 64 traders (avatars by initials)
// =======================================
const seedNames = [
  "Michael Anderson","Fatima Al-Sayed","Kenji Nakamura","Carlos Mendez","Aisha Rahman","Omar Haddad",
  "Noah Peterson","Ava Thompson","Liam Walker","Sophia Martinez","Youssef Zidan","Mei Lin","Ibrahim Saleh",
  "Hiro Tanaka","Elena Petrova","Lucas Almeida","Diego Alvarez","Sara Benali","Adam Cohen","Emily Clark",
  "Rami Khaled","Yara Mansour","Anton Ivanov","Marta Rossi","Jonas Weber","Isabella Costa","Ahmed Noor",
  "Hassan Jafari","Nadia Karim","Oliver White","Jacob Miller"
];
const markets = ["Forex","Crypto","Gold","Indices","Stocks","Oil"];
const countries= ["US","UK","AE","SA","QA","KW","EG","MA","TR","DE","FR","ES","IT","JP","SG","CA","AU","BR","HK"];
function genTraders(n=64){
  const out=[];
  for(let i=0;i<n;i++){
    const name = seedNames[i%seedNames.length] + (i>=seedNames.length?` ${String.fromCharCode(65+(i%6))}`:"");
    const market = markets[i%markets.length];
    const country = countries[(i*7)%countries.length];
    const years = 3 + (i%9);
    const roi = 0.24 + ((i*13)%80)/200; // 24%..64%
    const win = 0.72 + ((i*17)%20)/100; // 72%..92%
    const style = ["Swing • SMC","Breakouts • Tight risk","Scalping • Volume","Trend • Pullbacks","Mean Reversion","Event-driven"][i%6];
    const id = "t" + String(i+1).padStart(3,"0");
    out.push({id,name,market,country,years,roi,win,style});
  }
  return out;
}
const TRADERS = genTraders(64);
function priceForTrader(t){
  const score = (t.roi*100)*0.6 + (t.win*100)*0.4;
  return Math.min(50, Math.max(30, Math.round(score/4)));
}
function initials(name){
  return (name.split(" ").map(s=>s[0]).slice(0,2).join("") || "?").toUpperCase();
}

// =======================================
// Header
// =======================================
function Header(){
  return `
  <header>
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
      <div class="logo">
        <div class="logo-mark"><i></i></div>
        <strong>${t("brand")}</strong>
        <span class="badge">${t("proGold")}</span>
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

// =======================================
// Pages
// =======================================
function Home(){
  return `
  ${Header()}
  <section class="section">
    <div class="container hero card">
      <div>
        <h1 style="font-size:34px;line-height:1.15;margin:0 0 10px">
          ${t("heroTitle1")} <span style="color:var(--gold)">${t("heroTitle2")}</span>
        </h1>
        <p class="text-muted">${t("heroDesc")}</p>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-primary btn-wide" href="#/traders">${t("exploreTraders")}</a>
          <a class="btn btn-ghost btn-wide" href="#/academy">${t("startLearning")}</a>
        </div>
      </div>
      <div class="card">
        <div class="kpis">
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiTraders")}</div><div style="font-size:28px;font-weight:700">${TRADERS.length}</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiWin")}</div><div style="font-size:28px;font-weight:700">76–92%</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiMarkets")}</div><div style="font-size:18px;font-weight:700">Forex/Crypto/Gold/Indices</div></div>
          <div class="box"><div class="text-muted" style="font-size:.85rem">${t("kpiRating")}</div><div style="font-size:28px;font-weight:700">4.6–4.9★</div></div>
        </div>
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
  const cards = TRADERS.map(tr=>{
    const price = priceForTrader(tr);
    return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="avatar sm">${initials(tr.name)}</div>
            <div>
              <a href="#/trader/${tr.id}" style="text-decoration:underline;text-underline-offset:4px">${tr.name}</a>
              <div class="text-muted" style="font-size:.9rem">${tr.market} • ${tr.country} • ${tr.years}y</div>
            </div>
          </div>
          <div class="badge">$${price}/mo</div>
        </div>
        <div class="kpis" style="margin-top:10px">
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
  }).join("");
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">${t("proTraders")}</h2>
      <div class="grid-cards">${cards}</div>
    </div>
  </section>`;
}

function Trader(){
  const id = (location.hash.split("/")[2]||"").trim();
  const tr = TRADERS.find(x=>x.id===id);
  if(!tr) return `${Header()}<section class="section"><div class="container">Not found</div></section>`;
  const price = priceForTrader(tr);
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <a href="#/traders" class="badge">${t("back")}</a>
      <div class="card" style="margin-top:12px">
        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center">
          <div style="display:flex;align-items:center;gap:12px">
            <div class="avatar">${initials(tr.name)}</div>
            <div>
              <h2 style="margin:0">${tr.name}</h2>
              <div class="text-muted" style="font-size:.95rem;margin-top:4px">${tr.market} • ${tr.country} • ${tr.years}y</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span class="badge">ROI ${Math.round(tr.roi*100)}%</span>
            <span class="badge">WIN ${Math.round(tr.win*100)}%</span>
            <span class="badge">$${price}/mo</span>
          </div>
        </div>
        <div class="hr"></div>
        <p class="text-muted" style="margin:0 0 10px">${tr.style}</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-primary btn-wide" data-sub="${tr.id}">${t("subscribeNow")}</button>
          <a class="btn btn-ghost btn-wide" href="#/wallet">${t("nav.wallet")}</a>
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
      <h2 style="margin:0 0 12px">${t("pricingTitle")}</h2>
      <div class="grid-cards">
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">${t("premium")}</div>
              <div class="text-muted">${t("premiumDesc")}</div>
            </div>
            <div style="font-size:28px;font-weight:800">$150</div>
          </div>
          <button class="btn btn-primary btn-wide" style="margin-top:10px" data-plan="premium">${t("subscribe")}</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">${t("single")}</div>
              <div class="text-muted">${t("singleDesc")}</div>
            </div>
            <div style="font-size:28px;font-weight:800">$49</div>
          </div>
          <button class="btn btn-primary btn-wide" style="margin-top:10px" data-plan="single">${t("subscribe")}</button>
        </div>
        <div class="card">
          <div style="display:flex;justify-content:space-between">
            <div>
              <div style="font-weight:700">${t("trial")}</div>
              <div class="text-muted">${t("trialDesc")}</div>
            </div>
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
  ];
  const grid = COURSES.map(c=>`
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${c.title}</div>
          <div class="text-muted" style="font-size:.9rem">Lessons: ${c.lessons.length}</div>
        </div>
        <span class="badge">Academy</span>
      </div>
      <div class="hr"></div>
      <ul style="margin:0;padding-left:18px">
        ${c.lessons.map(l=>`<li style="margin:6px 0">
          <a class="btn" style="padding:.55rem .8rem" href="${l.y}" target="_blank" rel="noopener">${l.t}</a>
        </li>`).join("")}
      </ul>
    </div>`).join("");
  return `
  ${Header()}
  <section class="section">
    <div class="container">
      <h2 style="margin:0 0 12px">${t("nav.academy")}</h2>
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
      <h2 style="margin:0 0 12px">${t("nav.analytics")}</h2>
      <div class="grid-cards">
        <div class="card"><div style="font-weight:700;margin-bottom:6px">Live stats</div><p class="text-muted">Real-time performance (demo).</p></div>
        <div class="card"><div style="font-weight:700;margin-bottom:6px">Performance reports</div><p class="text-muted">Monthly summaries (coming soon).</p></div>
        <div class="card"><div style="font-weight:700;margin-bottom:6px">Smart alerts</div><p class="text-muted">Actionable alerts & recommendations.</p></div>
      </div>
    </div>
  </section>`;
}

// ============ Deposit (Wallet) ============
function Wallet(){
  const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
  const step = Number(sessionStorage.getItem("step")||"1");
  const label = (!sel ? "—" : (sel.type==="plan" ? sel.name : (TRADERS.find(x=>x.id===sel.traderId)?.name || "Trader")));
  const amount = (!sel ? null : (sel.type==="plan" ? sel.amount : sel.price));

  const steps = (cur)=>`
    <div style="display:flex;align-items:center;gap:16px;font-size:.95rem">
      <div class="step ${cur>=1?"active":""}"><span class="dot"></span>${t("choosePlan")}</div>
      <div class="step ${cur>=2?"active":""}"><span class="dot"></span>${t("review")}</div>
      <div class="step ${cur>=3?"active":""}"><span class="dot"></span>${t("payTitle")}</div>
    </div>`;

  const selectHTML = `
    <div class="card">
      <div style="font-weight:700;margin-bottom:8px">${t("choosePlan")}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button class="btn" data-p="premium">${t("premium")} $150</button>
        <button class="btn" data-p="single">${t("single")} $49</button>
        <span class="text-muted" style="font-size:.9rem">${t("orPickTrader")} <a href="#/traders" style="text-decoration:underline;text-underline-offset:3px">${t("nav.traders")}</a>.</span>
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
      <div style="font-weight:700;margin-bottom:6px">${t("payTitle")}</div>
      <p class="text-muted" style="margin:0 0 10px">${t("payNote")}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-primary btn-wide" id="pay-now">${t("openInvoice")}</button>
        <button class="btn btn-ghost btn-wide" id="open-modal">${t("openModal")}</button>
      </div>
      <div id="pay-msg" style="margin-top:12px"></div>
    </div>`;

  return `
  ${Header()}
  <section class="section">
    <div class="container" style="max-width:760px">
      <h2 style="margin:0 0 10px">${t("depositTitle")}</h2>
      ${steps(step)}
      <div style="display:grid;gap:14px;grid-template-columns:1fr;margin-top:12px">
        ${step===1?selectHTML: step===2?reviewHTML: payHTML}
      </div>
    </div>
  </section>
  ${Modal()}`;
}

function Withdraw(){
  return `
  ${Header()}
  <section class="section">
    <div class="container" style="max-width:760px">
      <h2 style="margin:0 0 10px">${t("withdrawTitle")}</h2>
      <div class="card">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
          <div><label class="text-muted" style="font-size:.85rem">${t("network")}</label><input class="input" value="TRC20" disabled/></div>
          <div><label class="text-muted" style="font-size:.85rem">${t("address")}</label><input class="input" id="w-address" placeholder="T..."/></div>
          <div><label class="text-muted" style="font-size:.85rem">${t("amt")}</label><input class="input" id="w-amount" type="number" min="10" max="10000"/><p class="text-muted" style="font-size:.8rem;margin:.35rem 0 0">${t("feeHint")}</p></div>
        </div>
        <div class="text-muted" id="w-fee" style="margin-top:6px;font-size:.95rem"></div>
        <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
          <input class="input" id="w-email" placeholder="${t("emailUpdates")}"/>
          <button class="btn btn-primary" id="w-submit">${t("submit")}</button>
        </div>
        <p class="text-muted" id="w-msg" style="margin-top:8px"></p>
      </div>
    </div>
  </section>`;
}

function FAQ(){
  const list = [
    {q:t("faq1q"), a:t("faq1a")},
    {q:t("faq2q"), a:t("faq2a")},
    {q:t("faq3q"), a:t("faq3a")}
  ];
  const grid = list.map(x=>`<div class="card"><div style="font-weight:700">${x.q}</div><p class="text-muted" style="margin-top:6px">${x.a}</p></div>`).join("");
  return `${Header()}<section class="section"><div class="container"><h2 style="margin:0 0 12px">${t("faqTitle")}</h2><div class="grid-cards">${grid}</div></div></section>`;
}

function Contact(){
  return `
  ${Header()}
  <section class="section">
    <div class="container" style="max-width:760px">
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
    </div>
  </section>`;
}

// =======================================
// Modal (internal payment)
/// ======================================
function Modal(){
  return `
  <div id="payment-modal" class="modal">
    <div class="modal-header">
      <strong>${t("payTitle")}</strong>
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

// =======================================
// Routes map
// =======================================
const Routes = {
  "": Home, "home": Home,
  "traders": Traders, "trader": Trader,
  "pricing": Pricing,
  "academy": Academy,
  "analytics": Analytics,
  "wallet": Wallet,
  "withdraw": Withdraw,
  "faq": FAQ,
  "contact": Contact,
};

// =======================================
// Attach events
// =======================================
function attach(){
  // Lang toggle
  const langBtn = document.getElementById("lang");
  langBtn && (langBtn.onclick = toggleLang);

  // Subscribe trader
  document.querySelectorAll("[data-sub]")?.forEach(el=>{
    el.onclick = ()=>{
      const id = el.getAttribute("data-sub");
      const tr = TRADERS.find(x=>x.id===id); if(!tr) return;
      sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price: priceForTrader(tr), name: tr.name }));
      sessionStorage.setItem("step","1");
      location.hash = "#/wallet";
    };
  });
  // Subscribe plan
  document.querySelectorAll("[data-plan]")?.forEach(el=>{
    el.onclick = ()=>{
      const p = el.getAttribute("data-plan");
      const obj = (p==="premium") ? {type:"plan", name:t("premium"), amount:150}
               : (p==="single")  ? {type:"plan", name:t("single"), amount:49}
               : {type:"plan", name:t("trial"), amount:0};
      sessionStorage.setItem("plan", JSON.stringify(obj));
      sessionStorage.setItem("step","1");
      location.hash = "#/wallet";
    };
  });

  // Wallet stepper
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

  // Pay buttons
  const payBtn = document.getElementById("pay-now");
  payBtn && (payBtn.onclick = createInvoice);  // opens new tab
  const openModalBtn = document.getElementById("open-modal");
  openModalBtn && (openModalBtn.onclick = async()=>{ await createInvoice({showModal:true}); });

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

  // Contact
  const cSend = document.getElementById("c-send");
  cSend && (cSend.onclick = ()=>{
    const name = document.getElementById("c-name").value.trim();
    const email= document.getElementById("c-email").value.trim();
    const m    = document.getElementById("c-msg").value.trim();
    document.getElementById("c-status").textContent = (!name||!email||!m) ? "Please fill all fields." : t("sent");
  });

  // Modal controls
  const mClose = document.getElementById("m-close");
  mClose && (mClose.onclick = closeModal);
  const mDone = document.getElementById("m-done");
  mDone && (mDone.onclick = ()=>{
    document.getElementById("m-body").innerHTML = t("paymentThanks");
  });
  const mOpen = document.getElementById("m-open");
  mOpen && (mOpen.onclick = ()=>{
    const url = mOpen.getAttribute("data-url");
    if(url) window.open(url, "_blank");
  });
}

// =======================================
// Payments (NOWPayments)
// =======================================
async function createInvoice(opts={}){
  try{
    const sel = JSON.parse(sessionStorage.getItem("plan")||"null");
    if(!sel){ alert("Select a plan first."); return;}
    const amount = sel.type==="plan" ? sel.amount : sel.price;
    const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    const email = sessionStorage.getItem("checkout_email")||"";

    const res = await fetch("/.netlify/functions/create-invoice", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        amount, orderId,
        description: `Subscription for ${sel.name || (sel.type==="plan"? sel.name : "Trader")}`,
        email
      })
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || data.error || "Payment API error");

    // 1) فتح الفاتورة رسميًا
    if(!opts.showModal && data.invoice_url){
      window.open(data.invoice_url, "_blank");
    }

    // 2) مودال داخلي أنيق
    if(opts.showModal){
      openModal({ amount, url: data.invoice_url });
    }else{
      const payBox = document.getElementById("pay-msg");
      if(payBox){
        payBox.innerHTML = `<span class="text-muted">Invoice created. Click <b>${t("openInvoice")}</b> to see the USDT (TRC20) address and QR code.</span>`;
      }
    }
  }catch(err){
    alert("Payment init failed: " + err.message);
  }
}
function openModal({amount,url}){
  const modal = document.getElementById("payment-modal");
  const backdrop = document.getElementById("backdrop");
  const body = document.getElementById("m-body");
  const mOpen = document.getElementById("m-open");
  body.innerHTML = `
    <div class="text-muted">
      <p>Send <b>${amount} USDT</b> on <b>TRC20</b> to the address shown on the secure invoice.</p>
      <p class="text-muted">Tap "${t("openInvoice")}" to get the address & QR. After paying, press "I completed the payment".</p>
    </div>`;
  mOpen.setAttribute("data-url", url || "");
  modal.classList.add("show");
  backdrop.classList.add("show");
}
function closeModal(){
  document.getElementById("payment-modal")?.classList.remove("show");
  document.getElementById("backdrop")?.classList.remove("show");
}

// =======================================
// Withdraw submit (function or local)
// =======================================
async function submitWithdrawal(){
  try{
    const addr = document.getElementById("w-address").value.trim();
    const amt  = Number(document.getElementById("w-amount").value||0);
    const email= document.getElementById("w-email").value.trim();
    const msg  = document.getElementById("w-msg");
    if(!addr || addr.length<10){ msg.textContent="Enter valid address"; return; }
    if(isNaN(amt) || amt<10 || amt>10000){ msg.textContent="Amount must be 10–10000$"; return; }

    try{
      const r = await fetch("/.netlify/functions/submit-withdrawal", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, network:"TRC20", address:addr, amount:amt })
      });
      if(!r.ok) throw new Error(await r.text());
      msg.textContent = "Withdrawal request submitted. We will process it ASAP.";
    }catch{
      const list = JSON.parse(localStorage.getItem("withdrawals")||"[]");
      list.push({ ts:Date.now(), email, network:"TRC20", address:addr, amount:amt });
      localStorage.setItem("withdrawals", JSON.stringify(list));
      msg.textContent = t("savedLocal");
    }

    document.getElementById("w-address").value="";
    document.getElementById("w-amount").value="";
  }catch(e){
    document.getElementById("w-msg").textContent = "Error: " + e.message;
  }
}
