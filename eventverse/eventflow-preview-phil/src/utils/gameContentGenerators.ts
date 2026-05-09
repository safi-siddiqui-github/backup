import { 
  EnhancedGameTemplate, 
  GameType 
} from '@/types/enhanced-games';

import { 
  GameContent, 
  TriviaQuestion, 
  PhotoChallenge, 
  PredictionEvent, 
  StoryBranch,
  OpinionBattle, 
  PuzzleItem, 
  TreasureItem, 
  RaceVariant, 
  BingoItem,
  PuzzlePiece
} from '@/types/game';

export const generateGameContent = (template: EnhancedGameTemplate): GameContent => {
  switch (template.type) {
    case 'lightning-trivia':
      return { triviaQuestions: generateTriviaQuestions(template) };
    case 'photo-challenge':
      return { photoChallenges: generatePhotoChallenges(template) };
    case 'prediction-master':
      return { predictionEvents: generatePredictions(template) };
    case 'choose-story':
      return { storyBranches: generateStoryBranches(template) };
    case 'battle-opinions':
      return { opinionBattles: generateOpinionBattles(template) };
    case 'puzzle-rush':
      return { puzzleItems: generatePuzzles(template) };
    case 'ar-treasure':
      return { treasures: generateTreasures(template) };
    case 'tap-race':
      return { raceVariants: generateRaceVariants(template) };
    case 'digital-bingo':
      return { bingoItems: generateBingoItems(template) };
    case 'crowd-puzzle':
      return { puzzlePieces: generatePuzzlePieces(template) };
    default:
      return {};
  }
};

// Generate sample trivia questions
const generateTriviaQuestions = (template: EnhancedGameTemplate): TriviaQuestion[] => {
  const sampleQuestions = [
    {
      question: "What does HTML stand for?",
      options: ["Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Hypertext Markup Language"],
      correctAnswer: "Hyper Text Markup Language",
      category: "Technology",
      difficulty: "Easy" as const,
      points: 10,
      timeLimit: 15
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      category: "Science",
      difficulty: "Easy" as const,
      points: 10,
      timeLimit: 12
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: "Canberra",
      category: "Geography",
      difficulty: "Medium" as const,
      points: 15,
      timeLimit: 18
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
      category: "Art",
      difficulty: "Easy" as const,
      points: 10,
      timeLimit: 15
    },
    {
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      correctAnswer: "2",
      category: "Mathematics",
      difficulty: "Medium" as const,
      points: 15,
      timeLimit: 20
    }
  ];

  return sampleQuestions.map((q, index) => ({
    id: `q${index + 1}`,
    ...q
  }));
};

// Generate sample photo challenges
const generatePhotoChallenges = (template: EnhancedGameTemplate): PhotoChallenge[] => {
  return [
    {
      id: 'photo1',
      title: 'Candid Moments',
      description: 'Capture genuine, unposed moments of joy and emotion',
      criteria: 'Natural expressions and authentic emotions',
      timeLimit: 300,
      maxSubmissions: 1
    },
    {
      id: 'photo2',
      title: 'Creative Angles',
      description: 'Take a photo from an interesting or unusual perspective',
      criteria: 'Unique viewpoint that tells a story',
      timeLimit: 400,
      maxSubmissions: 1
    },
    {
      id: 'photo3',
      title: 'Group Fun',
      description: 'Capture a group of people having fun together',
      criteria: 'Multiple people engaged in enjoyable activity',
      timeLimit: 250,
      maxSubmissions: 1
    },
    {
      id: 'photo4',
      title: 'Detail Focus',
      description: 'Find interesting details that others might miss',
      criteria: 'Close-up shot highlighting small details',
      timeLimit: 350,
      maxSubmissions: 1
    }
  ];
};

