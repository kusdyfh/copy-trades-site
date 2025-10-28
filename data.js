// بيانات المتداولين (مثال)
const TRADERS = [
  { id: "t1", name: "AlphaFX", roi: 0.56, win: 0.82 },
  { id: "t2", name: "GoldHawk", roi: 0.42, win: 0.79 },
  { id: "t3", name: "CryptoNinja", roi: 1.12, win: 0.71 }
];

// دالة لحساب السعر
function priceForTrader(t) {
  const base = 30 + ((t.roi + t.win) / 2) * 20;
  return Math.round(base);
}
