import { EnhancedGameTemplate } from '@/types/enhanced-games';

export const enhancedGameTemplates: EnhancedGameTemplate[] = [
  {
    id: 'lightning-trivia-1',
    name: 'Lightning Trivia',
    title: 'Lightning Trivia Challenge',
    type: 'lightning-trivia',
    description: 'Rapid-fire questions with time pressure. Faster correct answers = more points!',
    category: 'Trivia & Knowledge',
    difficulty: 'Medium',
    duration: 10,
    minParticipants: 2,
    maxParticipants: 1000,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['trivia', 'knowledge', 'fast-paced', 'competitive'],
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
    }
  },
  {
    id: 'tap-race-1',
    name: 'Tap Race',
    title: 'Ultimate Tap Race',
    type: 'tap-race',
    description: 'See who can tap the fastest! Pure speed competition.',
    category: 'Fast-Paced',
    difficulty: 'Easy',
    duration: 3,
    minParticipants: 2,
    maxParticipants: 500,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['speed', 'competition', 'simple', 'energetic'],
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
    }
  },
  {
    id: 'photo-challenge-1',
    name: 'Photo Challenge',
    title: 'Creative Photo Mission',
    type: 'photo-challenge',
    description: 'Complete creative photo challenges and let others vote!',
    category: 'AR & Camera',
    difficulty: 'Medium',
    duration: 15,
    minParticipants: 3,
    maxParticipants: 200,
    requiresCamera: true,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['creative', 'photos', 'voting', 'social'],
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
    }
  },
  {
    id: 'crowd-puzzle-1',
    name: 'Crowd Puzzle',
    title: 'Giant Digital Jigsaw',
    type: 'crowd-puzzle',
    description: 'Everyone gets a puzzle piece to solve collaboratively!',
    category: 'Collaborative',
    difficulty: 'Hard',
    duration: 20,
    minParticipants: 10,
    maxParticipants: 1000,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['collaborative', 'puzzle', 'teamwork', 'creative'],
    mechanics: {
      interactionType: 'collaborative',
      inputMethod: 'touch',
      realTimeFeatures: 'synchronized',
      deviceFeatures: [],
      scoringSystem: 'collaboration'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: false,
      requirePhoto: false
    }
  },
  {
    id: 'digital-bingo-1',
    name: 'Digital Bingo',
    title: 'Interactive Bingo Cards',
    type: 'digital-bingo',
    description: 'Classic bingo with a digital twist and multiple winners!',
    category: 'Group Competition',
    difficulty: 'Easy',
    duration: 25,
    minParticipants: 5,
    maxParticipants: 500,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: false,
    tags: ['bingo', 'classic', 'luck', 'social'],
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
    }
  },
  {
    id: 'prediction-master-1',
    name: 'Prediction Master',
    title: 'Wedding Predictions',
    type: 'prediction-master',
    description: 'Predict what will happen during the wedding and score points for accuracy!',
    category: 'Poll & Decision',
    difficulty: 'Easy',
    duration: 15,
    minParticipants: 3,
    maxParticipants: 1000,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['predictions', 'voting', 'fun', 'interactive'],
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
    }
  },
  {
    id: 'choose-story-1',
    name: 'Choose Your Story',
    title: 'Crowd Story Builder',
    type: 'choose-story',
    description: 'Help build an interactive story together by voting on plot choices!',
    category: 'Story & Roleplay',
    difficulty: 'Medium',
    duration: 20,
    minParticipants: 5,
    maxParticipants: 500,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['story', 'creative', 'collaborative', 'voting'],
    mechanics: {
      interactionType: 'collaborative',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'votes'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: false,
      requirePhoto: false
    }
  },
  {
    id: 'battle-opinions-1',
    name: 'Battle of Opinions',
    title: 'Would You Rather Wedding Edition',
    type: 'battle-opinions',
    description: 'Vote on fun "would you rather" questions about wedding scenarios!',
    category: 'Poll & Decision',
    difficulty: 'Easy',
    duration: 10,
    minParticipants: 3,
    maxParticipants: 1000,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: false,
    tags: ['voting', 'opinions', 'fun', 'interactive'],
    mechanics: {
      interactionType: 'competitive',
      inputMethod: 'touch',
      realTimeFeatures: 'live-updates',
      deviceFeatures: [],
      scoringSystem: 'votes'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    }
  },
  {
    id: 'puzzle-rush-1',
    name: 'Puzzle Rush',
    title: 'Quick Puzzle Challenge',
    type: 'puzzle-rush',
    description: 'Solve mini puzzles as fast as you can! Speed and accuracy matter.',
    category: 'Word & Puzzle',
    difficulty: 'Hard',
    duration: 8,
    minParticipants: 2,
    maxParticipants: 200,
    requiresCamera: false,
    requiresMotion: false,
    requiresAudio: false,
    featured: true,
    tags: ['puzzles', 'speed', 'brain-teaser', 'competitive'],
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
      timeLimit: 60,
      requirePhoto: false
    }
  },
  {
    id: 'ar-treasure-1',
    name: 'AR Treasure Hunt',
    title: 'Augmented Reality Treasure Hunt',
    type: 'ar-treasure',
    description: 'Use your camera to find hidden virtual treasures around the venue!',
    category: 'AR & Camera',
    difficulty: 'Medium',
    duration: 25,
    minParticipants: 1,
    maxParticipants: 100,
    requiresCamera: true,
    requiresMotion: true,
    requiresAudio: false,
    featured: false,
    tags: ['ar', 'treasure-hunt', 'camera', 'exploration'],
    mechanics: {
      interactionType: 'individual',
      inputMethod: 'camera',
      realTimeFeatures: 'live-updates',
      deviceFeatures: ['camera', 'motion'],
      scoringSystem: 'points'
    },
    settings: {
      allowAnonymous: true,
      showLeaderboard: true,
      requirePhoto: false
    }
  }
];

export const getFeaturedGames = () => {
  return enhancedGameTemplates.filter(game => game.featured);
};

export const getGamesByCategory = (category: string) => {
  return enhancedGameTemplates.filter(game => game.category === category);
};

export const searchGames = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return enhancedGameTemplates.filter(game => 
    game.name.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};