export interface GameTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  questions?: any[];
  settings?: any;
}

export const gameTemplates: GameTemplate[] = [
  {
    id: 'basic-trivia',
    name: 'Basic Trivia',
    type: 'trivia',
    description: 'Simple question and answer trivia game',
    questions: [],
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    }
  }
];