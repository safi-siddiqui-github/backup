import { Survey, SurveyQuestion, SurveyResponse, QuestionResponse, Respondent } from "./types";

// Mock respondent data with full profiles
const mockRespondentProfiles: Respondent[] = [
  { id: "r1", name: "John Smith", email: "john.smith@email.com", company: "Tech Corp", title: "Senior Manager" },
  { id: "r2", name: "Sarah Johnson", email: "sarah.johnson@email.com", company: "Innovation Labs", title: "Product Director" },
  { id: "r3", name: "Mike Davis", email: "mike.davis@email.com", company: "Digital Solutions", title: "CEO" },
  { id: "r4", name: "Emily Wilson", email: "emily.wilson@email.com", company: "Startup Inc", title: "Marketing Lead" },
  { id: "r5", name: "David Brown", email: "david.brown@email.com", company: "Enterprise Co", title: "CTO" },
  { id: "r6", name: "Lisa Martinez", email: "lisa.martinez@email.com", company: "Global Systems", title: "VP Sales" },
  { id: "r7", name: "James Taylor", email: "james.taylor@email.com", company: "CloudTech", title: "Engineer" },
  { id: "r8", name: "Anna Anderson", email: "anna.anderson@email.com", company: "DataWorks", title: "Analyst" },
  { id: "r9", name: "Robert Thomas", email: "robert.thomas@email.com", company: "MediaGroup", title: "Director" },
  { id: "r10", name: "Maria Garcia", email: "maria.garcia@email.com", company: "FinTech Solutions", title: "CFO" },
  { id: "r11", name: "William Jackson", email: "william.jackson@email.com", company: "Consulting Pros", title: "Partner" },
  { id: "r12", name: "Jennifer White", email: "jennifer.white@email.com", company: "Design Studio", title: "Creative Director" },
  { id: "r13", name: "Michael Harris", email: "michael.harris@email.com", company: "Software Inc", title: "Developer" },
  { id: "r14", name: "Jessica Martin", email: "jessica.martin@email.com", company: "Retail Group", title: "Manager" },
  { id: "r15", name: "Christopher Thompson", email: "christopher.thompson@email.com", company: "Logistics Plus", title: "Operations Lead" },
  { id: "r16", name: "Amanda Rodriguez", email: "amanda.rodriguez@email.com", company: "Health Systems", title: "Administrator" },
  { id: "r17", name: "Matthew Lewis", email: "matthew.lewis@email.com", company: "Education Tech", title: "Principal" },
  { id: "r18", name: "Stephanie Walker", email: "stephanie.walker@email.com", company: "Legal Associates", title: "Partner" },
  { id: "r19", name: "Daniel Hall", email: "daniel.hall@email.com", company: "Manufacturing Co", title: "Plant Manager" },
  { id: "r20", name: "Nicole Allen", email: "nicole.allen@email.com", company: "Real Estate Group", title: "Broker" },
  { id: "r21", name: "Anthony Young", email: "anthony.young@email.com", company: "Hospitality Inc", title: "GM" },
  { id: "r22", name: "Michelle King", email: "michelle.king@email.com", company: "Pharma Corp", title: "Researcher" },
  { id: "r23", name: "Mark Wright", email: "mark.wright@email.com", company: "Auto Group", title: "Sales Director" },
  { id: "r24", name: "Laura Lopez", email: "laura.lopez@email.com", company: "Energy Solutions", title: "Engineer" },
  { id: "r25", name: "Steven Hill", email: "steven.hill@email.com", company: "Telecom Services", title: "Manager" },
  { id: "r26", name: "Kimberly Scott", email: "kimberly.scott@email.com", company: "Fashion Brands", title: "Designer" },
  { id: "r27", name: "Joshua Green", email: "joshua.green@email.com", company: "Sports Management", title: "Agent" },
  { id: "r28", name: "Donna Adams", email: "donna.adams@email.com", company: "Publishing House", title: "Editor" },
  { id: "r29", name: "Kenneth Baker", email: "kenneth.baker@email.com", company: "Insurance Co", title: "Underwriter" },
  { id: "r30", name: "Carol Gonzalez", email: "carol.gonzalez@email.com", company: "Travel Agency", title: "Owner" },
  { id: "r31", name: "Paul Nelson", email: "paul.nelson@email.com", company: "Construction Ltd", title: "Project Manager" },
  { id: "r32", name: "Sharon Carter", email: "sharon.carter@email.com", company: "Beauty Products", title: "Brand Manager" },
  { id: "r33", name: "Brian Mitchell", email: "brian.mitchell@email.com", company: "Security Services", title: "Director" },
  { id: "r34", name: "Helen Perez", email: "helen.perez@email.com", company: "Arts Foundation", title: "Curator" },
  { id: "r35", name: "Kevin Roberts", email: "kevin.roberts@email.com", company: "Gaming Studio", title: "Lead Designer" },
  { id: "r36", name: "Betty Turner", email: "betty.turner@email.com", company: "Food Services", title: "Chef" },
  { id: "r37", name: "George Phillips", email: "george.phillips@email.com", company: "Transportation Co", title: "Operations" },
  { id: "r38", name: "Dorothy Campbell", email: "dorothy.campbell@email.com", company: "Non-Profit Org", title: "Executive Director" },
  { id: "r39", name: "Edward Parker", email: "edward.parker@email.com", company: "Architecture Firm", title: "Architect" },
  { id: "r40", name: "Ruth Evans", email: "ruth.evans@email.com", company: "HR Consulting", title: "Consultant" },
  { id: "r41", name: "Guest User", email: "guest001@event.com" },
  { id: "r42", name: "Anonymous", email: "guest002@event.com" },
  { id: "r43", name: "Event Attendee", email: "guest003@event.com" },
  { id: "r44", name: "Survey Participant", email: "guest004@event.com" },
  { id: "r45", name: "Feedback Provider", email: "guest005@event.com" }
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
    const respondent = mockRespondentProfiles[i % mockRespondentProfiles.length];
    
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
      respondentId: respondent.id,
      respondent: respondent,
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
      anonymizeResponses: false,
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
      anonymizeResponses: false,
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
      anonymizeResponses: false,
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