import { Survey, SurveyQuestion, SurveyResponse, QuestionResponse } from "./types";

// Mock respondent names
const mockRespondents = [
  "john.smith@email.com", "sarah.johnson@email.com", "mike.davis@email.com", 
  "emily.wilson@email.com", "david.brown@email.com", "lisa.martinez@email.com",
  "james.taylor@email.com", "anna.anderson@email.com", "robert.thomas@email.com",
  "maria.garcia@email.com", "william.jackson@email.com", "jennifer.white@email.com",
  "michael.harris@email.com", "jessica.martin@email.com", "christopher.thompson@email.com",
  "amanda.rodriguez@email.com", "matthew.lewis@email.com", "stephanie.walker@email.com",
  "daniel.hall@email.com", "nicole.allen@email.com", "anthony.young@email.com",
  "michelle.king@email.com", "mark.wright@email.com", "laura.lopez@email.com",
  "steven.hill@email.com", "kimberly.scott@email.com", "joshua.green@email.com",
  "donna.adams@email.com", "kenneth.baker@email.com", "carol.gonzalez@email.com",
  "paul.nelson@email.com", "sharon.carter@email.com", "brian.mitchell@email.com",
  "helen.perez@email.com", "kevin.roberts@email.com", "betty.turner@email.com",
  "george.phillips@email.com", "dorothy.campbell@email.com", "edward.parker@email.com",
  "ruth.evans@email.com", "guest001", "guest002", "guest003", "guest004", "guest005"
];

// Generate random date within last 30 days
const generateRandomDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime()));
};

// Generate responses for different question types
const generateResponseForQuestion = (question: SurveyQuestion): string | string[] | number => {
  switch (question.type) {
    case 'multiple-choice':
      if (question.options && question.options.length > 0) {
        return question.options[Math.floor(Math.random() * question.options.length)];
      }
      return 'Option 1';
      
    case 'checkbox':
      if (question.options && question.options.length > 0) {
        const numSelected = Math.floor(Math.random() * Math.min(3, question.options.length)) + 1;
        const shuffled = [...question.options].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numSelected);
      }
      return ['Option 1'];
      
    case 'rating':
      const min = question.ratingScale?.min || 1;
      const max = question.ratingScale?.max || 5;
      return Math.floor(Math.random() * (max - min + 1)) + min;
      
    case 'text':
      const textResponses = [
        "Great event, really enjoyed it!",
        "The venue was perfect and the food was delicious.",
        "Could improve the sound system but overall fantastic.",
        "Amazing experience, would definitely attend again.",
        "Well organized and professional.",
        "Loved the networking opportunities.",
        "The speakers were very knowledgeable.",
        "Perfect timing and great content.",
        "Exceeded my expectations in every way.",
        "Minor issues but overall very satisfied.",
        "Outstanding event with great attention to detail.",
        "The location was convenient and accessible.",
        "Wonderful atmosphere and friendly staff.",
        "Informative sessions and valuable insights.",
        "High quality production and seamless execution."
      ];
      return textResponses[Math.floor(Math.random() * textResponses.length)];
      
    case 'date':
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 60)); // Random date in next 60 days
      return eventDate.toISOString().split('T')[0];
      
    case 'number':
      return Math.floor(Math.random() * 100) + 1;
      
    default:
      return 'No response';
  }
};

// Generate comprehensive survey responses
export const generateMockSurveyResponses = (survey: Survey, count: number = 45): SurveyResponse[] => {
  const responses: SurveyResponse[] = [];
  
  for (let i = 0; i < count; i++) {
    const isCompleted = Math.random() > 0.15; // 85% completion rate
    const respondentId = mockRespondents[i % mockRespondents.length];
    
    const questionResponses: QuestionResponse[] = [];
    
    for (const question of survey.questions) {
      // Some incomplete responses might skip optional questions
      if (!isCompleted && !question.isRequired && Math.random() > 0.4) {
        continue;
      }
      
      questionResponses.push({
        questionId: question.id,
        answer: generateResponseForQuestion(question)
      });
    }
    
    responses.push({
      id: `response_${i + 1}`,
      surveyId: survey.id,
      respondentId,
      responses: questionResponses,
      submittedAt: generateRandomDate(),
      completed: isCompleted
    });
  }
  
  return responses;
};

