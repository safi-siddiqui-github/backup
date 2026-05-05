export default function MediaInsightsTab() {
  return (
    <div className="text-gray-700 dark:text-slate-200">
      <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Insights</h3>
      <ul className="list-disc ml-6 space-y-2">
        <li>AI-powered highlight reel generated for event recap.</li>
        <li>Peak engagement moments: <span className="font-semibold text-yellow-700 dark:text-yellow-300">First Dance, Cake Cutting</span></li>
        <li>Most downloaded file: <span className="font-semibold text-indigo-700 dark:text-indigo-300">IMG_1023.jpg</span></li>
        <li>Recommendation: Increase upload bandwidth for faster processing.</li>
      </ul>
    </div>
  );
}