// Generate sample predictions
const generatePredictions = (template: EnhancedGameTemplate): PredictionEvent[] => {
  return [
    {
      id: 'pred1',
      title: 'Next Hour Weather',
      description: 'What will the weather be like in the next hour?',
      options: ['Sunny', 'Cloudy', 'Rainy', 'Stormy'],
      category: 'Weather'
    },
    {
      id: 'pred2',
      title: 'Event Attendance',
      description: 'How many people will attend this event?',
      options: ['Under 50', '50-100', '100-200', 'Over 200'],
      category: 'Events'
    },
    {
      id: 'pred3',
      title: 'Popular Activity',
      description: 'Which activity will be most popular today?',
      options: ['Dancing', 'Conversation', 'Games', 'Food'],
      category: 'Social'
    },
    {
      id: 'pred4',
      title: 'Time Duration',
      description: 'How long will the main event last?',
      options: ['Under 1 hour', '1-2 hours', '2-3 hours', 'Over 3 hours'],
      category: 'Timing'
    }
  ];
};

// Generate sample story branches
const generateStoryBranches = (template: EnhancedGameTemplate): StoryBranch[] => {
  return [
    {
      id: 'story1',
      title: 'The Beginning',
      content: 'It was the best of times at this magical event...',
      chapter: 1,
      choices: [
        {
          id: 'choice1',
          text: 'Go left towards the music',
          consequence: 'You find an amazing dance party!'
        },
        {
          id: 'choice2',
          text: 'Go right towards the food',
          consequence: 'You discover delicious treats!'
        }
      ]
    },
    {
      id: 'story2',
      title: 'The Middle',
      content: 'As the story continues, new adventures await...',
      chapter: 2,
      choices: [
        {
          id: 'choice3',
          text: 'Join the conversation',
          consequence: 'You make new friends!'
        },
        {
          id: 'choice4',
          text: 'Take photos',
          consequence: 'You capture amazing memories!'
        }
      ]
    },
    {
      id: 'story3',
      title: 'The Conclusion',
      content: 'As the event winds down, you reflect on the experience...',
      chapter: 3,
      choices: [
        {
          id: 'choice5',
          text: 'Share your favorite moment',
          consequence: 'Everyone shares their highlights!'
        },
        {
          id: 'choice6',
          text: 'Plan the next gathering',
          consequence: 'You start planning another event!'
        }
      ]
    }
  ];
};

// Generate sample opinion battles
const generateOpinionBattles = (template: EnhancedGameTemplate): OpinionBattle[] => {
  return [
    {
      id: 'battle1',
      question: 'What\'s better for productivity?',
      optionA: {
        text: 'Morning person schedule',
        description: 'Early start, early finish'
      },
      optionB: {
        text: 'Night owl schedule', 
        description: 'Late start, late finish'
      },
      category: 'lifestyle',
      timeLimit: 30
    },
    {
      id: 'battle2',
      question: 'Better way to learn new skills?',
      optionA: {
        text: 'Online courses',
        description: 'Flexible, self-paced learning'
      },
      optionB: {
        text: 'In-person workshops',
        description: 'Interactive, hands-on experience'
      },
      category: 'education',
      timeLimit: 30
    },
    {
      id: 'battle3',
      question: 'Ideal vacation style?',
      optionA: {
        text: 'Adventure and exploration',
        description: 'Hiking, activities, new experiences'
      },
      optionB: {
        text: 'Relaxation and comfort',
        description: 'Beach, spa, leisure time'
      },
      category: 'travel',
      timeLimit: 30
    }
  ];
};

// Generate sample puzzles
const generatePuzzles = (template: EnhancedGameTemplate): PuzzleItem[] => {
  return [
    {
      id: 'puzzle1',
      question: 'Unscramble: GENDIWD',
      answer: 'WEDDING',
      hint: 'The main event!',
      type: 'wordplay',
      difficulty: 'Easy',
      points: 10,
      timeLimit: 20
    },
    {
      id: 'puzzle2',
      question: 'What is 15 × 8?',
      answer: '120',
      hint: 'Multiplication of two numbers',
      type: 'math',
      difficulty: 'Medium',
      points: 15,
      timeLimit: 25
    },
    {
      id: 'puzzle3',
      question: 'Complete the pattern: 2, 4, 8, 16, ?',
      answer: '32',
      hint: 'Each number is doubled',
      type: 'logic',
      difficulty: 'Medium',
      points: 15,
      timeLimit: 30
    },
    {
      id: 'puzzle4',
      question: 'I have keys but no locks. I have space but no room. What am I?',
      answer: 'keyboard',
      hint: 'Used for typing',
      type: 'riddle',
      difficulty: 'Hard',
      points: 20,
      timeLimit: 45
    },
    {
      id: 'puzzle5',
      question: 'What is the capital of France?',
      answer: 'Paris',
      hint: 'City of Light',
      type: 'trivia',
      difficulty: 'Easy',
      points: 10,
      timeLimit: 15
    }
  ];
};

