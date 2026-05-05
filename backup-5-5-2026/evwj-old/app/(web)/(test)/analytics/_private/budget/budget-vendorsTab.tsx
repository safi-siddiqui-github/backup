const vendors = [
    {
        name: "Grand Venue Hall",
        due: "Mar 1",
        amount: 15000,
        paymentStatus: "Paid",
        quality: 9.5,
        reliability: 9.8,
        response: "< 2 hours",
        payment: "On-time",
    },
    {
        name: "Elite Catering Co.",
        due: "Apr 15",
        amount: 9800,
        paymentStatus: "Paid",
        quality: 8.9,
        reliability: 9.2,
        response: "< 4 hours",
        payment: "On-time",
    },
    {
        name: "Picture Perfect",
        due: "May 1",
        amount: 7500,
        paymentStatus: "Paid",
        quality: 9.7,
        reliability: 9.5,
        response: "< 3 hours",
        payment: "On-time",
    },
    {
        name: "Bloom & Blossom",
        due: "May 10",
        amount: 3200,
        paymentStatus: "Pending",
        quality: 8.5,
        reliability: 8.7,
        response: "< 6 hours",
        payment: "Late",
    },
    {
        name: "Sound Waves DJ",
        due: "Apr 20",
        amount: 3250,
        paymentStatus: "Overdue",
        quality: 9.1,
        reliability: 7.8,
        response: "< 12 hours",
        payment: "Late",
    },
];

const proposalStats = {
    total: 34,
    accepted: 18,
    pending: 7,
    declined: 9,
    acceptanceRate: 53,
    avgResponse: "2.8 days",
    avgRounds: 1.6,
    avgDiscount: "12.3%",
};

const paymentSchedule = [
    { name: "Bloom & Blossom", due: "May 10", amount: 3200, priority: "high" },
    { name: "Final Catering Payment", due: "May 15", amount: 1500, priority: "high" },
    { name: "Lighting & AV", due: "May 18", amount: 2800, priority: "medium" },
    { name: "Transportation", due: "May 20", amount: 1400, priority: "low" },
];

function getPriorityColor(priority: string) {
    switch (priority) {
        case "high":
            return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
        case "medium":
            return "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30";
        case "low":
            return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
        default:
            return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
}


export default function BudgetVendorsTab() {
    return (
        <div className="space-y-12">
            <h1 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-slate-100">
                Vendor Performance & Management
            </h1>

            {/* Vendor Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border rounded-2xl bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="text-left text-gray-500 dark:text-slate-400">
                            <th className="py-2 px-4">Vendor</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Due Date</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Quality</th>
                            <th className="py-2 px-4">Reliability</th>
                            <th className="py-2 px-4">Response Time</th>
                            <th className="py-2 px-4">Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((v) => (
                            <tr key={v.name} className="border-b border-gray-100 dark:border-slate-800">
                                <td className="py-2 px-4 font-semibold text-slate-800 dark:text-slate-100">{v.name}</td>
                                <td className="py-2 px-4">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                        v.paymentStatus === "Paid"
                                            ? "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30"
                                            : v.paymentStatus === "Pending"
                                            ? "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30"
                                            : "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30"
                                    }`}>
                                        {v.paymentStatus}
                                    </span>
                                </td>
                                <td className="py-2 px-4 font-mono">{v.due}</td>
                                <td className="py-2 px-4 font-mono text-indigo-600 dark:text-indigo-400">${v.amount.toLocaleString()}</td>
                                <td className="py-2 px-4 font-mono">{v.quality} / 10</td>
                                <td className="py-2 px-4 font-mono">{v.reliability} / 10</td>
                                <td className="py-2 px-4 font-mono">{v.response}</td>
                                <td className={`py-2 px-4 font-mono ${v.payment === "On-time" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{v.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Proposal & Negotiation Analytics */}
            <section className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/60 dark:bg-indigo-950/30 shadow-inner p-8 flex flex-col md:flex-row gap-8 items-center justify-between mt-12">
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 text-center bg-white/80 dark:bg-slate-900/60">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{proposalStats.total}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Total Proposals</div>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 text-center bg-white/80 dark:bg-slate-900/60">
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{proposalStats.accepted}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Accepted</div>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 text-center bg-white/80 dark:bg-slate-900/60">
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{proposalStats.pending}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Pending</div>
                    </div>
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 text-center bg-white/80 dark:bg-slate-900/60">
                        <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">{proposalStats.declined}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">Declined</div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 text-base mt-6 md:mt-0">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Proposal & Negotiation Analytics</h3>
                    <div>Acceptance Rate: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{proposalStats.acceptanceRate}%</span></div>
                    <div>Avg Response Time: <span className="font-mono">{proposalStats.avgResponse}</span></div>
                    <div>Avg Negotiation Rounds: <span className="font-mono">{proposalStats.avgRounds}</span></div>
                    <div>Avg Discount Achieved: <span className="font-mono">{proposalStats.avgDiscount}</span></div>
                </div>
            </section>

            {/* Upcoming Payment Schedule */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md p-6 mt-12">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-slate-100">
                    Upcoming Payment Schedule
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 dark:text-slate-400">
                                <th className="py-2 pr-4">Vendor</th>
                                <th className="py-2 pr-4">Due Date</th>
                                <th className="py-2 pr-4">Amount</th>
                                <th className="py-2 pr-4">Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentSchedule.map((p) => (
                                <tr key={p.name} className="border-b border-gray-100 dark:border-slate-800">
                                    <td className="py-2 pr-4 font-semibold">{p.name}</td>
                                    <td className="py-2 pr-4 font-mono">{p.due}</td>
                                    <td className="py-2 pr-4 font-mono text-indigo-600 dark:text-indigo-400">${p.amount.toLocaleString()}</td>
                                    <td className="py-2 pr-4">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getPriorityColor(p.priority)}`}>{p.priority}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}