/* =======================
   Broker CORP – app.js (full)
   ======================= */

const app = document.getElementById("app");

/* ---------- i18n ---------- */
let LANG = localStorage.getItem("LANG") || "en";
const I18N = {
  en: {
    nav_home: "Home",
    nav_traders: "Traders",
    nav_pricing: "Pricing",
    nav_academy: "Academy",
    nav_analytics: "Analytics",
    nav_wallet: "Wallet",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    toggle_lang: "العربية",

    hero_h1_a: "Trade like a",
    hero_h1_b: "professional",
    hero_sub: "Verified traders • Transparent analytics • Full academy • Secure USDT (TRC20) payments.",
    cta_explore: "Explore Traders",
    cta_learn: "Start Learning",

    stats_title: "Platform Live Stats",
    stats_traders: "Pro Traders",
    stats_profit: "Total Profit",
    stats_active: "Active Users",

    how_title: "How it works",
    how_1_t: "Analyze",
    how_1_d: "Explore verified performance & risk metrics.",
    how_2_t: "Deposit",
    how_2_d: "Fund using USDT (TRC20) for instant access.",
    how_3_t: "Trade",
    how_3_d: "Copy pros, receive insights, and track results.",

    pricing: "Pricing",
    academy: "Trading Academy",
    wallet: "Wallet",
    back: "Back",
    subscribeNow: "Subscribe Now",

    wallet_title: "Secure Checkout",
    wallet_plan: "Selection",
    wallet_amount: "Amount",
    wallet_currency: "Currency",
    wallet_email: "Email (for receipt)",
    wallet_method: "Payment Method",
    wallet_method_val: "Crypto — USDT (TRC20)",
    wallet_pay: "Pay Now",
    wallet_msg_after: "Your payment is being processed securely. You will receive confirmation shortly.",
    wallet_back_home: "← Back to Home",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_traders: "المتداولون",
    nav_pricing: "الأسعار",
    nav_academy: "الأكاديمية",
    nav_analytics: "التحليلات",
    nav_wallet: "المحفظة",
    nav_faq: "الأسئلة الشائعة",
    nav_contact: "التواصل",
    toggle_lang: "EN",

    hero_h1_a: "تداول مثل",
    hero_h1_b: "محترف",
    hero_sub: "متداولون موثوقون • شفافية في التحليل • أكاديمية كاملة • دفع آمن USDT (TRC20).",
    cta_explore: "استكشاف المتداولين",
    cta_learn: "ابدأ التعلم",

    stats_title: "إحصائيات المنصة الحية",
    stats_traders: "متداولون محترفون",
    stats_profit: "إجمالي الأرباح",
    stats_active: "مستخدمون نشطون",

    how_title: "كيف تبدأ",
    how_1_t: "تحليل",
    how_1_d: "استكشف الأداء الموثق ومقاييس المخاطر.",
    how_2_t: "إيداع",
    how_2_d: "موّل باستخدام USDT (TRC20) للوصول الفوري.",
    how_3_t: "تداول",
    how_3_d: "انسخ المحترفين وتابع النتائج لحظيًا.",

    pricing: "الأسعار",
    academy: "الأكاديمية",
    wallet: "المحفظة",
    back: "رجوع",
    subscribeNow: "اشترك الآن",

    wallet_title: "دفع آمن",
    wallet_plan: "الاختيار",
    wallet_amount: "المبلغ",
    wallet_currency: "العملة",
    wallet_email: "البريد (لإيصال الدفع)",
    wallet_method: "طريقة الدفع",
    wallet_method_val: "عملة رقمية — USDT (TRC20)",
    wallet_pay: "ادفع الآن",
    wallet_msg_after: "يتم الآن معالجة دفعتك بأمان. ستصلك رسالة تأكيد قريبًا.",
    wallet_back_home: "← رجوع إلى الرئيسية",
  },
};
const t = (k) => I18N[LANG][k] || k;

/* ---------- helpers ---------- */
function $(s){ return document.querySelector(s); }
function initials(n){ return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase(); }
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

/* أسعار المتداولين 30–55 حسب الأداء */
function priceForTrader(tr){
  // win: 0.70–1.00, roi: 0.20–0.80 (تقريبًا)
  const winScore = (tr.win - 0.70) / 0.30;     // 0..1
  const roiScore = (tr.roi - 0.20) / 0.60;     // 0..1
  let price = 30 + Math.round(25 * (0.65*winScore + 0.35*roiScore)); // 30..55
  return clamp(price, 30, 55);
}

