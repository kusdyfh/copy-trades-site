// --- التهيئة الأساسية ---
const app = document.getElementById("app");
let currentPage = "home";
document.body.insertAdjacentHTML("beforeend", ProfileModal());

// دوال مساعدة بسيطة
function $(s){return document.querySelector(s)}
function initials(n){return n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
function priceForTrader(tr){return 30}
function t(txt){return txt} // يمكن تعديلها لاحقًا لدعم العربية والإنجليزية

// --- بيانات المتداولين ---
const MARKETS = ["Forex","Crypto","Gold","Indices","Stocks","Oil"];
const COUNTRIES = ["US","AE","DE","UK","QA","SG","AU","FR","EG","SA"];
const STYLES = ["Scalping","Swing","Breakouts","Trend","Event-driven","Volume","Tight risk","Pullbacks","Smart Money","Reversal"];

const TRADERS = Array.from({length:64}).map((_,i)=>{
  const name = [
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
  ][i];
  return {
    id:i+1,
    name,
    roi:Math.random()*0.6+0.2,
    win:Math.random()*0.3+0.7,
    years:Math.floor(Math.random()*10)+2,
    market:MARKETS[i%MARKETS.length],
    country:COUNTRIES[i%COUNTRIES.length],
    style:STYLES[i%STYLES.length],
    bio:`${name} is a professional ${MARKETS[i%MARKETS.length]} trader with ${Math.floor(Math.random()*10)+2} years of experience, specialized in ${STYLES[i%STYLES.length].toLowerCase()} strategies and risk management.`
  };
});

// --- الصفحة الرئيسية ---
function Home(){
  return `
  <div class="container">
    <section class="hero card" style="text-align:center;padding:40px 20px;margin-bottom:30px;">
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:10px;">Trade like a <span style="color:var(--gold)">professional</span></h1>
      <p class="text-muted" style="max-width:600px;margin:0 auto 20px;">
        Verified traders • Transparent analytics • Secure USDT (TRC20) payments • Full Academy Access
      </p>
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="navigate('traders')">Explore Traders</button>
        <button class="btn" onclick="navigate('academy')">Start Learning</button>
      </div>
    </section>

    <section class="stats card" style="margin-bottom:30px;text-align:center;">
      <h2 style="margin-bottom:15px;">Platform Live Stats</h2>
      <div class="grid-cards" style="gap:10px;text-align:center;">
        <div class="card"><strong style="font-size:1.4rem;color:var(--gold)">64+</strong><div class="text-muted">Pro Traders</div></div>
        <div class="card"><strong style="font-size:1.4rem;color:var(--gold)">${(Math.random()*40000+60000).toFixed(0)}$</strong><div class="text-muted">Total Profit</div></div>
        <div class="card"><strong style="font-size:1.4rem;color:var(--gold)">${(Math.random()*1200+800).toFixed(0)}</strong><div class="text-muted">Active Users</div></div>
      </div>
    </section>

    <section>
      <h2>Top Traders</h2>
      <div class="grid-cards">
        ${TRADERS.slice(0,4).map(CardTrader).join("")}
      </div>
    </section>
  </div>`;
}

// --- صفحة المتداولين ---
function Traders(){
  return `
  <div class="container">
    <h2>Professional Traders</h2>
    <div class="grid-cards">
      ${TRADERS.map(CardTrader).join("")}
    </div>
  </div>`;
}

function CardTrader(tr){
  return `
  <div class="card">
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

// --- الأكاديمية ---
function Academy(){
  return `
  <div class="container">
    <h2>Trading Academy</h2>
    <p class="text-muted">Free lessons from experts to level up your trading skills:</p>
    <ul>
      <li><a href="https://www.youtube.com/watch?v=Gc2en3nHxA4" target="_blank">Understanding Market Trends</a></li>
      <li><a href="https://www.youtube.com/watch?v=8cH6x3yixK0" target="_blank">How to Read Candlestick Charts</a></li>
      <li><a href="https://www.youtube.com/watch?v=E4mEJdDpL8I" target="_blank">Risk Management in Forex</a></li>
      <li><a href="https://www.youtube.com/watch?v=3I_OeujN6k4" target="_blank">Crypto Trading for Beginners</a></li>
    </ul>
  </div>`;
}

// --- Pricing ---
function Pricing(){
  const plans = [
    {id:"premium",name:"Premium",price:150,desc:"All traders + analytics"},
    {id:"single",name:"Single Trader",price:49,desc:"Choose one pro"},
    {id:"trial",name:"Free Trial",price:0,desc:"7 days"}
  ];
  return `
  <div class="container">
    <h2>Pricing</h2>
    <div class="grid-cards">
      ${plans.map(p=>`
        <div class="card">
          <h3>${p.name}</h3>
          <p class="text-muted">${p.desc}</p>
          <div style="font-size:1.6rem;font-weight:700;margin:10px 0">$${p.price}</div>
          <button class="btn btn-primary" onclick="goPay('${p.id}',${p.price})">Subscribe</button>
        </div>`).join("")}
    </div>
    <p class="text-muted" style="margin-top:10px">USDT • TRC20</p>
  </div>`;
}

// --- Wallet ---
function Wallet(){
  const plan = sessionStorage.getItem("plan");
  return `
  <div class="container">
    <h2>Wallet</h2>
    <p class="text-muted">Selected plan: ${plan ? JSON.parse(plan).name : "None"}</p>
    <p>You can proceed to payment securely using USDT (TRC20).</p>
    <button class="btn btn-primary" onclick="startPayment()">Proceed to Pay</button>
  </div>`;
}

function startPayment(){
  alert("Redirecting to secure payment (NowPayments)...");
  // هنا يتم إنشاء الفاتورة عبر الدالة الخلفية create-invoice.js
}

// --- بروفايل المتداول ---
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
      <button class="btn" id="p-back">Back</button>
      <button class="btn btn-primary" id="p-sub">Subscribe Now</button>
    </div>
  </div>`;
}

function openProfile(id){
  const tr = TRADERS.find(x=>x.id===id);
  if(!tr) return;
  const price = priceForTrader(tr);
  document.body.classList.add("modal-open");

  document.getElementById("p-name").textContent = `${tr.name} — $${price}/mo`;
  document.getElementById("p-body").innerHTML = `
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

  const modal = document.getElementById("profile-modal");
  const backdrop = document.getElementById("p-backdrop");
  modal.classList.add("show");
  backdrop.classList.add("show");

  document.getElementById("p-close").onclick = closeProfile;
  document.getElementById("p-back").onclick = closeProfile;
  backdrop.onclick = closeProfile;

  document.getElementById("p-sub").onclick = ()=>{
    sessionStorage.setItem("plan", JSON.stringify({ type:"trader", traderId:id, price, name: tr.name }));
    sessionStorage.setItem("step","1");
    closeProfile();
    navigate("wallet");
  };
}

function closeProfile(){
  document.body.classList.remove("modal-open");
  document.getElementById("profile-modal")?.classList.remove("show");
  document.getElementById("p-backdrop")?.classList.remove("show");
}

// --- التنقل بين الصفحات ---
function navigate(page){
  currentPage = page;
  render();
}

function render(){
  if(currentPage==="home") app.innerHTML = Home();
  else if(currentPage==="traders") app.innerHTML = Traders();
  else if(currentPage==="academy") app.innerHTML = Academy();
  else if(currentPage==="pricing") app.innerHTML = Pricing();
  else if(currentPage==="wallet") app.innerHTML = Wallet();
}

render();
