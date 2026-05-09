import { Game } from '@/types/game';

export const sampleGames: Game[] = [
  // =================== WEDDING GAMES ===================
  {
    id: 'wedding-trivia-romance',
    title: 'Love & Romance Trivia',
    description: 'Test your knowledge of romantic movies, love songs, and famous couples throughout history!',
    type: 'lightning-trivia',
    category: 'Trivia & Knowledge',
    difficulty: 'Medium',
    duration: 15,
    minParticipants: 3,
    maxParticipants: 100,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['wedding', 'romance', 'trivia', 'couples'],
    mechanics: {
      interactionType: 'competitive',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'time-based'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      timeLimit: 15,
      requirePhoto: false
    },
    content: {
      triviaQuestions: [
        {
          id: 'q1',
          question: 'In which Shakespeare play do Romeo and Juliet appear?',
          options: ['Hamlet', 'Romeo and Juliet', 'Macbeth', 'Othello'],
          correctAnswer: 'Romeo and Juliet',
          points: 10,
          timeLimit: 15,
          difficulty: 'Easy'
        },
        {
          id: 'q2',
          question: 'Which song by Whitney Houston became a wedding classic?',
          options: ['I Will Always Love You', 'I Wanna Dance with Somebody', 'Greatest Love of All', 'How Will I Know'],
          correctAnswer: 'I Will Always Love You',
          points: 15,
          timeLimit: 15,
          difficulty: 'Medium'
        }
      ]
    },
    status: 'published',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },

  {
    id: 'wedding-photo-memories',
    title: 'Wedding Memory Maker',
    description: 'Capture creative photos that tell the story of love! Perfect for creating lasting wedding memories.',
    type: 'photo-challenge',
    category: 'AR & Camera',
    difficulty: 'Easy',
    duration: 20,
    minParticipants: 5,
    maxParticipants: 50,
    requiresCamera: true,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['wedding', 'photography', 'memories', 'creative'],
    mechanics: {
      interactionType: 'collaborative',
      inputMethod: 'camera',
      realTimeFeatures: 'live-updates',
      deviceFeatures: ['camera'],
      scoringSystem: 'votes'
    },
    settings: {
      allowAnonymous: false,
      showLeaderboard: true,
      requirePhoto: true
    },
    content: {
      photoChallenges: [
        {
          id: 'challenge1',
          title: 'Something Blue',
          description: 'Find and photograph something blue at the wedding venue',
          criteria: 'Must include something traditionally blue from the "something blue" wedding tradition',
          timeLimit: 300,
          maxSubmissions: 1
        },
        {
          id: 'challenge2',
          title: 'Happy Tears',
          description: 'Capture a moment of joy or emotional tears (respectfully)',
          criteria: 'Should show genuine emotion and happiness',
          timeLimit: 600,
          maxSubmissions: 1
        }
      ]
    },
    status: 'published',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },

  {
    id: 'wedding-predictions',
    title: 'Wedding Day Predictions',
    description: 'Predict what will happen during the wedding ceremony and reception! Score points for accuracy.',
    type: 'prediction-master',
    category: 'Poll & Decision',
    difficulty: 'Easy',
    duration: 10,
    minParticipants: 5,
    maxParticipants: 200,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['wedding', 'predictions', 'fun', 'interactive'],
    mechanics: {
      interactionType: 'individual',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'accuracy'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    },
    content: {
      predictionEvents: [
        {
          id: 'pred1',
          title: 'First Dance Song Duration',
          description: 'How long will the couple\'s first dance last?',
          options: ['Under 2 minutes', '2-3 minutes', '3-4 minutes', 'Over 4 minutes']
        },
        {
          id: 'pred2',
          title: 'Wedding Cake Cutting',
          description: 'Will the couple smash cake in each other\'s faces?',
          options: ['Yes, playfully', 'No, they\'ll be gentle', 'Only one will do it', 'They\'ll feed each other']
        }
      ]
    },
    status: 'published',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },

  // =================== ENTERTAINMENT GAMES ===================
  {
    id: 'speed-tapping-championship',
    title: 'Speed Tapping Championship',
    description: 'The ultimate test of finger speed! Compete in various tapping challenges and claim victory!',
    type: 'tap-race',
    category: 'Fast-Paced',
    difficulty: 'Easy',
    duration: 5,
    minParticipants: 2,
    maxParticipants: 1000,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['speed', 'competition', 'tapping', 'reaction'],
    mechanics: {
      interactionType: 'competitive',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'points'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      timeLimit: 30,
      requirePhoto: false
    },
    content: {
      raceVariants: [
        {
          id: 'sprint',
          name: 'Lightning Sprint',
          targetTaps: 50,
          timeLimit: 10,
          description: 'Tap 50 times as fast as you can!',
          difficulty: 'Easy',
          multiplier: 1
        },
        {
          id: 'endurance',
          name: 'Endurance Challenge',
          targetTaps: 200,
          timeLimit: 30,
          description: 'Keep tapping steadily for the full duration',
          difficulty: 'Medium',
          multiplier: 1.5
        }
      ]
    },
    status: 'published',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25')
  },

  {
    id: 'party-bingo-classic',
    title: 'Classic Party Bingo',
    description: 'Spot these hilarious things happening at any party or social gathering. First to get a line wins!',
    type: 'digital-bingo',
    category: 'Group Competition',
    difficulty: 'Easy',
    duration: 25,
    minParticipants: 5,
    maxParticipants: 200,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['party', 'bingo', 'social', 'observation'],
    mechanics: {
      interactionType: 'individual',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'points'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    },
    content: {
      bingoItems: [
        {
          id: 'bingo1',
          text: 'Someone spills a drink',
          category: 'accident',
          rarity: 'common'
        },
        {
          id: 'bingo2',
          text: 'Someone takes a selfie',
          category: 'social',
          rarity: 'common'
        },
        {
          id: 'bingo3',
          text: 'Someone mentions the weather',
          category: 'conversation',
          rarity: 'common'
        },
        {
          id: 'bingo4',
          text: 'A phone rings loudly',
          category: 'technical',
          rarity: 'common'
        },
        {
          id: 'bingo5',
          text: 'Someone starts dancing alone',
          category: 'entertainment',
          rarity: 'uncommon'
        },
        {
          id: 'bingo6',
          text: 'Someone tells an embarrassing story',
          category: 'social',
          rarity: 'uncommon'
        },
        {
          id: 'bingo7',
          text: 'Someone loses their keys',
          category: 'accident',
          rarity: 'rare'
        },
        {
          id: 'bingo8',
          text: 'A surprise guest arrives',
          category: 'surprise',
          rarity: 'rare'
        }
      ]
    },
    status: 'published',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05')
  }
];

// Utility functions for working with sample games
export const getSampleGamesByCategory = (category: string) => {
  return sampleGames.filter(game => game.category === category);
};

export const getSampleGamesByType = (type: string) => {
  return sampleGames.filter(game => game.type === type);
};

export const getFeaturedSampleGames = () => {
  return sampleGames.filter(game => game.featured);
};

export const getSampleGamesByTags = (tags: string[]) => {
  return sampleGames.filter(game => 
    tags.some(tag => game.tags.includes(tag))
  );
};

export const searchSampleGames = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return sampleGames.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};