/* ---------- data ---------- */
const MARKETS = ["Forex","Crypto","Gold","Indices","Stocks","Oil"];
const COUNTRIES = ["US","AE","DE","UK","QA","SG","AU","FR","EG","SA"];
const STYLES = ["Scalping","Swing","Breakouts","Trend","Event-driven","Volume","Tight risk","Pullbacks","Smart Money","Reversal"];
const NAMES = [
  "Michael Anderson","Fatima Al-Sayed","Kenji Nakamura","Carlos Mendez","Aisha Rahman",
  "Omar Haddad","Noah Peterson","Ava Thompson","Liam Walker","Sophia Martinez",
  "Yousef Zidan","Mei Lin","Ibrahim Saleh","Hiro Tanaka","Elena Petrova","Lucas Almeida",
  "Diego Alvarez","Sara Benali","Adam Cohen","Emily Clark","Nour Hassan","Jon Park","Layla Omar",
  "Alex Rivera","Hassan Al-Fahad","Olivia Reed","Mohammed Noor","Santiago Lopez","Jacob Kim",
  "Reem Khalid","Marta Ivanova","Ali Shah","Zoe Patel","Henry White","Farah Mansour","Rami Issa",
  "Isabelle Roy","Tariq Salem","Victor Wong","Selma El-Amine","Nadia Said","Tomás Pinto",
  "Jinwoo Lee","Aya Mahmoud","Daniel Rossi","Omar Said","Layth Al-Mutairi","Anita Gomez",
  "Samir Badr","Elif Kaya","Yara Tarek","Fadi Al-Karim","Julia Novak","Hassan Ali","Lina Yousef",
  "Yuki Matsuda","David Brown","Karim Zaki","Laila Hassan","Rafael Cruz","Ahmad Saleh",
  "Mohamed Rashid","Salma Ibrahim","Huda Noor","Abdullah Kareem"
];

const TRADERS = Array.from({length:64}).map((_,i)=>({
  id:i+1,
  name:NAMES[i],
  roi:Math.random()*0.6+0.2,
  win:Math.random()*0.3+0.7,
  years:Math.floor(Math.random()*10)+2,
  market:MARKETS[i%MARKETS.length],
  country:COUNTRIES[i%COUNTRIES.length],
  style:STYLES[i%STYLES.length],
  bio:`${NAMES[i]} is a professional ${MARKETS[i%MARKETS.length]} trader with ${Math.floor(Math.random()*10)+2} years of experience, specialized in ${STYLES[i%STYLES.length].toLowerCase()} strategies and risk management.`
}));

/* ---------- assets (Unsplash) ---------- */
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  how1: "https://images.unsplash.com/photo-1559696780-2c9a9c5a1a7b?q=80&w=1600&auto=format&fit=crop", // candlesticks
  how2: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600&auto=format&fit=crop", // phone trading
  how3: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1600&auto=format&fit=crop", // monitors
  chart: "https://images.unsplash.com/photo-1640340434883-8e6e8bbaf4fd?q=80&w=1600&auto=format&fit=crop",
};

/* ---------- logo + navbar ---------- */
function LogoSVG(){
  return `
<svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle">
  <circle cx="32" cy="32" r="30" fill="url(#g)" stroke="#5a4a15" stroke-width="2"/>
  <path d="M18 36l8-16 8 10 12-6-8 16-8-10-12 6z" fill="#0e0f13" opacity=".9"/>
  <defs>
    <linearGradient id="g" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
      <stop stop-color="#f9d567"/><stop offset="1" stop-color="#caa94f"/>
    </linearGradient>
  </defs>
</svg>`;
}

function Navbar(){
  const items = [
    {k:"nav_home", p:"home"},
    {k:"nav_traders", p:"traders"},
    {k:"nav_pricing", p:"pricing"},
    {k:"nav_academy", p:"academy"},
    {k:"nav_analytics", p:"analytics"},
    {k:"nav_wallet", p:"wallet"},
    {k:"nav_faq", p:"faq"},
    {k:"nav_contact", p:"contact"},
  ];
  return `
  <div class="container" style="position:sticky;top:0;z-index:50;background:linear-gradient(180deg,#0a0b10 80%,transparent)">
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800">
        ${LogoSVG()} <span style="color:var(--gold)">Broker CORP</span>
      </div>
      <nav style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">
        ${items.map(i=>`<button class="btn" onclick="navigate('${i.p}')">${t(i.k)}</button>`).join("")}
        <button class="btn" style="padding:8px 10px" onclick="toggleLang()">${t("toggle_lang")}</button>
      </nav>
    </div>
  </div>`;
}
function toggleLang(){ LANG = LANG==="en"?"ar":"en"; localStorage.setItem("LANG",LANG); render(); }

