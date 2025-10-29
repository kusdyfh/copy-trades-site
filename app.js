/* =======================
   Broker CORP – App.js
   ======================= */

// Mount point
const app = document.getElementById("app");

// ------- i18n (EN default + AR toggle) -------
let LANG = localStorage.getItem("LANG") || "en";
const I18N = {
  en: {
    nav_home: "Home",
    nav_traders: "Traders",
    nav_pricing: "Pricing",
    nav_academy: "Academy",
    nav_analytics: "Analytics",
    nav_deposit: "Deposit",
    nav_withdraw: "Withdraw",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    toggle_lang: "العربية",
    hero_h1_a: "Trade like a",
    hero_h1_b: "professional",
    hero_sub:
      "Verified traders • Transparent analytics • Full academy • Secure USDT (TRC20) payments.",
    cta_explore: "Explore Traders",
    cta_learn: "Start Learning",
    stats_title: "Platform Live Stats",
    stats_traders: "Pro Traders",
    stats_profit: "Total Profit",
    stats_active: "Active Users",
    how_title: "How it works",
    how_1_t: "Choose your plan",
    how_1_d: "Pick Premium or subscribe to a specific trader.",
    how_2_t: "Fund your wallet",
    how_2_d: "USDT (TRC20) only — quick and secure.",
    how_3_t: "Start copying",
    how_3_d: "Follow pros, receive alerts and analytics.",
    success_title: "Success stories & growth",
    testi_title: "What our users say",
    cta_final_t: "Ready to trade smarter?",
    cta_final_b: "Start Trading Today",
    back: "Back",
    subscribeNow: "Subscribe Now",
    pricing: "Pricing",
    wallet: "Wallet",
    academy: "Trading Academy",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_traders: "المتداولون",
    nav_pricing: "الأسعار",
    nav_academy: "الأكاديمية",
    nav_analytics: "التحليلات",
    nav_deposit: "الإيداع",
    nav_withdraw: "السحب",
    nav_faq: "الأسئلة الشائعة",
    nav_contact: "التواصل",
    toggle_lang: "EN",
    hero_h1_a: "تداول مثل",
    hero_h1_b: "محترف",
    hero_sub:
      "متداولون موثوقون • شفافية في التحليل • أكاديمية كاملة • دفع آمن USDT (TRC20).",
    cta_explore: "استكشاف المتداولين",
    cta_learn: "ابدأ التعلم",
    stats_title: "إحصائيات المنصة الحية",
    stats_traders: "متداولون محترفون",
    stats_profit: "إجمالي الأرباح",
    stats_active: "مستخدمون نشطون",
    how_title: "كيف تبدأ",
    how_1_t: "اختر الباقة",
    how_1_d: "اختر الباقة المميزة أو اشتراك متداول محدد.",
    how_2_t: "موّل محفظتك",
    how_2_d: "USDT (TRC20) فقط — سريع وآمن.",
    how_3_t: "ابدأ النسخ",
    how_3_d: "تابع المحترفين وتلقّ الإشعارات والتحليلات.",
    success_title: "قصص نجاح ونمو",
    testi_title: "آراء المستخدمين",
    cta_final_t: "جاهز للتداول بذكاء؟",
    cta_final_b: "ابدأ التداول الآن",
    back: "رجوع",
    subscribeNow: "اشترك الآن",
    pricing: "الأسعار",
    wallet: "المحفظة",
    academy: "الأكاديمية",
  },
};
const t = (k) => I18N[LANG][k] || k;

// helpers
function $(s) { return document.querySelector(s); }
function initials(n) { return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase(); }
function priceForTrader(tr){ return 30; }

// ----- Traders mock (64) -----
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

/* =======================
   NAVBAR (with logo & lang)
   ======================= */
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
    {k:"nav_deposit", p:"wallet"},
    {k:"nav_withdraw", p:"wallet"},
    {k:"nav_faq", p:"faq"},
    {k:"nav_contact", p:"contact"},
  ];
  const right = `
    <button class="btn" style="padding:8px 10px" onclick="toggleLang()">${t("toggle_lang")}</button>
  `;
  return `
  <div class="container" style="position:sticky;top:0;z-index:50;background:linear-gradient(180deg,#0a0b10 80%,transparent)">
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:12px">
      <div style="display:flex;align-items:center;gap:10px;font-weight:800">
        ${LogoSVG()} <span style="color:var(--gold)">Broker CORP</span> <span class="text-muted">Pro • Gold</span>
      </div>
      <nav style="display:flex;gap:14px;flex-wrap:wrap;align-items:center">
        ${items.map(i=>`<button class="btn" onclick="navigate('${i.p}')">${t(i.k)}</button>`).join("")}
        ${right}
      </nav>
    </div>
  </div>`;
}

function toggleLang(){
  LANG = LANG === "en" ? "ar" : "en";
  localStorage.setItem("LANG", LANG);
  render();
}

/* =======================
   HOME (new marketing page)
   ======================= */

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  chart: "https://images.unsplash.com/photo-1640340434883-8e6e8bbaf4fd?q=80&w=1600&auto=format&fit=crop",
  desk: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
  team: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1600&auto=format&fit=crop",
};

