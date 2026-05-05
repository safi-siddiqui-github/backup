import { FaPercent, FaMoneyBillWave, FaUserFriends, FaPiggyBank, FaDollarSign, FaUndo, FaClock, FaListUl } from "react-icons/fa";

const promoData = [
    {
        code: "EARLYBIRD20",
        discount: "20% discount",
        conversion: 78.5,
        uses: 34,
        revenue: 2720,
        savings: 680,
        avgOrder: 80,
        color: "#6366f1",
    },
    {
        code: "FRIEND10",
        discount: "10% discount",
        conversion: 65.2,
        uses: 23,
        revenue: 3082,
        savings: 342,
        avgOrder: 134,
        color: "#3b82f6",
    },
    {
        code: "VIP50",
        discount: "50% discount",
        conversion: 92,
        uses: 8,
        revenue: 1196,
        savings: 1196,
        avgOrder: 150,
        color: "#f59e42",
    },
    {
        code: "STUDENT15",
        discount: "15% discount",
        conversion: 71.3,
        uses: 18,
        revenue: 1206,
        savings: 213,
        avgOrder: 67,
        color: "#10b981",
    },
];

const refundData = {
    totalRefunds: 8,
    refundRate: 4.2,
    totalAmount: 1245,
    avgProcessing: 2.3,
    reasons: [
        { reason: "Schedule Conflict", count: 3, percent: 37.5, color: "#6366f1" },
        { reason: "Financial", count: 2, percent: 25, color: "#3b82f6" },
        { reason: "Personal Emergency", count: 2, percent: 25, color: "#f59e42" },
        { reason: "Other", count: 1, percent: 12.5, color: "#ef4444" },
    ],
};

export default function TicketPromosTab() {
    return (
        <div className="space-y-10">
            {/* Promo Code Performance */}
            <div className="w-full bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-300 tracking-wide flex items-center justify-center gap-2">
                    <FaPercent className="inline-block text-xl mb-1" /> Promo Code Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {promoData.map((promo) => (
                        <div key={promo.code} className="rounded-xl p-6 shadow bg-white dark:bg-gray-800 border-t-4" style={{ borderColor: promo.color }}>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-bold" style={{ color: promo.color }}>{promo.code}</span>
                                <span className="text-sm font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded" style={{ color: promo.color }}>{promo.discount}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaUserFriends className="text-gray-400 dark:text-gray-500" />
                                <span className="text-lg font-bold" style={{ color: promo.color }}>{promo.conversion}%</span>
                                <span className="text-xs text-gray-500 ml-1">conversion</span>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-2">
                                <div className="flex items-center gap-1 text-sm">
                                    <FaListUl className="text-gray-400 dark:text-gray-500" /> Uses: <span className="font-semibold ml-1">{promo.uses}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <FaDollarSign className="text-green-500" /> Revenue: <span className="font-semibold ml-1">${promo.revenue.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <FaPiggyBank className="text-yellow-500" /> Savings: <span className="font-semibold ml-1">${promo.savings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <FaMoneyBillWave className="text-blue-500" /> Avg Order: <span className="font-semibold ml-1">${promo.avgOrder}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Refund Analytics */}
            <div className="w-full bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mt-8">
                <h2 className="text-2xl font-extrabold mb-8 text-center text-pink-700 dark:text-pink-300 tracking-wide flex items-center justify-center gap-2">
                    <FaUndo className="inline-block text-xl mb-1" /> Refund Analytics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-lg">
                            <FaListUl className="text-gray-400 dark:text-gray-500" />
                            <span className="font-semibold">Total Refunds:</span>
                            <span className="text-pink-600 dark:text-pink-300 font-bold">{refundData.totalRefunds}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg">
                            <FaPercent className="text-gray-400 dark:text-gray-500" />
                            <span className="font-semibold">Refund Rate:</span>
                            <span className="text-pink-600 dark:text-pink-300 font-bold">{refundData.refundRate}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg">
                            <FaDollarSign className="text-green-500" />
                            <span className="font-semibold">Total Amount:</span>
                            <span className="text-pink-600 dark:text-pink-300 font-bold">${refundData.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg">
                            <FaClock className="text-gray-400 dark:text-gray-500" />
                            <span className="font-semibold">Avg Processing:</span>
                            <span className="text-pink-600 dark:text-pink-300 font-bold">{refundData.avgProcessing} days</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="font-semibold mb-2 flex items-center gap-2"><FaListUl className="text-gray-400 dark:text-gray-500" />Refund Reasons</div>
                        {refundData.reasons.map((r) => (
                            <div key={r.reason} className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ background: r.color }}></span>
                                <span className="flex-1">{r.reason}</span>
                                <span className="font-semibold">{r.count} refunds</span>
                                <span className="text-xs text-gray-500">{r.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}