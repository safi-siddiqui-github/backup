import { EnhancedGameTemplate, GameType, GameCategory, GameMechanics, Question } from './enhanced-games';

export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  category: GameCategory;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  minParticipants: number;
  maxParticipants: number;
  requiresCamera: boolean;
  requiresMotion: boolean;
  requiresAudio: boolean;
  featured: boolean;
  tags: string[];
  mechanics: GameMechanics;
  settings: GameSettings;
  questions?: Question[];
  content: GameContent;
  status: 'draft' | 'active' | 'completed' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

export interface GameSettings {
  allowAnonymous: boolean;
  showLeaderboard: boolean;
  timeLimit?: number;
  durationPerQuestion?: number;
  maxParticipants?: number;
  requirePhoto: boolean;
}

export interface GameContent {
  // Lightning Trivia content
  triviaQuestions?: TriviaQuestion[];
  
  // Photo Challenge content
  photoChallenges?: PhotoChallenge[];
  
  // Prediction Master content
  predictions?: PredictionEvent[];
  predictionEvents?: PredictionEvent[];
  
  // Choose Story content
  storyBranches?: StoryBranch[];
  
  // Battle Opinions content
  opinionBattles?: OpinionBattle[];
  
  // Puzzle Rush content
  puzzleItems?: PuzzleItem[];
  
  // AR Treasure Hunt content
  treasures?: TreasureItem[];
  
  // Tap Race content
  raceVariants?: RaceVariant[];
  
  // Digital Bingo content
  bingoItems?: BingoItem[];
  
  // Crowd Puzzle content
  puzzlePieces?: PuzzlePiece[];
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  timeLimit: number;
  category?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PhotoChallenge {
  id: string;
  title: string;
  description: string;
  criteria: string;
  timeLimit: number;
  maxSubmissions: number;
}

export interface PredictionEvent {
  id: string;
  title: string;
  description: string;
  options: string[];
  category?: string;
  points?: number;
  revealTime?: Date;
}

export interface StoryBranch {
  id: string;
  title: string;
  content: string;
  chapter: number;
  choices: StoryChoice[];
}

export interface StoryChoice {
  id: string;
  text: string;
  consequence: string;
  nextBranchId?: string;
}

export interface OpinionBattle {
  id: string;
  question: string;
  optionA: { text: string; description: string };
  optionB: { text: string; description: string };
  category: string;
  timeLimit: number;
}

export interface PuzzleItem {
  id: string;
  question: string;
  answer: string;
  hint: string;
  type: 'math' | 'wordplay' | 'logic' | 'trivia' | 'word' | 'riddle';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  timeLimit: number;
}

export interface TreasureItem {
  id: string;
  name: string;
  location: string;
  hint: string;
  points: number;
  found: boolean;
}

export interface RaceVariant {
  id: string;
  name: string;
  description: string;
  targetTaps: number;
  timeLimit: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  multiplier?: number;
}

export interface BingoItem {
  id: string;
  text: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare';
}

export interface PuzzlePiece {
  id: string;
  shape: string;
  color: string;
  position: { x: number; y: number };
  rotation: number;
  assignedTo?: string;
  completed: boolean;
}

export interface GameResult {
  participantId: string;
  participantName: string;
  score: number;
  completedAt: Date;
  details: any;
}

export interface Answer {
  questionId: string;
  answer: string;
  points: number;
}