function Hero(){
  return `
  <section class="container">
    <div class="card" style="
      padding:40px 24px;
      background:linear-gradient(180deg,#0f131a,rgba(16,20,27,.9)),
                 url('${IMAGES.hero}') center/cover no-repeat;
      border-color:#2d323d;
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
    {t:t("how_1_t"), d:t("how_1_d"), img:IMAGES.desk},
    {t:t("how_2_t"), d:t("how_2_d"), img:IMAGES.team},
    {t:t("how_3_t"), d:t("how_3_d"), img:IMAGES.chart},
  ];
  return `
  <section class="container reveal">
    <h2 style="margin:10px 0">${t("how_title")}</h2>
    <div class="grid-cards">
      ${steps.map(s => `
        <div class="card">
          <img src="${s.img}" alt="" style="width:100%;height:140px;object-fit:cover;border-radius:10px">
          <div class="hr"></div>
          <div style="font-weight:700">${s.t}</div>
          <div class="text-muted">${s.d}</div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function SuccessStories(){
  return `
  <section class="container reveal">
    <h2 style="margin:10px 0">${t("success_title")}</h2>
    <div class="grid-cards">
      <div class="card">
        <img src="${IMAGES.chart}" style="width:100%;height:220px;object-fit:cover;border-radius:10px" alt="chart">
        <div class="hr"></div>
        <div><b>Monthly ROI</b> +12% to +34% across top traders</div>
        <div class="text-muted">Past performance does not guarantee future results.</div>
      </div>
      <div class="card">
        <img src="${IMAGES.team}" style="width:100%;height:220px;object-fit:cover;border-radius:10px" alt="users">
        <div class="hr"></div>
        <div><b>Community</b> 1,000+ active users and counting</div>
        <div class="text-muted">Real traders • Real insights • Real-time signals.</div>
      </div>
    </div>
  </section>`;
}

function Testimonials(){
  const arr = [
    {n:"Ali S.", m:"I started with Single Trader plan and upgraded to Premium — analytics are top-notch.", r:5},
    {n:"Maya R.", m:"Risk management lessons in the academy changed my approach completely.", r:5},
    {n:"Omar K.", m:"Transparent performance and clear strategies. Worth every dollar.", r:4},
  ];
  return `
  <section class="container reveal">
    <h2 style="margin:10px 0">${t("testi_title")}</h2>
    <div class="grid-cards">
      ${arr.map(x => `
        <div class="card">
          <div style="display:flex;align-items:center;gap:8px">
            <div class="avatar">${initials(x.n)}</div>
            <div>
              <div style="font-weight:700">${x.n}</div>
              <div style="color:var(--gold)">${"★".repeat(x.r)}<span class="text-muted">${"★".repeat(5-x.r)}</span></div>
            </div>
          </div>
          <div class="hr"></div>
          <div>${x.m}</div>
        </div>
      `).join("")}
    </div>
  </section>`;
}

function FinalCTA(){
  return `
  <section class="container reveal">
    <div class="card" style="text-align:center;padding:28px;background:linear-gradient(180deg,#111622,#0b0d10)">
      <h2 style="margin:0 0 8px">${t("cta_final_t")}</h2>
      <p class="text-muted" style="margin:0 0 16px">Join our premium plan or pick a pro to follow — USDT (TRC20) supported.</p>
      <button class="btn btn-primary" onclick="navigate('pricing')">${t("cta_final_b")}</button>
    </div>
  </section>`;
}

function Home(){
  // language direction
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  return `
    ${Navbar()}
    ${Hero()}
    ${HowItWorks()}
    ${SuccessStories()}
    ${Testimonials()}
    ${FinalCTA()}
  `;
}

/* =======================
   TRADERS / PRICING / OTHERS
   ======================= */

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
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  return `
  ${Navbar()}
  <div class="container">
    <h2>Professional Traders</h2>
    <div class="grid-cards">
      ${TRADERS.map(CardTrader).join("")}
    </div>
  </div>`;
}

function Pricing(){
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
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

function Academy(){
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
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

function Wallet(){
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
  const plan = sessionStorage.getItem("plan");
  return `
  ${Navbar()}
  <div class="container">
    <h2>${t("wallet")}</h2>
    <p class="text-muted">Selected plan: ${plan ? JSON.parse(plan).name : "None"}</p>
    <p>You can proceed to payment securely using USDT (TRC20).</p>
    <button class="btn btn-primary" onclick="startPayment()">Proceed to Pay</button>
  </div>`;
}

function startPayment(){
  alert("Redirecting to secure payment (NowPayments)...");
  // call serverless function create-invoice here if needed
}

function goPay(id, price){
  const planName = id === "premium" ? "Premium" : id === "single" ? "Single Trader" : "Free Trial";
  sessionStorage.setItem("plan", JSON.stringify({ type:"plan", id, price, name: planName }));
  navigate("wallet");
}

/* =======================
   PROFILE MODAL
   ======================= */
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

/* =======================
   ROUTER & RENDER
   ======================= */
let currentPage = "home";
function navigate(p){ currentPage = p; render(); }

// IntersectionObserver for reveal + counters
function attachObservers(){
  // reveal
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(e.isIntersecting){ e.target.style.opacity=1; e.target.style.transform="translateY(0)"; io.unobserve(e.target); }
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
      co.unobserve(el);
    });
  },{threshold:.6});
  document.querySelectorAll(".counter").forEach(el=>co.observe(el));
}

function render(){
  let html="";
  if(currentPage==="home") html = Home();
  else if(currentPage==="traders") html = Traders();
  else if(currentPage==="academy") html = Academy();
  else if(currentPage==="pricing") html = Pricing();
  else if(currentPage==="wallet") html = Wallet();
  else html = Home();
  app.innerHTML = html;
  attachObservers();
  // direction per page
  document.documentElement.dir = LANG === "ar" ? "rtl" : "ltr";
}

render();
