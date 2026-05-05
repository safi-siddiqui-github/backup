import React, { useEffect, useState } from 'react';

export default function TicketBlock({ data }: { data: any }) {
  const { title, subtitle, tickets = [] } = data || {};

  // track quantities per ticket option
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    setQuantities((q) => {
      // initialize or resize to tickets length
      const next = Array.from({ length: tickets.length }, (_, i) => (q[i] ?? 0));
      return next;
    });
  }, [tickets.length]);

  function changeQty(index: number, delta: number) {
    setQuantities((prev) => {
      const copy = [...prev];
      const max = tickets[index]?.maxPerPerson ?? 99;
      const next = Math.min(Math.max((copy[index] ?? 0) + delta, 0), max);
      copy[index] = next;
      return copy;
    });
  }

  function setQty(index: number, value: number) {
    setQuantities((prev) => {
      const copy = [...prev];
      const max = tickets[index]?.maxPerPerson ?? 99;
      copy[index] = Math.min(Math.max(Math.floor(value) || 0, 0), max);
      return copy;
    });
  }

  function handleAddToCart(index: number) {
    const qty = quantities[index] ?? 0;
    if (qty <= 0) return; // no-op
    // simple placeholder behavior — in a real app you'd call a cart action
    alert(`Added ${qty} x ${tickets[index].label} to cart`);
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
          {tickets.map((t: any, i: number) => {
            const accents = [
              'from-blue-500 to-blue-600',
              'from-indigo-500 to-indigo-600',
              'from-emerald-500 to-emerald-600',
              'from-rose-500 to-rose-600',
            ];
            const accent = accents[i % accents.length];
            const isPopular = !!t.mostPopular || i === 0;
            const qty = quantities[i] ?? 0;

            return (
              <div key={i} className="flex h-full flex-col">
                <div className={`group rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm transition-transform transform hover:scale-[1.01] hover:shadow-2xl hover:ring-4 hover:ring-blue-300/30 flex-1 flex flex-col bg-white dark:bg-gray-900`}>
                  {/* colored header */}
                  <div className={`px-6 py-4 bg-linear-to-r ${accent} text-white`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold opacity-95">{t.label}</div>
                        <div className="mt-1 text-3xl font-extrabold">{t.price}</div>
                      </div>
                      <div className="text-right">
                        {isPopular && <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">Most Popular</div>}
                        <div className="mt-2 text-xs opacity-90">{t.availabilityText}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {t.highlights && (
                        <ul className="grid gap-2 text-sm text-gray-700 dark:text-gray-300">
                          {t.highlights.map((h: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/90" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Max {t.maxPerPerson} per person</div>
                        <div className="flex items-center gap-2">
                          <button aria-label={`decrease ${t.label}`} onClick={() => changeQty(i, -1)} className="rounded border px-3 py-1 text-sm">-</button>
                          <input aria-label="quantity" value={qty} onChange={(e) => setQty(i, Number(e.target.value))} type="number" min={0} className="w-16 rounded border px-2 py-1 text-center text-sm bg-white dark:bg-gray-900" />
                          <button aria-label={`increase ${t.label}`} onClick={() => changeQty(i, 1)} className="rounded border px-3 py-1 text-sm">+</button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button onClick={() => handleAddToCart(i)} disabled={qty <= 0} className={`w-full rounded-md px-4 py-2 text-white font-semibold ${qty > 0 ? `bg-linear-to-r ${accent} hover:opacity-95` : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}>
                          {qty > 0 ? `Add ${qty} to cart` : 'Select quantity'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
