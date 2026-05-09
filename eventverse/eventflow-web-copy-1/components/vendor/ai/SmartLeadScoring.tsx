"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Brain, DollarSign, Target, TrendingUp } from "lucide-react";
import { useState } from "react";

interface SmartLeadScoringProps {
  children: React.ReactNode;
}

const SmartLeadScoring = ({ children }: SmartLeadScoringProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const leads = [
    {
      id: "1",
      name: "Johnson Wedding",
      email: "sarah@example.com",
      budget: 15000,
      eventDate: "2024-06-15",
      score: 92,
      factors: {
        budgetFit: 95,
        timeline: 85,
        serviceMatch: 98,
        responseTime: 90,
        location: 88,
      },
      insights: [
        "High budget match for your premium packages",
        "Event date allows sufficient preparation time",
        "Perfect match for your wedding photography specialty",
        "Client shows quick response pattern",
      ],
      recommendedActions: [
        "Send premium package proposal",
        "Schedule consultation within 24 hours",
        "Highlight wedding portfolio examples",
      ],
    },
    {
      id: "2",
      name: "Corporate Tech Summit",
      email: "events@techcorp.com",
      budget: 25000,
      eventDate: "2024-05-20",
      score: 78,
      factors: {
        budgetFit: 88,
        timeline: 70,
        serviceMatch: 75,
        responseTime: 85,
        location: 80,
      },
      insights: [
        "Good budget potential but tight timeline",
        "Corporate events are secondary specialty",
        "Location requires additional travel time",
        "Company has history of large events",
      ],
      recommendedActions: [
        "Clarify specific requirements",
        "Adjust pricing for timeline pressure",
        "Partner with local vendors if needed",
      ],
    },
    {
      id: "3",
      name: "Birthday Celebration",
      email: "party@gmail.com",
      budget: 5000,
      eventDate: "2024-04-10",
      score: 45,
      factors: {
        budgetFit: 35,
        timeline: 60,
        serviceMatch: 40,
        responseTime: 50,
        location: 65,
      },
      insights: [
        "Budget below typical minimum",
        "Event type doesn't match core services",
        "Short timeline for quality delivery",
        "May be price-shopping multiple vendors",
      ],
      recommendedActions: [
        "Suggest scaled-down package",
        "Clarify expectations vs budget",
        "Consider referring to partner vendor",
      ],
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreLevel = (score: number) => {
    if (score >= 80) return "High Priority";
    if (score >= 60) return "Medium Priority";
    return "Low Priority";
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Smart Lead Scoring
          </DialogTitle>
          <DialogDescription>
            AI-powered lead analysis and prioritization based on conversion
            probability
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Overview */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">High Priority Leads</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Total Potential Value
                    </p>
                    <p className="text-2xl font-bold">$45K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Avg AI Score</p>
                    <p className="text-2xl font-bold">72</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead List */}
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card
                key={lead.id}
                className={`cursor-pointer transition-all ${
                  selectedLead === lead.id
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
                onClick={() =>
                  setSelectedLead(selectedLead === lead.id ? null : lead.id)
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getScoreColor(lead.score)}>
                        {lead.score} Score
                      </Badge>
                      <p className="mt-1 text-xs text-gray-500">
                        {getScoreLevel(lead.score)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-gray-600">Budget</p>
                      <p className="font-medium">
                        ${lead.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Event Date</p>
                      <p className="font-medium">
                        {new Date(lead.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeline</p>
                      <p className="font-medium">
                        {Math.ceil(
                          (new Date(lead.eventDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </p>
                    </div>
                  </div>

                  {selectedLead === lead.id && (
                    <div className="space-y-4 border-t pt-4">
                      {/* Scoring Factors */}
                      <div>
                        <h4 className="mb-3 font-medium">AI Scoring Factors</h4>
                        <div className="space-y-2">
                          {Object.entries(lead.factors).map(
                            ([factor, score]) => (
                              <div
                                key={factor}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm capitalize">
                                  {factor.replace(/([A-Z])/g, " $1")}
                                </span>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={score}
                                    className="h-2 w-20"
                                  />
                                  <span className="w-8 text-sm font-medium">
                                    {score}
                                  </span>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* AI Insights */}
                      <div>
                        <h4 className="mb-2 font-medium">AI Insights</h4>
                        <ul className="space-y-1">
                          {lead.insights.map((insight, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-blue-500"></span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended Actions */}
                      <div>
                        <h4 className="mb-2 font-medium">
                          Recommended Actions
                        </h4>
                        <div className="space-y-2">
                          {lead.recommendedActions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="mr-2 mb-2"
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartLeadScoring;