// Enhanced mock surveys with comprehensive data
export const mockSurveysWithResponses: Survey[] = [
  {
    id: "survey_1",
    title: "Event Feedback Survey",
    description: "Help us improve your event experience by sharing your thoughts and feedback.",
    eventId: "event_1",
    isActive: true,
    created: new Date(2024, 0, 15),
    updatedAt: new Date(2024, 1, 10),
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "How would you rate the overall event experience?",
        isRequired: true,
        order: 1,
        ratingScale: { min: 1, max: 5, labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"] }
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "Which aspect of the event did you enjoy most?",
        isRequired: true,
        order: 2,
        options: ["Keynote Speakers", "Networking Sessions", "Food & Beverages", "Venue & Atmosphere", "Interactive Activities"]
      },
      {
        id: "q3",
        type: "checkbox",
        question: "What topics would you like to see in future events? (Select all that apply)",
        isRequired: false,
        order: 3,
        options: ["Technology Trends", "Leadership Development", "Industry Insights", "Career Growth", "Innovation", "Sustainability"]
      },
      {
        id: "q4",
        type: "text",
        question: "What could we have done better? Please share your suggestions.",
        isRequired: false,
        order: 4
      },
      {
        id: "q5",
        type: "rating",
        question: "How likely are you to recommend this event to a colleague?",
        isRequired: true,
        order: 5,
        ratingScale: { min: 0, max: 10, labels: ["Not at all likely", "Extremely likely"] }
      },
      {
        id: "q6",
        type: "date",
        question: "When would be the best time for our next event?",
        isRequired: false,
        order: 6
      }
    ],
    responses: [], // Will be populated below
    settings: {
      allowAnonymous: true,
      showResults: false,
      multipleSubmissions: false,
      collectEmail: true
    }
  },
  {
    id: "survey_2",
    title: "Product Launch Feedback",
    description: "We'd love to hear your thoughts on our new product launch presentation.",
    eventId: "event_1",
    isActive: true,
    created: new Date(2024, 1, 1),
    updatedAt: new Date(2024, 1, 5),
    questions: [
      {
        id: "q7",
        type: "rating",
        question: "How clear was the product presentation?",
        isRequired: true,
        order: 1,
        ratingScale: { min: 1, max: 5 }
      },
      {
        id: "q8",
        type: "multiple-choice",
        question: "Which feature interests you most?",
        isRequired: true,
        order: 2,
        options: ["Advanced Analytics", "User Interface", "Integration Capabilities", "Mobile Support", "Security Features"]
      },
      {
        id: "q9",
        type: "text",
        question: "Any questions about the product that weren't addressed?",
        isRequired: false,
        order: 3
      },
      {
        id: "q10",
        type: "rating",
        question: "How likely are you to purchase this product?",
        isRequired: true,
        order: 4,
        ratingScale: { min: 1, max: 10 }
      }
    ],
    responses: [], // Will be populated below
    settings: {
      allowAnonymous: false,
      showResults: true,
      multipleSubmissions: false,
      collectEmail: true
    }
  },
  {
    id: "survey_3",
    title: "Venue & Catering Assessment",
    description: "Rate your experience with our venue, catering, and logistics.",
    eventId: "event_1",
    isActive: false,
    created: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 20),
    questions: [
      {
        id: "q11",
        type: "rating",
        question: "How would you rate the venue facilities?",
        isRequired: true,
        order: 1,
        ratingScale: { min: 1, max: 5 }
      },
      {
        id: "q12",
        type: "multiple-choice",
        question: "How was the food quality?",
        isRequired: true,
        order: 2,
        options: ["Excellent", "Very Good", "Good", "Fair", "Poor"]
      },
      {
        id: "q13",
        type: "checkbox",
        question: "Which dietary preferences were well accommodated?",
        isRequired: false,
        order: 3,
        options: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Halal", "Kosher"]
      },
      {
        id: "q14",
        type: "text",
        question: "Additional comments about the venue or food?",
        isRequired: false,
        order: 4
      }
    ],
    responses: [], // Will be populated below
    settings: {
      allowAnonymous: true,
      showResults: false,
      multipleSubmissions: true,
      collectEmail: false
    }
  }
];

// Generate responses for all surveys
mockSurveysWithResponses.forEach(survey => {
  survey.responses = generateMockSurveyResponses(survey, 45);
});

export { mockSurveysWithResponses as mockSurveys };