// Generate sample treasures
const generateTreasures = (template: EnhancedGameTemplate): TreasureItem[] => {
  return [
    {
      id: 'treasure1',
      name: 'Golden Compass',
      location: 'Near the main entrance',
      hint: 'Look for something that points the way',
      points: 25,
      found: false
    },
    {
      id: 'treasure2',
      name: 'Silver Key',
      location: 'Behind the red door',
      hint: 'Unlocks new possibilities',
      points: 30,
      found: false
    },
    {
      id: 'treasure3',
      name: 'Crystal Orb',
      location: 'High up on a shelf',
      hint: 'See your future clearly',
      points: 35,
      found: false
    }
  ];
};

// Generate sample race variants
const generateRaceVariants = (template: EnhancedGameTemplate): RaceVariant[] => {
  return [
    {
      id: 'sprint',
      name: 'Lightning Sprint',
      description: 'Tap as fast as you can!',
      targetTaps: 50,
      timeLimit: 10,
      difficulty: 'Easy',
      multiplier: 1.0
    },
    {
      id: 'endurance',
      name: 'Endurance Challenge',
      description: 'Keep tapping for the full duration',
      targetTaps: 200,
      timeLimit: 60,
      difficulty: 'Medium',
      multiplier: 1.5
    },
    {
      id: 'precision',
      name: 'Precision Test',
      description: 'Consistent rhythm wins',
      targetTaps: 100,
      timeLimit: 30,
      difficulty: 'Hard',
      multiplier: 2.0
    }
  ];
};

// Generate sample bingo items
const generateBingoItems = (template: EnhancedGameTemplate): BingoItem[] => {
  return [
    { id: 'bingo1', text: 'Someone mentions the weather', category: 'conversation', rarity: 'common' },
    { id: 'bingo2', text: 'Someone takes a selfie', category: 'social', rarity: 'common' },
    { id: 'bingo3', text: 'Phone rings during event', category: 'technology', rarity: 'common' },
    { id: 'bingo4', text: 'Someone spills a drink', category: 'accidents', rarity: 'uncommon' },
    { id: 'bingo5', text: 'Group photo is taken', category: 'social', rarity: 'common' },
    { id: 'bingo6', text: 'Someone tells a joke', category: 'entertainment', rarity: 'common' },
    { id: 'bingo7', text: 'Music gets changed', category: 'entertainment', rarity: 'uncommon' },
    { id: 'bingo8', text: 'Someone loses their name tag', category: 'accidents', rarity: 'uncommon' },
    { id: 'bingo9', text: 'Surprise guest arrives', category: 'social', rarity: 'rare' },
    { id: 'bingo10', text: 'Technical difficulty occurs', category: 'technology', rarity: 'rare' },
    { id: 'bingo11', text: 'Someone starts dancing', category: 'entertainment', rarity: 'uncommon' },
    { id: 'bingo12', text: 'Food runs out', category: 'food', rarity: 'rare' }
  ];
};

// Generate puzzle pieces for crowd puzzle
const generatePuzzlePieces = (template: EnhancedGameTemplate): PuzzlePiece[] => {
  const participants = template.maxParticipants || 50;
  const pieces: PuzzlePiece[] = [];
  
  for (let i = 0; i < participants; i++) {
    pieces.push({
      id: `piece${i + 1}`,
      shape: ['square', 'circle', 'triangle', 'hexagon'][i % 4],
      color: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'][i % 6],
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      rotation: Math.random() * 360,
      completed: false
    });
  }
  
  return pieces;
};