/* ---------- HOME ---------- */
function Hero(){
  return `
  <section class="container">
    <div class="card" style="
      padding:40px 24px;
      background:linear-gradient(180deg,#0f131a,rgba(16,20,27,.9)),
                 url('${IMAGES.hero}') center/cover no-repeat;
      ">
      <h1 style="font-size:2.4rem;font-weight:900;margin:0 0 10px">
        ${t("hero_h1_a")} <span style="color:var(--gold)">${t("hero_h1_b")}</span>
      </h1>
      <p class="text-muted" style="max-width:850px">${t("hero_sub")}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
        <button class="btn btn-primary" onclick="navigate('traders')">${t("cta_explore")}</button>
        <button class="btn" onclick="navigate('academy')">${t("cta_learn")}</button>
      </div>

      <div class="card" style="margin-top:22px">
        <div class="text-muted" style="margin-bottom:8px">${t("stats_title")}</div>
        <div class="grid-cards" style="gap:10px;text-align:center">
          <div class="card"><strong class="counter" data-to="64" style="font-size:1.6rem;color:var(--gold)">0</strong><div class="text-muted">${t("stats_traders")}</div></div>
          <div class="card"><strong class="counter" data-to="${Math.floor(Math.random()*40000+60000)}" style="font-size:1.6rem;color:var(--gold)">0</strong><div class="text-muted">${t("stats_profit")}</div></div>
          <div class="card"><strong class="counter" data-to="${Math.floor(Math.random()*1200+800)}" style="font-size:1.6rem;color:var(--gold)">0</strong><div class="text-muted">${t("stats_active")}</div></div>
        </div>
      </div>
    </div>
  </section>`;
}

