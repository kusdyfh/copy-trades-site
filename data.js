// Traders data are generated programmatically (64 items) with bios.
const seedNames = [
  "Michael Anderson","Fatima Al-Sayed","Kenji Nakamura","Carlos Mendez","Aisha Rahman","Omar Haddad",
  "Noah Peterson","Ava Thompson","Liam Walker","Sophia Martinez","Youssef Zidan","Mei Lin","Ibrahim Saleh",
  "Hiro Tanaka","Elena Petrova","Lucas Almeida","Diego Alvarez","Sara Benali","Adam Cohen","Emily Clark",
  "Rami Khaled","Yara Mansour","Anton Ivanov","Marta Rossi","Jonas Weber","Isabella Costa","Ahmed Noor",
  "Hassan Jafari","Nadia Karim","Oliver White","Jacob Miller"
];
const markets = ["Forex","Crypto","Gold","Indices","Stocks","Oil"];
const countries= ["US","UK","AE","SA","QA","KW","EG","MA","TR","DE","FR","ES","IT","JP","SG","CA","AU","BR","HK"];
const styles = ["Swing • SMC","Breakouts • Tight risk","Scalping • Volume","Trend • Pullbacks","Mean Reversion","Event-driven"];

function genBio(name, years, market){
  return `${name} is a ${years}+ year ${market.toLowerCase()} specialist focusing on risk-first execution and data-driven entries. Combines ${market} structure with ${styles[Math.floor(Math.random()*styles.length)].split("•")[0].trim()} filters. Transparent track record with strict risk caps and weekly reports.`;
}

function genTraders(n=64){
  const out=[];
  for(let i=0;i<n;i++){
    const name = seedNames[i%seedNames.length] + (i>=seedNames.length?` ${String.fromCharCode(65+(i%6))}`:"");
    const market = markets[i%markets.length];
    const country = countries[(i*7)%countries.length];
    const years = 3 + (i%9);
    const roi = 0.24 + ((i*13)%80)/200; // 24%..64%
    const win = 0.72 + ((i*17)%20)/100; // 72%..92%
    const id = "t" + String(i+1).padStart(3,"0");
    const style = styles[i%styles.length];
    const bio = genBio(name, years, market);
    out.push({id,name,market,country,years,roi,win,style,bio});
  }
  return out;
}

window.TRADERS = genTraders(64);

// helper
window.priceForTrader = (t)=>{
  const score = (t.roi*100)*0.6 + (t.win*100)*0.4;
  return Math.min(50, Math.max(30, Math.round(score/4)));
};
window.initials = (name)=>(name.split(" ").map(s=>s[0]).slice(0,2).join("")||"?").toUpperCase();
