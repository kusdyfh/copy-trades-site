(() => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // ================== i18n ==================
  const DICT = {
    en: {
      pro: "Pro trading environment",
      nav: { home:"Home", traders:"Traders", pricing:"Pricing", academy:"Academy", analytics:"Analytics", wallet:"Wallet", faq:"FAQ", contact:"Contact" },
      heroTitle: "Professional Trading Platform",
      heroSub: "Top traders, advanced analytics, and a complete academy — in one platform.",
      startPremium: "Start Premium $150",
      exploreAcademy: "Explore Academy",
      tradersTitle:"Pro Traders", tradersHint:"Pick a trader to view profile or subscribe",
      risk:"Risk", experience:(y)=>`Experience ${y}y`, price:(p)=>`$${p}/mo`,
      pricingTitle:"Plans", monthly:"Monthly", subscribeNow:"Subscribe Now", pricingNote:"Real invoices are created via NOWPayments.",
      academyTitle:"Learning Academy", lessons:"Lessons", courseView:"View Curriculum", done:"Done", markDone:"Mark done",
      analyticsTitle:"Analytics & Insights",
      walletTitle:"Wallet & Checkout",
      choosePlan:"Choose your plan", review:"Review", pay:"Pay",
      planSelected:"Selected",
      premium:"Premium", single:"Single Trader", trader:"Trader",
      whatYouGet:"What you get",
      withdrawTitle:"USDT Withdrawal", network:"Network", address:"Address", amount:"Amount (USDT)", minMax:(a,b)=>`Min ${a}$ / Max ${b}$`, fee:"Fee", willSend:"Will send",
      onlyTRC20:"Only TRC20", enterAddress:"Enter a valid address", amountBounds:(a,b)=>`Amount must be between ${a}$ and ${b}$`,
      send:"Send", payNow:"Pay Now", next:"Next", back:"Back",
      success:"Payment success page", cancel:"Payment canceled",
    },
    ar: {
      pro:"بيئة تداول احترافية",
      nav:{ home:"الرئيسية", traders:"المتداولون", pricing:"الباقات", academy:"الأكاديمية", analytics:"الإحصائيات", wallet:"المحفظة", faq:"الأسئلة", contact:"تواصل" },
      heroTitle:"منصة التداول الاحترافية",
      heroSub:"أفضل المتداولين، تحليلات متقدمة، وأكاديمية كاملة في منصة واحدة.",
      startPremium:"ابدأ بـ Premium $150",
      exploreAcademy:"استكشف الأكاديمية",
      tradersTitle:"المتداولون المحترفون", tradersHint:"اختر متداولًا لعرض الملف أو الاشتراك",
      risk:"المخاطرة", experience:(y)=>`خبرة ${y} سنوات`, price:(p)=>`$${p}/شهر`,
      pricingTitle:"الباقات", monthly:"شهري", subscribeNow:"اشترك الآن", pricingNote:"تصدر الفواتير عبر NOWPayments.",
      academyTitle:"الأكاديمية التعليمية",
      analyticsTitle:"أدوات التحليل",
      walletTitle:"المحفظة والدفع",
      choosePlan:"اختر الباقة", review:"مراجعة", pay:"الدفع",
      planSelected:"المحدد",
      premium:"المميزة", single:"متداول واحد", trader:"متداول",
      whatYouGet:"ستحصل على",
      withdrawTitle:"سحب USDT", network:"الشبكة", address:"العنوان", amount:"المبلغ (USDT)", minMax:(a,b)=>`الحد الأدنى ${a}$ / الأقصى ${b}$`, fee:"العمولة", willSend:"سيُرسل",
      onlyTRC20:"TRC20 فقط", enterAddress:"أدخل عنوانًا صالحًا", amountBounds:(a,b)=>`المبلغ بين ${a}$ و ${b}$`,
      send:"إرسال", payNow:"ادفع الآن", next:"التالي", back:"رجوع",
      success:"تم الدفع", cancel:"تم الإلغاء",
    }
  };

  let lang = localStorage.getItem("lang") || "en";
  const t = (path, ...a) => {
    const parts = path.split(".");
    let cur = DICT[lang];
    for (const p of parts) cur = (cur||{})[p];
    return (typeof cur === "function") ? cur(...a) : (cur ?? path);
  };
  const setLang = (l) => {
    lang = l; localStorage.setItem("lang", l);
    document.documentElement.dir = (l==="ar"?"rtl":"ltr");
    updateNavLabels();
    Router.render();
  };
  document.getElementById("lang-btn").onclick = () => setLang(lang==="en"?"ar":"en");
  document.getElementById("tag-pro").textContent = t("pro");
  document.documentElement.dir = (lang==="ar"?"rtl":"ltr");

  function updateNavLabels(){
    const m = ["home","traders","pricing","academy","analytics","wallet","faq","contact"];
    m.forEach(k => document.getElementById("nav-"+k).textContent = t("nav."+k));
  }
  updateNavLabels();

  // ================== Data ==================
  const TRADERS = [
    { id:"t1", name:"AlphaFX", country:"US", markets:["Forex"], roi:0.56, win:0.82, subs:1543, risk:"Medium", years:6,  strategy:"Swing/Intraday with tight risk controls." },
    { id:"t2", name:"GoldHawk", country:"UK", markets:["Gold"], roi:0.42, win:0.79, subs:987,  risk:"Low",    years:5,  strategy:"Trend-following on XAUUSD with macro overlays." },
    { id:"t3", name:"CryptoNinja", country:"SG", markets:["Crypto"], roi:1.12, win:0.71, subs:2345, risk:"High", years:7,  strategy:"Volatility breakout on BTC/ETH with grid hedging." },
    { id:"t10", name:"GridSensei", country:"UK", markets:["Crypto"], roi:1.56, win:0.68, subs:2011, risk:"High", years:10, strategy:"Adaptive grid with volatility targeting." }
  ];
  const PRICING = { MIN:30, MAX:50 };
  const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
  const ranges = (() => {
    const roi = TRADERS.map(t=>t.roi), win = TRADERS.map(t=>t.win);
    return { roiMin:Math.min(...roi), roiMax:Math.max(...roi), winMin:Math.min(...win), winMax:Math.max(...win) };
  })();
  const norm = (v,min,max)=> (max===min?0.5:clamp((v-min)/(max-min),0,1));
  function priceForTrader(tr) {
    const score = 0.5*norm(tr.roi, ranges.roiMin, ranges.roiMax) + 0.5*norm(tr.win, ranges.winMin, ranges.winMax);
    return clamp(PRICING.MIN + Math.round(score*(PRICING.MAX-PRICING.MIN)), PRICING.MIN, PRICING.MAX);
  }

  // ================== State ==================
  const State = {
    get plan(){ try { return JSON.parse(sessionStorage.getItem("plan")||"null"); } catch { return null; } },
    set plan(p){ sessionStorage.setItem("plan", JSON.stringify(p)); }
  };

  // ================== Sections ==================
  function Hero(){
    return `
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold leading-[1.15]">${t("heroTitle")} <span class="text-teal-400">Broker CORP</span></h1>
          <p class="mt-4 text-neutral-300">${t("heroSub")}</p>
          <div class="mt-6 flex gap-3">
            <button class="btn" data-go="premium">${t("startPremium")}</button>
            <a class="btn" href="#/academy">${t("exploreAcademy")}</a>
          </div>
        </div>
        <div class="card">
          <h3 class="font-semibold mb-3">Platform Stats</h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="card text-center p-4"><div class="text-sm text-neutral-400">Traders</div><div class="text-3xl mt-1 font-semibold">12</div></div>
            <div class="card text-center p-4"><div class="text-sm text-neutral-400">Specialties</div><div class="text-3xl mt-1 font-semibold">4+</div></div>
            <div class="card text-center p-4"><div class="text-sm text-neutral-400">Win Rate</div><div class="text-3xl mt-1 font-semibold">76%-89%</div></div>
            <div class="card text-center p-4"><div class="text-sm text-neutral-400">Rating</div><div class="text-3xl mt-1 font-semibold">4.6-4.9★</div></div>
          </div>
        </div>
      </div>
    </section>`;
  }

  function TradersList(){
    const cards = TRADERS.map(tr=>{
      const price = priceForTrader(tr);
      return `
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <a class="font-semibold underline underline-offset-4" href="#/trader/${tr.id}">${tr.name}</a>
              <div class="text-xs text-neutral-400">${tr.markets.join(", ")} • ${tr.country}</div>
            </div>
            <div class="flex items-center gap-2">
              <span class="badge">${t("experience")(tr.years)}</span>
              <span class="badge">${t("price")(price)}</span>
            </div>
          </div>
          <div class="mt-3 grid grid-cols-3 gap-3 text-center">
            <div><div class="text-xs text-neutral-400">ROI</div><div class="text-lg font-semibold">${Math.round(tr.roi*100)}%</div></div>
            <div><div class="text-xs text-neutral-400">Win</div><div class="text-lg font-semibold">${Math.round(tr.win*100)}%</div></div>
            <div><div class="text-xs text-neutral-400">Subs</div><div class="text-lg font-semibold">${tr.subs}</div></div>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <span class="badge">${t("risk")}: ${tr.risk}</span>
            <button class="btn" data-sub="${tr.id}">${t("subscribeNow")}</button>
          </div>
        </div>
      `;
    }).join("");
    return `
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-semibold mb-2">${t("tradersTitle")}</h2>
        <p class="text-neutral-400 mb-6">${t("tradersHint")}</p>
        <div class="grid-cards">${cards}</div>
      </div>
    </section>`;
  }

  function TraderProfile(id){
    const tr = TRADERS.find(x=>x.id===id);
    if(!tr) return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">Not found.</div></section>`;
    const price = priceForTrader(tr);
    return `
    <section class="py-16"><div class="max-w-7xl mx-auto px-4">
      <a class="badge inline-block mb-4" href="#/traders">← ${t("nav.back")||"Back"}</a>
      <div class="card">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="text-2xl font-semibold">${tr.name}</h2>
            <div class="text-sm text-neutral-400 mt-1">${tr.markets.join(", ")} • ${tr.country} • ${t("experience")(tr.years)}</div>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="badge">ROI ${Math.round(tr.roi*100)}%</span>
            <span class="badge">Win ${Math.round(tr.win*100)}%</span>
            <span class="badge">Subs ${tr.subs}</span>
            <span class="badge">${t("risk")}: ${tr.risk}</span>
            <span class="badge">${t("price")(price)}</span>
          </div>
        </div>
        <div class="mt-6 grid md:grid-cols-3 gap-6">
          <div class="card p-4">
            <div class="font-semibold mb-2">Overview</div>
            <p class="text-sm text-neutral-300">${tr.name} runs a disciplined approach across ${tr.markets.join(", ")} with strict risk control.</p>
          </div>
          <div class="card p-4 md:col-span-2">
            <div class="font-semibold mb-2">Strategy</div>
            <p class="text-sm text-neutral-300">${tr.strategy}</p>
          </div>
        </div>
        <div class="mt-6 flex gap-3">
          <button class="btn" data-sub="${tr.id}" title="${t("price")(price)}">${t("subscribeNow")}</button>
          <a class="btn" href="#/wallet">${t("nav.wallet")}</a>
        </div>
      </div>
    </div></section>`;
  }

  function Pricing(){
    return `
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl font-semibold mb-6">${t("pricingTitle")}</h2>
        <div class="grid gap-6 sm:grid-cols-2">
          <div class="card"><div class="flex items-center justify-between">
            <div><div class="font-semibold text-lg">${t("premium")}</div><div class="text-neutral-400 text-sm">${t("monthly")}</div></div>
            <div class="text-3xl font-bold">$150</div>
          </div>
          <button class="btn mt-4" data-plan="premium">${t("subscribeNow")}</button></div>

          <div class="card"><div class="flex items-center justify-between">
            <div><div class="font-semibold text-lg">${t("single")}</div><div class="text-neutral-400 text-sm">${t("monthly")}</div></div>
            <div class="text-3xl font-bold">$49</div>
          </div>
          <button class="btn mt-4" data-plan="single">${t("subscribeNow")}</button></div>
        </div>
        <p class="text-xs text-neutral-500 mt-3">${t("pricingNote")}</p>
      </div>
    </section>`;
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
        <div class="text-sm text-neutral-400">${t("lessons")}: ${c.lessons.length}</div>
        <details class="mt-3">
          <summary class="cursor-pointer">${t("courseView")}</summary>
          <ul class="mt-2 space-y-1 text-sm">
            ${c.lessons.map(l=>`<li class="flex items-center justify-between gap-3"><span>${l}</span><button class="text-xs border border-neutral-700 rounded-lg px-2 py-1" data-done="${c.id}">${t("markDone")}</button></li>`).join("")}
          </ul>
        </details>
      </div>
    `).join("");
    return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-6">${t("academyTitle")}</h2>
      <div class="grid-cards">${grid}</div>
    </div></section>`;
  }

  function Analytics(){
    return `<section class="py-16"><div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-6">${t("analyticsTitle")}</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="card"><div class="font-semibold mb-2">Live stats</div><p class="text-sm text-neutral-400">Real-time performance (demo).</p></div>
        <div class="card"><div class="font-semibold mb-2">Performance reports</div><p class="text-sm text-neutral-400">Download reports (later).</p></div>
        <div class="card"><div class="font-semibold mb-2">Smart alerts</div><p class="text-sm text-neutral-400">Actionable alerts & recommendations.</p></div>
      </div>
    </div></section>`;
  }

  // ---- Wallet (Stepper + Withdrawal + NOWPayments) ----
  function Wallet(){
    const sel = State.plan;
    const step = Number(sessionStorage.getItem("step")||"1"); // 1:Select 2:Review 3:Pay
    const label = (!sel ? "—" : (typeof sel==="string" ? (sel==="premium"?"Premium":"Single") : TRADERS.find(x=>x.id===sel.traderId)?.name || "Trader"));
    const price = (!sel ? null : (typeof sel==="string"? (sel==="premium"?150:49) : sel.price));

    const steps = (cur)=>`
      <div class="flex items-center gap-6 text-sm">
        <div class="step ${cur>=1?"active":""}"><span class="dot"></span>${t("choosePlan")}</div>
        <div class="step ${cur>=2?"active":""}"><span class="dot"></span>${t("review")}</div>
        <div class="step ${cur>=3?"active":""}"><span class="dot"></span>${t("pay")}</div>
      </div>`;

    const selectHTML = `
      <div class="card">
        <div class="font-semibold mb-3">${t("choosePlan")}</div>
        <div class="flex flex-wrap gap-2">
          <button class="text-xs border border-neutral-700 rounded-lg px-2 py-1" data-p="premium">Premium $150</button>
          <button class="text-xs border border-neutral-700 rounded-lg px-2 py-1" data-p="single">Single $49</button>
          <span class="text-xs text-neutral-400">Or pick a trader for personalized price.</span>
        </div>
        ${sel? `<div class="mt-3 text-sm">${t("planSelected")}: <b>${label}${price?` – $${price}/mo`:""}</b></div>` : ""}
        <div class="mt-4 flex gap-2">
          <button class="btn" data-next="2" ${!sel?"disabled":""}>${t("next")}</button>
        </div>
      </div>`;

    const reviewHTML = `
      <div class="card">
        <div class="font-semibold mb-2">${t("review")}</div>
        <div class="text-sm">Plan: <b>${label}</b></div>
        <div class="text-sm">Price: <b>$${price}</b></div>
        <div class="mt-4 flex gap-2">
          <button class="btn" data-prev="1">${t("back")}</button>
          <button class="btn" data-next="3">${t("next")}</button>
        </div>
      </div>`;

    const payHTML = `
      <div class="card">
        <div class="font-semibold mb-2">${t("pay")}</div>
        <p class="text-sm text-neutral-400">Invoice will be created via NOWPayments.</p>
        <button class="btn mt-2" id="pay-now">${t("payNow")}</button>
      </div>`;

    const withdrawHTML = `
      <div class="card">
        <h3 class="font-semibold mb-2">${t("withdrawTitle")}</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <div><label class="text-sm text-neutral-400 mb-1 block">${t("network")}</label><input class="input" id="w-network" value="TRC20"/><p class="text-xs text-neutral-500 mt-1">TRC20</p></div>
          <div><label class="text-sm text-neutral-400 mb-1 block">${t("address")}</label><input class="input" id="w-address" placeholder="T..."/></div>
          <div><label class="text-sm text-neutral-400 mb-1 block">${t("amount")}</label><input class="input" id="w-amount" type="number" min="10" max="10000"/><p class="text-xs text-neutral-500 mt-1">${t("minMax")(10,10000)}</p></div>
        </div>
        <div class="mt-2 text-sm" id="w-fee"></div>
        <button class="btn mt-3" id="w-submit">${t("send")}</button>
        <p class="text-sm mt-2" id="w-msg"></p>
      </div>`;

    return `
    <section class="py-16"><div class="max-w-7xl mx-auto px-4">
      <h2 class="text-2xl font-semibold mb-4">${t("walletTitle")}</h2>
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
      {q:"How are payments processed?", a:"Via NOWPayments invoices on production."},
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
          <input class="input" placeholder="Name"/>
          <input class="input" placeholder="Email"/>
        </div>
        <textarea class="input mt-3" rows="4" placeholder="Message"></textarea>
        <button class="btn mt-4">${t("send")}</button>
      </div>
    </div></section>`;
  }

  // ================== Router ==================
  const Router = (() => {
    const routes = {
      "": ()=> Home(),
      "home": ()=> Home(),
      "traders": ()=> TradersPage(),
      "trader/:id": ({id})=> TraderProfile(id),
      "pricing": ()=> Pricing(),
      "academy": ()=> Academy(),
      "analytics": ()=> Analytics(),
      "wallet": ()=> Wallet(),
      "faq": ()=> FAQ(),
      "contact": ()=> Contact(),
      "success": ()=> `<section class="py-16"><div class="max-w-7xl mx-auto px-4"><div class="card">${t("success")}</div></div></section>`,
      "cancel": ()=> `<section class="py-16"><div class="max-w-7xl mx-auto px-4"><div class="card">${t("cancel")}</div></div></section>`
    };
    function parse(){ const hash = location.hash.replace(/^#\/?/,""); return hash.split("/"); }
    function match(){
      const p = parse(); const key = p[0]||"";
      if(routes[key]) return routes[key]();
      if(key==="trader" && p[1]) return routes["trader/:id"]({id:p[1]});
      return Home();
    }
    function render(){
      const app = document.getElementById("app");
      app.innerHTML = match();
      attachHandlers();
    }
    window.addEventListener("hashchange", render);
    return { render };
  })();

  function Home(){ return Hero()+TradersList()+Pricing()+Academy()+Analytics()+FAQ()+Contact(); }
  function TradersPage(){ return TradersList(); }

  // ================== Handlers ==================
  function attachHandlers(){
    document.querySelectorAll("button.btn, a.btn").forEach(b=> b.classList.add("inline-flex","items-center","justify-center","rounded-xl","px-5","py-3","font-medium","border","border-neutral-700","hover:bg-neutral-800"));

    // Hero premium click
    document.querySelectorAll('[data-go="premium"]').forEach(el=>{
      el.onclick = ()=> { State.plan = "premium"; location.hash = "#/wallet"; };
    });

    // Pricing plan click
    document.querySelectorAll("[data-plan]").forEach(el=>{
      el.onclick = ()=> { State.plan = el.getAttribute("data-plan"); location.hash = "#/wallet"; };
    });

    // Subscribe specific trader
    document.querySelectorAll("[data-sub]").forEach(el=>{
      el.onclick = ()=> {
        const id = el.getAttribute("data-sub");
        const tr = TRADERS.find(x=>x.id===id); if(!tr) return;
        State.plan = { type:"trader", traderId:id, price: priceForTrader(tr) };
        location.hash = "#/wallet";
      };
    });

    // Academy mark done
    document.querySelectorAll("[data-done]").forEach(b=>{
      b.onclick = ()=> { b.textContent = t("done"); b.setAttribute("disabled","true"); };
    });

    // Wallet stepper
    const next = document.querySelector("[data-next]");
    const prev = document.querySelector("[data-prev]");
    next && (next.onclick = ()=> { sessionStorage.setItem("step", next.getAttribute("data-next")); Router.render(); });
    prev && (prev.onclick = ()=> { sessionStorage.setItem("step", prev.getAttribute("data-prev")); Router.render(); });

    const payBtn = document.getElementById("pay-now");
    payBtn && (payBtn.onclick = createInvoiceNOW);

    // Withdrawal calc
    const amtEl = document.getElementById("w-amount");
    const feeBox = document.getElementById("w-fee");
    amtEl && amtEl.addEventListener("input", ()=>{
      const amt = Number(amtEl.value||0);
      const fee = Math.max(1, Math.round(amt*0.01*100)/100);
      const total = Math.max(0, amt - fee);
      feeBox.innerHTML = `${t("fee")}: <b>${fee}$</b> • ${t("willSend")}: <b>${total}$</b>`;
    });

    // Withdrawal submit
    const wSubmit = document.getElementById("w-submit");
    wSubmit && (wSubmit.onclick = ()=>{
      const net = document.getElementById("w-network").value.trim();
      const addr = document.getElementById("w-address").value.trim();
      const amt = Number(document.getElementById("w-amount").value||0);
      const msg = document.getElementById("w-msg");
      if(net!=="TRC20") { msg.textContent=t("onlyTRC20"); return; }
      if(!addr || addr.length<10){ msg.textContent=t("enterAddress"); return; }
      if(isNaN(amt) || amt<10 || amt>10000){ msg.textContent=t("amountBounds")(10,10000); return; }
      msg.textContent = "Request received (preview).";
    });
  }

  // ============== NOWPayments integration (via Netlify Function) ==============
  async function createInvoiceNOW(){
    try{
      const sel = State.plan;
      if(!sel){ alert("Select a plan first."); return;}
      const amount = typeof sel==="string" ? (sel==="premium"?150:49) : sel.price;
      const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();

      const res = await fetch("/.netlify/functions/create-invoice", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          price_amount: amount,
          price_currency: "usd",
          order_id: orderId,
          success_url: location.origin + "/#/success",
          cancel_url: location.origin + "/#/cancel",
          ipn_callback_url: location.origin + "/.netlify/functions/ipn"
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

  // First render
  Router.render();
})();
