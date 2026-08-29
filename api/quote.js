const PRICE_BOOK = Object.freeze({
  swift: [2520, 3000], alto: [2160, 2500], i20: [2950, 3500], baleno: [3120, 3500],
  fronx: [3792, 4500], creta: [4490, 6000], seltos: [4680, 6000], nexonev: [4250, 6000],
  scorpio: [6240, 9000], innova: [7944, 12000], activa: [552, 1200], access: [648, 1200],
  ather: [672, 1500], pulsar: [840, 1800], apache: [1128, 2200], mt15: [1056, 2500],
  hunter: [1751, 3500], classic: [1905, 4000], meteor: [2396, 4500], himalayan: [2519, 5000]
});

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (!items.length || items.length > 20) return res.status(400).json({ error: 'Invalid booking items' });

  let subtotal = 0;
  let deposit = 0;
  for (const item of items) {
    const row = PRICE_BOOK[item?.id];
    const quantity = Number(item?.quantity);
    const days = Number(item?.days);
    if (!row || !Number.isInteger(quantity) || quantity < 1 || quantity > 5 || !Number.isInteger(days) || days < 1 || days > 30) {
      return res.status(400).json({ error: 'Invalid vehicle, quantity or rental duration' });
    }
    subtotal += row[0] * quantity * days;
    deposit += row[1] * quantity;
  }

  const service = Math.round(subtotal * 0.035);
  const tax = Math.round((subtotal + service) * 0.18);
  const payable = subtotal + service + tax;
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ subtotal, service, tax, deposit, payable, stored: false });
};
