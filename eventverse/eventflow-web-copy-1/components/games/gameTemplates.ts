// export interface GameTemplate {
//   id: string;

import { GameQuestionType, GameSettingType } from "@/types/game";

//   participantsts?: string
//   name?: string;
//   title?: string;
//   description: string;
//   category: string;
//   type:
//     | "trivia"
//     | "poll"
//     | "icebreaker"
//     | "scavenger"
//     | "photo-challenge"
//     | "prediction";
//   duration: number;
//   participants: string;
//   difficulty: "Easy" | "Medium" | "Hard";
//   materials?: string[];
//   questions: TemplateQuestion[];
//   settings: {
//     allowAnonymous: boolean;
//     showLeaderboard: boolean;
//     timeLimit?: number;
//     requirePhoto: boolean;
//     maxParticipants?: number;
//   };

//   maxParticipants?: number;
// }

export interface GameTemplate {
  id: string;
  title?: string; // use consistently instead of "name"
  name?: string; // use consistently instead of "name"
  description: string;
  category:
    | "engagement"
    | "social"
    | "competitive"
    | "creative"
    | "educational"
    | "seasonal"
    | string;
  type:
    | "trivia"
    | "poll"
    | "icebreaker"
    | "scavenger"
    | "photo-challenge"
    | "prediction"
    | "team-activity"
    | "voting"
    | "word-game"; // optional, if you want to support more
  duration: number; // in minutes
  // participants?: number; // expected number of participants
  difficulty: "easy" | "medium" | "hard" | string; // normalize casing
  materials?: string[];
  questions: GameQuestionType[];
  settings: GameSettingType;
  maxParticipants?: number;
  featured?: boolean;
  popularity?: number;

  // category?: stirng;
  participants?: string;
  // difficulty?: string;
}

export interface TemplateQuestion {
  text: string;
  type: "multiple-choice" | "text" | "photo" | "rating";
  options?: string[];
  correctAnswer?: string;
  points: number;
  question?: string;
  answer?: string;
}