function HowItWorks(){
  const steps = [
    {t:t("how_1_t"), d:t("how_1_d"), img:IMAGES.how1},
    {t:t("how_2_t"), d:t("how_2_d"), img:IMAGES.how2},
    {t:t("how_3_t"), d:t("how_3_d"), img:IMAGES.how3},
  ];
  return `
  <section class="container reveal">
    <h2 style="margin:10px 0">${t("how_title")}</h2>
    <div class="grid-cards">
      ${steps.map(s => `
        <div class="card" style="overflow:hidden;position:relative">
          <img src="${s.img}" alt="" style="width:100%;height:160px;object-fit:cover;border-radius:10px;filter:contrast(1.05) saturate(1.05)">
          <div class="hr"></div>
          <div style="font-weight:700">${s.t}</div>
          <div class="text-muted">${s.d}</div>
          <div style="position:absolute;inset:auto -30% -30% auto;width:200px;height:200px;background:radial-gradient(ellipse at center, rgba(249,213,103,.18), transparent 60%);pointer-events:none"></div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function Home(){
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
  return `
    ${Navbar()}
    ${Hero()}
    ${HowItWorks()}
  `;
}

/* ---------- Traders / Cards ---------- */
function CardTrader(tr){
  return `
  <div class="card reveal">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div class="avatar">${initials(tr.name)}</div>
        <div>
          <div style="font-weight:600">${tr.name}</div>
          <div class="text-muted" style="font-size:.9rem">${tr.market} • ${tr.country}</div>
        </div>
      </div>
      <div class="text-muted" style="font-size:.85rem">$${priceForTrader(tr)}/mo</div>
    </div>
    <div class="hr"></div>
    <div style="display:flex;justify-content:space-between;font-size:.9rem">
      <div>ROI <b>${Math.round(tr.roi*100)}%</b></div>
      <div>WIN <b>${Math.round(tr.win*100)}%</b></div>
      <div>EXP <b>${tr.years}y</b></div>
    </div>
    <div class="hr"></div>
    <button class="btn btn-primary" style="width:100%" onclick="openProfile(${tr.id})">View Profile</button>
  </div>`;
}
function Traders(){
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
  return `
  ${Navbar()}
  <div class="container">
    <h2>Professional Traders</h2>
    <div class="grid-cards">
      ${TRADERS.map(CardTrader).join("")}
    </div>
  </div>`;
}

/* ---------- Pricing ---------- */
function Pricing(){
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
  const plans = [
    {id:"premium",name:"Premium",price:150,desc:"All traders + analytics"},
    {id:"single",name:"Single Trader",price:49,desc:"Choose one pro"},
    {id:"trial",name:"Free Trial",price:0,desc:"7 days"}
  ];
  return `
  ${Navbar()}
  <div class="container">
    <h2>${t("pricing")}</h2>
    <div class="grid-cards">
      ${plans.map(p=>`
        <div class="card reveal">
          <h3>${p.name}</h3>
          <p class="text-muted">${p.desc}</p>
          <div style="font-size:1.6rem;font-weight:700;margin:10px 0">$${p.price}</div>
          <button class="btn btn-primary" onclick="goPay('${p.id}',${p.price})">Subscribe</button>
        </div>`).join("")}
    </div>
    <p class="text-muted" style="margin-top:10px">USDT • TRC20</p>
  </div>`;
}

/* ---------- Academy (مختصر) ---------- */
function Academy(){
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
  return `
  ${Navbar()}
  <div class="container">
    <h2>${t("academy")}</h2>
    <p class="text-muted">Free lessons from experts to level up your trading skills:</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=Gc2en3nHxA4" target="_blank">Understanding Market Trends</a></li>
      <li><a href="https://www.youtube.com/watch?v=8cH6x3yixK0" target="_blank">How to Read Candlestick Charts</a></li>
      <li><a href="https://www.youtube.com/watch?v=E4mEJdDpL8I" target="_blank">Risk Management in Forex</a></li>
      <li><a href="https://www.youtube.com/watch?v=3I_OeujN6k4" target="_blank">Crypto Trading for Beginners</a></li>
    </ul>
  </div>`;
}

/* ---------- Wallet (Full Page Checkout) ---------- */
function Wallet(){
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
  const sel = sessionStorage.getItem("plan");
  let selection = sel ? JSON.parse(sel) : null;

  // إذا دخل مباشرة بدون اختيار، نخلي اختيار افتراضي
  if(!selection){
    selection = { type:"plan", id:"premium", price:150, name:"Premium" };
    sessionStorage.setItem("plan", JSON.stringify(selection));
  }

  const priceUSD = selection.price ?? 49;
  const amountUSDT = priceUSD; // 1 USDT ~ 1 USD

  return `
  ${Navbar()}
  <div style="min-height:calc(100vh - 96px);display:grid;place-items:center;background:linear-gradient(180deg,#0b0d11,#0a0b10)">
    <div class="card" style="width:min(720px,92%);padding:22px;border:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        ${LogoSVG()} <div style="font-weight:800;color:var(--gold)">Broker CORP</div>
      </div>
      <h2 style="margin:0 0 10px">${t("wallet_title")}</h2>

      <div class="grid-cards" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px">
        <div class="card" style="margin:0">
          <div class="text-muted" style="font-size:.85rem">${t("wallet_plan")}</div>
          <div style="font-weight:700">${selection.name || "Plan"}</div>
          ${selection.type==="trader" ? `<div class="text-muted" style="font-size:.9rem">Trader ID: ${selection.traderId}</div>` : ""}
        </div>

        <div class="card" style="margin:0">
          <div class="text-muted" style="font-size:.85rem">${t("wallet_amount")}</div>
          <div style="font-weight:700">$${priceUSD} <span class="text-muted">≈ ${amountUSDT} USDT</span></div>
          <div class="text-muted" style="font-size:.85rem">${t("wallet_currency")}: USDT (TRC20)</div>
        </div>

        <div class="card" style="margin:0">
          <div class="text-muted" style="font-size:.85rem">${t("wallet_method")}</div>
          <div style="font-weight:700">${t("wallet_method_val")}</div>
        </div>
      </div>

      <div class="hr"></div>

      <label class="text-muted" style="font-size:.9rem" for="checkout-email">${t("wallet_email")}</label>
      <input id="checkout-email" type="email" placeholder="you@example.com" style="
        width:100%;margin-top:6px;margin-bottom:14px;background:#10141b;border:1px solid var(--border);color:var(--text);
        padding:12px;border-radius:10px;outline:none
      " />

      <button class="btn btn-primary" style="width:100%;font-size:1.05rem" onclick="payNow()">${t("wallet_pay")}</button>

      <p id="pay-msg" class="text-muted" style="margin:12px 4px 0;display:none">${t("wallet_msg_after")}</p>

      <div class="hr"></div>
      <div style="text-align:center">
        <button class="btn" onclick="navigate('home')">${t("wallet_back_home")}</button>
      </div>
    </div>
  </div>`;
}
function payNow(){
  const email = $("#checkout-email")?.value?.trim();
  if(!email || !/^\S+@\S+\.\S+$/.test(email)){
    alert(LANG==="ar" ? "يرجى إدخال بريد إلكتروني صالح" : "Please enter a valid email address");
    return;
  }
  // هنا تقدر تستدعي وظيفة create-invoice على Netlify Functions
  // وتكمل عملية الدفع. الآن مجرد تجربة واجهة:
  const msg = $("#pay-msg");
  if(msg){ msg.style.display = "block"; }
  // ممكن تحفظ الإيميل مع الخطة في sessionStorage
  const sel = sessionStorage.getItem("plan");
  const selection = sel ? JSON.parse(sel) : null;
  sessionStorage.setItem("checkout_email", email);
  // يمكنك توجيه المستخدم بعد قليل إلى صفحة تأكيد
  setTimeout(()=>alert(LANG==="ar"?"تم استلام الطلب. سنؤكد الدفع قريبًا.":"Order received. We will confirm your payment shortly."), 200);
}

/* ---------- Go Pay from Pricing ---------- */
function goPay(id, price){
  const planName = id === "premium" ? "Premium" : id === "single" ? "Single Trader" : "Free Trial";
  sessionStorage.setItem("plan", JSON.stringify({ type:"plan", id, price, name: planName }));
  navigate("wallet");
}

/* ---------- Profile Modal ---------- */
document.body.insertAdjacentHTML("beforeend", ProfileModal());
function ProfileModal(){
  return `
  <div id="p-backdrop" class="modal-backdrop"></div>
  <div id="profile-modal" class="modal">
    <div class="modal-header">
      <strong id="p-name">Trader</strong>
      <button class="modal-close" id="p-close">✕</button>
    </div>
    <div class="hr"></div>
    <div id="p-body" class="text-muted">Loading…</div>
    <div class="hr"></div>
    <div class="modal-actions">
      <button class="btn" id="p-back">${t("back")}</button>
      <button class="btn btn-primary" id="p-sub">${t("subscribeNow")}</button>
    </div>
  </div>`;
}
function openProfile(id){
  const tr = TRADERS.find(x=>x.id===id);
  if(!tr) return;
  const price = priceForTrader(tr);
  document.body.classList.add("modal-open");

  $("#p-name").textContent = `${tr.name} — $${price}/mo`;
  $("#p-body").innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;margin-bottom:15px">
      <div><div class="text-muted" style="font-size:.8rem">ROI</div><div style="font-size:1.2rem;font-weight:700">${Math.round(tr.roi*100)}%</div></div>
      <div><div class="text-muted" style="font-size:.8rem">WIN</div><div style="font-size:1.2rem;font-weight:700">${Math.round(tr.win*100)}%</div></div>
      <div><div class="text-muted" style="font-size:.8rem">EXP</div><div style="font-size:1.2rem;font-weight:700">${tr.years}y</div></div>
      <div><div class="text-muted" style="font-size:.8rem">Market</div><div style="font-size:1rem;font-weight:700">${tr.market} • ${tr.country}</div></div>
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

  $("#profile-modal").classList.add("show");
  $("#p-backdrop").classList.add("show");

  $("#p-close").onclick = closeProfile;
  $("#p-back").onclick = closeProfile;
  $("#p-backdrop").onclick = closeProfile;

  $("#p-sub").onclick = ()=>{
    sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price, name: tr.name }));
    sessionStorage.setItem("step","1");
    closeProfile();
    navigate("wallet");
  };
}
function closeProfile(){
  document.body.classList.remove("modal-open");
  $("#profile-modal")?.classList.remove("show");
  $("#p-backdrop")?.classList.remove("show");
}

