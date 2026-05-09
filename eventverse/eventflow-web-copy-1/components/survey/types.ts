export interface Survey {
  id: string;
  title: string;
  description: string;
  eventId: string;
  isActive: boolean;
  created: Date;
  updatedAt: Date;
  questions: SurveyQuestion[];
  responses: SurveyResponse[];
  settings: SurveySettings;
}

export interface SurveyQuestion {
  id: string;
  type: "multiple-choice" | "text" | "rating" | "date" | "checkbox" | "number";
  question: string;
  isRequired: boolean;
  order: number;
  options?: string[];
  optionType?: "text" | "date" | "time" | "datetime";
  optionValues?: Array<{
    label: string;
    value: string | Date;
  }>;
  ratingScale?: {
    min: number;
    max: number;
    labels?: string[];
  };
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId: string;
  responses: QuestionResponse[];
  submittedAt: Date;
  completed: boolean;
}

export interface QuestionResponse {
  questionId: string;
  answer: string | string[] | number;
}

export interface SurveySettings {
  allowAnonymous: boolean;
  showResults: boolean;
  multipleSubmissions: boolean;
  collectEmail: boolean;
  endDate?: Date;
}

export interface AnalyticsData {
  surveyId: string;
  totalResponses: number;
  completionRate: number;
  averageTime: number;
  questionAnalytics: QuestionAnalytics[];
}

export interface QuestionAnalytics {
  questionId: string;
  question: string;
  type: string;
  responseCount: number;
  data: unknown;
}