export const gameTemplates: GameTemplate[] = [
  // Wedding/Engagement Party
  {
    id: "shoe-game",
    name: "The Shoe Game",
    description:
      "The couple answers questions by raising the shoe of who it applies to—fun and insightful.",
    category: "Wedding/Engagement",
    type: "trivia",
    duration: 15,
    participants: "20-100",
    difficulty: "Easy",
    materials: ["Two chairs", "Couple's shoes"],
    questions: [
      {
        text: "Who is more likely to forget their keys?",
        type: "multiple-choice",
        options: ["Bride", "Groom"],
        points: 10,
      },
      {
        text: "Who takes longer to get ready?",
        type: "multiple-choice",
        options: ["Bride", "Groom"],
        points: 10,
      },
      {
        text: "Who is the better cook?",
        type: "multiple-choice",
        options: ["Bride", "Groom"],
        points: 10,
      },
      {
        text: "Who said 'I love you' first?",
        type: "multiple-choice",
        options: ["Bride", "Groom"],
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: false,
      timeLimit: 30,
      requirePhoto: false,
    },
  },
  {
    id: "he-said-she-said",
    name: "He Said/She Said",
    description:
      "Guests guess who said a particular quote or did something first.",
    category: "Wedding/Engagement",
    type: "trivia",
    duration: 20,
    participants: "10-50",
    difficulty: "Medium",
    questions: [
      {
        text: "Who said: 'I knew you were the one when...'?",
        type: "multiple-choice",
        options: ["He said it", "She said it"],
        points: 10,
      },
      {
        text: "Who planned the first date?",
        type: "multiple-choice",
        options: ["He did", "She did"],
        points: 10,
      },
      {
        text: "Who said 'Let's move in together'?",
        type: "multiple-choice",
        options: ["He said it", "She said it"],
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      timeLimit: 45,
      requirePhoto: false,
    },
  },
  {
    id: "find-the-guest",
    name: "Find the Guest",
    description: "Icebreaker bingo featuring facts about other attendees.",
    category: "Wedding/Engagement",
    type: "icebreaker",
    duration: 30,
    participants: "15-100",
    difficulty: "Easy",
    questions: [
      {
        text: "Find someone who has known the couple for over 10 years",
        type: "text",
        points: 5,
      },
      {
        text: "Find someone who went to school with the bride",
        type: "text",
        points: 5,
      },
      {
        text: "Find someone who works in the same field as the groom",
        type: "text",
        points: 5,
      },
    ],
    settings: {
      allowAnonymous: false,
      showLeaderboard: true,
      requirePhoto: false,
    },
  },

  // Bridal Shower
  {
    id: "know-the-bride",
    name: "How Well Do You Know the Bride?",
    description: "Guests answer trivia questions about the bride-to-be.",
    category: "Bridal Shower",
    type: "trivia",
    duration: 15,
    participants: "8-30",
    difficulty: "Medium",
    questions: [
      {
        text: "What is the bride's favorite color?",
        type: "multiple-choice",
        options: ["Blue", "Pink", "Green", "Purple"],
        points: 10,
      },
      {
        text: "Where did the bride go to college?",
        type: "text",
        points: 15,
      },
      {
        text: "What is the bride's dream honeymoon destination?",
        type: "multiple-choice",
        options: ["Paris", "Hawaii", "Italy", "Japan"],
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      timeLimit: 60,
      requirePhoto: false,
    },
  },
  {
    id: "whats-in-purse",
    name: "What's in Your Purse?",
    description:
      "Guests earn points for having items on a wild or bridal-themed checklist.",
    category: "Bridal Shower",
    type: "scavenger",
    duration: 10,
    participants: "5-25",
    difficulty: "Easy",
    materials: ["Checklist", "Prizes"],
    questions: [
      {
        text: "Do you have lip balm in your purse?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        points: 5,
      },
      {
        text: "Do you have a photo of the bride in your purse?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        points: 20,
      },
      {
        text: "Do you have gum or mints?",
        type: "multiple-choice",
        options: ["Yes", "No"],
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false,
    },
  },

  // Baby Shower
  {
    id: "baby-food-guess",
    name: "Guess the Baby Food",
    description: "Guests sample unlabeled baby food and guess the flavors.",
    category: "Baby Shower",
    type: "trivia",
    duration: 20,
    participants: "8-20",
    difficulty: "Medium",
    materials: ["Baby food jars", "Spoons", "Labels"],
    questions: [
      {
        text: "What flavor is baby food #1?",
        type: "multiple-choice",
        options: ["Carrots", "Sweet Potato", "Peas", "Bananas"],
        points: 10,
      },
      {
        text: "What flavor is baby food #2?",
        type: "multiple-choice",
        options: ["Apples", "Pears", "Peaches", "Squash"],
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      timeLimit: 45,
      requirePhoto: false,
    },
  },

  // Corporate/Team Building
  {
    id: "team-trivia",
    name: "Team Trivia",
    description: "Department-themed or general trivia for team bonding.",
    category: "Corporate/Team Building",
    type: "trivia",
    duration: 25,
    participants: "10-50",
    difficulty: "Medium",
    questions: [
      {
        text: "What year was our company founded?",
        type: "text",
        points: 15,
      },
      {
        text: "Which department has the most employees?",
        type: "multiple-choice",
        options: ["Sales", "Engineering", "Marketing", "HR"],
        points: 10,
      },
      {
        text: "What is our company's main mission?",
        type: "text",
        points: 20,
      },
    ],
    settings: {
      allowAnonymous: false,
      showLeaderboard: true,
      timeLimit: 60,
      requirePhoto: false,
    },
  },
  {
    id: "two-truths-lie",
    name: "Two Truths and a Lie",
    description: "Icebreaker where team members reveal surprising facts.",
    category: "Corporate/Team Building",
    type: "icebreaker",
    duration: 20,
    participants: "5-20",
    difficulty: "Easy",
    questions: [
      {
        text: "Share two truths and one lie about yourself",
        type: "text",
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: false,
      showLeaderboard: false,
      requirePhoto: false,
    },
  },

  // Birthday Party - Adult
  {
    id: "never-have-i-ever",
    name: "Never Have I Ever",
    description: "Party-style get-to-know-you game. Can be clean or spicy.",
    category: "Adult Birthday",
    type: "icebreaker",
    duration: 15,
    participants: "5-15",
    difficulty: "Easy",
    questions: [
      {
        text: "Never have I ever... been skydiving",
        type: "multiple-choice",
        options: ["I have", "I haven't"],
        points: 5,
      },
      {
        text: "Never have I ever... eaten sushi",
        type: "multiple-choice",
        options: ["I have", "I haven't"],
        points: 5,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: false,
      requirePhoto: false,
    },
  },

  // Kids Birthday
  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    description: "Kids follow clues to find treats or toys.",
    category: "Kids Birthday",
    type: "scavenger",
    duration: 30,
    participants: "5-15",
    difficulty: "Easy",
    materials: ["Clues", "Treasures", "Map"],
    questions: [
      {
        text: "Find something that rhymes with 'cat'",
        type: "text",
        points: 10,
      },
      {
        text: "Find something blue in the kitchen",
        type: "text",
        points: 10,
      },
    ],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: true,
    },
  },
];

export const templateCategories = [
  {
    id: "wedding",
    name: "Wedding/Engagement",
    icon: "💍",
    description: "Perfect games for wedding receptions and engagement parties",
  },
  {
    id: "bridal-shower",
    name: "Bridal Shower",
    icon: "👰‍♀️",
    description: "Fun activities to celebrate the bride-to-be",
  },
  {
    id: "baby-shower",
    name: "Baby Shower",
    icon: "👶",
    description: "Adorable games for welcoming the new arrival",
  },
  {
    id: "corporate",
    name: "Corporate/Team Building",
    icon: "💼",
    description: "Professional team bonding and networking activities",
  },
  {
    id: "adult-birthday",
    name: "Adult Birthday",
    icon: "🎂",
    description: "Entertaining games for grown-up celebrations",
  },
  {
    id: "kids-birthday",
    name: "Kids Birthday",
    icon: "🎈",
    description: "Active and engaging games for young party-goers",
  },
];
