import { Card } from "@/components/ui/card";
import { AlertTriangle, Layers, TrendingDown } from "lucide-react";

export const ProblemSolutionSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Lost Leads",
      description: "48% of vendor leads never get responded to within 24 hours",
      color: "text-red-500",
    },
    {
      icon: Layers,
      title: "Fragmented Tools",
      description: "Managing 5+ different platforms for one client?",
      color: "text-orange-500",
    },
    {
      icon: TrendingDown,
      title: "Revenue Leaks",
      description: "Average vendor loses $18K annually from poor follow-up",
      color: "text-yellow-500",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Losing Business to Missed Opportunities
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <Icon className={`w-16 h-16 mx-auto mb-4 ${problem.color}`} />
                <h3 className="text-2xl font-bold mb-3">{problem.title}</h3>
                <p className="text-muted-foreground text-lg">{problem.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xl md:text-2xl font-semibold text-primary">
            EventVerse's Vendor Portal eliminates these problems with one unified, AI-powered platform
          </p>
        </div>
      </div>
    </section>
  );
};
