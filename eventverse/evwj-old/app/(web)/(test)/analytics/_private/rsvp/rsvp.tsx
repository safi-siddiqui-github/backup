import { Brain } from "lucide-react";
import RSVPTabs from "./rsvp-tabs";


export default function AnalyticsBanner() {
  const stats = [
    {
      label: "Predicted No-Shows",
      value: "12",
    },
    {
      label: "Last-Minute RSVPs",
      value: "8",
    },
    {
      label: "Risk of Cancellation",
      value: "6",
    },
    {
      label: "Attendance Probability",
      value: "93%",
    },
  ];



  return (
    <div className="mx-auto w-full">
      <div className="rounded-xl bg-linear-to-r from-indigo-600 via-purple-500 to-pink-500 px-8 py-8 text-white shadow-lg">
        <div className="mb-8 flex items-center gap-3">
          <Brain
            className="h-6 w-6"
            strokeWidth={2}
          />
          <h2 className="text-xl font-bold">AI-Powered Predictive Analytics</h2>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5">
          <div className="flex flex-col">
            <span className="mb-2 text-4xl leading-none font-bold">205</span>
            <span className="mb-2 text-sm font-medium text-purple-100">
              Expected Final Attendees
            </span>
            <div>
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                87% confidence
              </span>
            </div>
          </div>

          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col pt-1"
            >
              <span className="mb-2 text-3xl leading-none font-bold">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-purple-100">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <RSVPTabs />

      
    </div>
  );
}
