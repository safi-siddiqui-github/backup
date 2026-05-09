export interface EnhancedGameTemplate {
  id: string;
  name: string;
  title: string;
  type: GameType;
  description: string;
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
}

export type GameType = 
  | 'lightning-trivia' 
  | 'prediction-master'
  | 'choose-story'
  | 'battle-opinions'
  | 'tap-race'
  | 'puzzle-rush'
  | 'crowd-puzzle'
  | 'sentence-builder'
  | 'ar-treasure'
  | 'photo-challenge'
  | 'beat-tapper'
  | 'crowd-dj'
  | 'murder-mystery'
  | 'escape-room'
  | 'digital-bingo'
  | 'survivor-elimination'
  | 'step-challenge'
  | 'digital-hot-potato'
  | 'crossword-clash'
  | 'random-drawing';

export type GameCategory = 
  | 'Trivia & Knowledge'
  | 'Poll & Decision'
  | 'Fast-Paced'
  | 'Collaborative'
  | 'AR & Camera'
  | 'Music & Rhythm'
  | 'Story & Roleplay'
  | 'Group Competition'
  | 'Physical Activity'
  | 'Word & Puzzle'
  | 'Prize & Rewards';

export interface GameMechanics {
  interactionType: 'individual' | 'collaborative' | 'competitive' | 'team-based';
  inputMethod: 'touch' | 'camera' | 'motion' | 'audio' | 'text' | 'drawing';
  realTimeFeatures: 'live-updates' | 'synchronized' | 'turn-based';
  deviceFeatures: string[];
  scoringSystem: 'points' | 'time-based' | 'accuracy' | 'collaboration' | 'votes';
}

export interface GameSettings {
  allowAnonymous: boolean;
  showLeaderboard: boolean;
  timeLimit?: number;
  durationPerQuestion?: number;
  maxParticipants?: number;
  requirePhoto: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "text" | "photo" | "rating";
  options?: string[];
  correctAnswer?: string;
  points: number;
}