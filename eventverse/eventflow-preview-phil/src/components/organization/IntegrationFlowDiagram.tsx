import { MessageSquare, Shield, CheckSquare, RefreshCw, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const IntegrationFlowDiagram = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Connect",
      description: "Link Microsoft Teams",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Authenticate",
      description: "Sign in with M365",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckSquare,
      title: "Select Data",
      description: "Choose what to sync",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: RefreshCw,
      title: "Auto-Sync",
      description: "Daily updates",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="relative py-8">
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative">
              <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-center mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="bg-background rounded-full p-2 shadow-lg border border-border">
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntegrationFlowDiagram;
