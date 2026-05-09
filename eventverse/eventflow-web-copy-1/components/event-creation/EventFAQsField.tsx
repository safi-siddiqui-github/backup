"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { GripVertical, HelpCircle, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface Props {
  data: FAQ[];
  onUpdate: (data: FAQ[]) => void;
}

const EventFAQsField = ({ data = [], onUpdate }: Props) => {
  const [faqs, setFaqs] = useState<FAQ[]>(data);

  useEffect(() => {
    setFaqs(data);
  }, [data]);

  const handleUpdate = (newFaqs: FAQ[]) => {
    setFaqs(newFaqs);
    onUpdate(newFaqs);
  };

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now().toString(),
      question: "",
      answer: "",
      category: "general",
    };
    handleUpdate([...faqs, newFAQ]);
  };

  const updateFAQ = (id: string, updates: Partial<FAQ>) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id ? { ...faq, ...updates } : faq,
    );
    handleUpdate(updatedFaqs);
  };

  const removeFAQ = (id: string) => {
    const updatedFaqs = faqs.filter((faq) => faq.id !== id);
    handleUpdate(updatedFaqs);
  };

  const moveFAQ = (index: number, direction: "up" | "down") => {
    const newFaqs = [...faqs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < faqs.length) {
      [newFaqs[index], newFaqs[targetIndex]] = [
        newFaqs[targetIndex],
        newFaqs[index],
      ];
      handleUpdate(newFaqs);
    }
  };

  const categories = [
    { value: "general", label: "General" },
    { value: "tickets", label: "Tickets & Registration" },
    { value: "logistics", label: "Event Logistics" },
    { value: "food", label: "Food & Beverages" },
    { value: "accommodation", label: "Travel & Accommodation" },
    { value: "accessibility", label: "Accessibility" },
    { value: "contact", label: "Contact & Support" },
  ];

  const commonQuestions = [
    {
      category: "general",
      question: "What should I bring to the event?",
      answer: "",
    },
    { category: "general", question: "What is the dress code?", answer: "" },
    {
      category: "general",
      question: "Is the event rain or shine?",
      answer: "",
    },
    {
      category: "tickets",
      question: "Can I get a refund for my ticket?",
      answer: "",
    },
    {
      category: "tickets",
      question: "Can I transfer my ticket to someone else?",
      answer: "",
    },
    {
      category: "logistics",
      question: "What time does the event start and end?",
      answer: "",
    },
    { category: "logistics", question: "Where should I park?", answer: "" },
    { category: "food", question: "Will food be provided?", answer: "" },
    {
      category: "food",
      question: "Can you accommodate dietary restrictions?",
      answer: "",
    },
    {
      category: "accessibility",
      question: "Is the venue wheelchair accessible?",
      answer: "",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HelpCircle className="text-muted-foreground h-5 w-5" />
          <Label className="text-base font-medium">
            Frequently Asked Questions
          </Label>
        </div>
        <Button
          onClick={addFAQ}
          size="sm"
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <Card className="bg-muted/20 border-dashed">
          <CardContent className="pt-6">
            <div className="py-8 text-center">
              <HelpCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-lg font-semibold">No FAQs yet</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Add frequently asked questions to help attendees get quick
                answers
              </p>

              {/* Quick Add Common Questions */}
              <div className="mx-auto max-w-md space-y-2">
                <h4 className="text-left text-sm font-medium">
                  Quick Add Common Questions:
                </h4>
                {commonQuestions.slice(0, 5).map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    className="hover:bg-muted w-full rounded border p-2 text-left text-sm transition-colors"
                    onClick={() => {
                      const newFAQ: FAQ = {
                        id: Date.now().toString(),
                        question: preset.question,
                        answer: preset.answer,
                        category: preset.category,
                      };
                      handleUpdate([...faqs, newFAQ]);
                    }}
                  >
                    {preset.question}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card
              key={faq.id}
              className="bg-white"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="text-muted-foreground h-4 w-4 cursor-move" />
                    <span className="text-muted-foreground text-sm">
                      FAQ {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFAQ(index, "up")}
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => moveFAQ(index, "down")}
                      disabled={index === faqs.length - 1}
                    >
                      ↓
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFAQ(faq.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Category</Label>
                  <Select
                    value={faq.category || "general"}
                    onValueChange={(value) =>
                      updateFAQ(faq.id, { category: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem
                          key={cat.value}
                          value={cat.value}
                        >
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) =>
                      updateFAQ(faq.id, { question: e.target.value })
                    }
                    placeholder="What is your question?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) =>
                      updateFAQ(faq.id, { answer: e.target.value })
                    }
                    placeholder="Provide a clear and helpful answer..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* FAQ Preview */}
      {faqs.length > 0 && faqs.some((faq) => faq.question && faq.answer) && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary text-sm">FAQ Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqs
              .filter((faq) => faq.question && faq.answer)
              .map((faq, index) => (
                <div
                  key={faq.id}
                  className="space-y-1"
                >
                  <h4 className="text-sm font-medium">Q: {faq.question}</h4>
                  <p className="text-muted-foreground pl-3 text-sm">
                    A: {faq.answer}
                  </p>
                  {index < faqs.length - 1 && <hr className="my-2" />}
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventFAQsField;