/* ---------- Router & Effects ---------- */
let currentPage = "home";
function navigate(p){ currentPage = p; render(); }

function attachObservers(){
  // reveal on scroll
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity=1; e.target.style.transform="translateY(0)";
        io.unobserve(e.target);
      }
    });
  },{threshold:.1});
  document.querySelectorAll(".reveal").forEach(el=>{
    el.style.opacity=0; el.style.transform="translateY(14px)"; io.observe(el);
  });

  // counters
  const co = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const to = +el.dataset.to || 0;
      let cur = 0;
      const inc = Math.max(1, Math.floor(to/50));
      const timer = setInterval(()=>{
        cur += inc;
        if(cur >= to){ cur = to; clearInterval(timer); }
        el.textContent = String(cur);
      }, 20);
      co.unobserve(e.target);
    });
  },{threshold:.6});
  document.querySelectorAll(".counter").forEach(el=>co.observe(el));
}

function render(){
  let html="";
  if(currentPage==="home") html = Home();
  else if(currentPage==="traders") html = Traders();
  else if(currentPage==="pricing") html = Pricing();
  else if(currentPage==="academy") html = Academy();
  else if(currentPage==="wallet") html = Wallet();
  else html = Home();

  app.innerHTML = html;
  attachObservers();
  document.documentElement.dir = (LANG==="ar"?"rtl":"ltr");
}

render();
