export type GameQuestionType = {
  id?: string;
  text?: string;
  options?: string[];
  correct?: number;
  points?: number;
  // type?: number;
  correctAnswer?: string; // use string instead of index
  type?: "multiple-choice" | "text" | "photo" | "rating";

  question?: string;
  answer?: string;
};

export type GameSettingType = {
  timeLimit?: number;
  showLeaderboard?: boolean;
  allowAnonymous?: boolean;
  categories?: string[];
  roundTime?: number;
  timePerQuestion?: number;
  totalQuestions?: number;
  challenges?: string[];
  allowMultipleSubmissions?: boolean;
  themes?: string[];
  emojis?: string[];
  bingoItems?: string[];
  maxSentenceLength?: number;
  revealDate?: string;
  storyPrompts?: string[];
  predictions?: string[];
  maxVotesPerPerson?: number;
  maxChainLength?: number;
  acronyms?: string[];
  holidays?: string[];
  activities?: string[];
  votingEnabled?: boolean;
  requirePhoto?: boolean;
  maxParticipants?: number;
};

export interface GameTemplate {
  id: string;
  title: string;
  type:
    | "trivia"
    | "poll"
    | "icebreaker"
    | "scavenger"
    | "photo-challenge"
    | "prediction"
    | "team-activity"
    | "voting"
    | "word-game";
  category:
    | "engagement"
    | "social"
    | "competitive"
    | "creative"
    | "educational"
    | "seasonal";
  description: string;
  duration: number; // in minutes
  minParticipants: number;
  maxParticipants?: number;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  icon: string;
  questions?: GameQuestionType[];
  settings: GameSettingType;
  featured?: boolean;
  popularity?: number;
  // question: GameQuestionType;
}

export interface GameType {
  id?: string;
  title: string;
  type?:
    | "trivia"
    | "poll"
    | "icebreaker"
    | "scavenger"
    | "photo-challenge"
    | "prediction";
  description: string;
  status?: "draft" | "active" | "completed";
  participants?: number;
  duration: number;
  createdAt?: Date;
  questions?: GameQuestionType[];
  results?: {
    score?: number;
  }[];
  settings: GameSettingType;
}
