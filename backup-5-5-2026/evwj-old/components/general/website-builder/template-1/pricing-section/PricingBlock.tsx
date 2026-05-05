import React from 'react';
import { Linkedin, Facebook } from 'lucide-react';

function SpeakerCard({ s }: { s: any }) {
  return (
    <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm p-6 flex flex-col items-center text-center">
      <img src={s.image || 'https://i.pravatar.cc/160'} alt={s.name} className="h-28 w-28 rounded-full object-cover" />
      <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{s.name}</h4>
      <div className="text-sm text-gray-600 dark:text-gray-300">{s.role}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{s.company}</div>
      {s.bio && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{s.bio}</p>}
      <div className="mt-3 flex gap-3">
        {s.linkedin && (
          <a href={s.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        {s.facebook && (
          <a href={s.facebook} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">
            <Facebook className="h-5 w-5" />
          </a>
        )}
      </div>
    </article>
  );
}

function PriceCard({ p }: { p: any }) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transform transition hover:scale-105 hover:shadow-2xl">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{p.label}</div>
            <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{p.price}</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{p.sub}</div>
          </div>
          <div className="text-right text-sm text-gray-400">{p.availabilityText}</div>
        </div>

        {p.highlights && (
          <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            {p.highlights.map((h: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-600" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <button className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">{p.cta || 'Get Ticket'}</button>
        </div>
      </div>
    </div>
  );
}

export default function PricingBlock({ data }: { data: any }) {
  const { speakers = [], tickets = [], title = 'Meet Our Speakers', subtitle = 'Learn from industry experts and thought leaders' } = data || {};

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>

        {/* Speakers */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((s: any, i: number) => (
            <SpeakerCard key={i} s={s} />
          ))}
        </div>

        {/* Tickets */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Event Tickets</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Choose the perfect ticket for your needs</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {tickets.map((t: any, i: number) => (
              <PriceCard key={i} p={t} />
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">All prices are in USD. Group discounts available for 5+ tickets.</p>
        </div>
      </div>
    </section>
  );
}
