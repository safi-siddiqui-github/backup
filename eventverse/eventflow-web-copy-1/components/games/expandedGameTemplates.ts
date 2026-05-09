"use client";

import { GameTemplate } from "@/types/game";

export const expandedGameTemplates: GameTemplate[] = [
  // TRIVIA GAMES
  {
    id: "wedding-trivia",
    title: "Wedding Trivia",
    type: "trivia",
    category: "engagement",
    description: "Test your knowledge about the happy couple",
    duration: 15,
    minParticipants: 1,
    difficulty: "easy",
    tags: ["wedding", "couples", "fun facts"],
    icon: "Heart",
    featured: true,
    popularity: 95,
    questions: [
      {
        text: "Where did the couple first meet?",
        options: ["Coffee shop", "University", "Work", "Dating app"],
        correct: 1,
      },
      {
        text: "What's their favorite vacation destination?",
        options: ["Beach", "Mountains", "City", "Countryside"],
        correct: 0,
      },
    ],
    settings: { timeLimit: 30, showLeaderboard: true },
  },
  {
    id: "company-trivia",
    title: "Company Knowledge Quiz",
    type: "trivia",
    category: "educational",
    description: "How well do you know your workplace?",
    duration: 20,
    minParticipants: 1,
    difficulty: "medium",
    tags: ["corporate", "team building", "knowledge"],
    icon: "Building",
    popularity: 87,
    questions: [
      {
        text: "What year was the company founded?",
        options: ["2010", "2012", "2015", "2018"],
        correct: 2,
      },
      {
        text: "How many offices do we have globally?",
        options: ["5", "8", "12", "15"],
        correct: 1,
      },
    ],
    settings: { timeLimit: 45, showLeaderboard: true },
  },
  {
    id: "movie-trivia",
    title: "Movie Night Trivia",
    type: "trivia",
    category: "engagement",
    description: "Test your movie knowledge",
    duration: 25,
    minParticipants: 1,
    difficulty: "medium",
    tags: ["movies", "entertainment", "pop culture"],
    icon: "Film",
    popularity: 92,
    questions: [
      {
        text: "Which movie won the Oscar for Best Picture in 2023?",
        options: ["Top Gun", "Everything Everywhere", "Avatar", "Elvis"],
        correct: 1,
      },
    ],
    settings: { timeLimit: 30, showLeaderboard: true },
  },

  // ICEBREAKER GAMES
  {
    id: "two-truths-lie",
    title: "Two Truths and a Lie",
    type: "icebreaker",
    category: "social",
    description: "Share three statements, others guess the lie",
    duration: 20,
    minParticipants: 3,
    maxParticipants: 20,
    difficulty: "easy",
    tags: ["getting to know", "conversation", "guessing"],
    icon: "Users",
    featured: true,
    popularity: 89,
    settings: { allowAnonymous: false, roundTime: 3 },
  },
  {
    id: "desert-island",
    title: "Desert Island Choices",
    type: "icebreaker",
    category: "social",
    description: "What would you bring to a desert island?",
    duration: 15,
    minParticipants: 2,
    difficulty: "easy",
    tags: ["imagination", "conversation", "preferences"],
    icon: "MapPin",
    popularity: 76,
    settings: {
      allowAnonymous: true,
      categories: ["books", "music", "tools", "food"],
    },
  },
  {
    id: "rapid-fire-questions",
    title: "Rapid Fire Questions",
    type: "icebreaker",
    category: "engagement",
    description: "Quick personal questions to spark conversation",
    duration: 10,
    minParticipants: 2,
    difficulty: "easy",
    tags: ["quick", "personal", "fun"],
    icon: "Zap",
    popularity: 84,
    settings: { timePerQuestion: 10, totalQuestions: 20 },
  },

  // PHOTO CHALLENGES
  {
    id: "photo-scavenger",
    title: "Photo Scavenger Hunt",
    type: "photo-challenge",
    category: "creative",
    description: "Find and photograph specific items or scenes",
    duration: 30,
    minParticipants: 1,
    difficulty: "medium",
    tags: ["photography", "exploration", "creativity"],
    icon: "Camera",
    featured: true,
    popularity: 91,
    settings: {
      challenges: [
        "Something red",
        "A group selfie",
        "Your favorite food",
        "A sunset view",
      ],
      allowMultipleSubmissions: true,
    },
  },
  {
    id: "before-after",
    title: "Before & After Photos",
    type: "photo-challenge",
    category: "creative",
    description: "Show transformation photos with creative themes",
    duration: 25,
    minParticipants: 1,
    difficulty: "easy",
    tags: ["transformation", "creativity", "storytelling"],
    icon: "ArrowRightLeft",
    popularity: 78,
    settings: {
      themes: ["morning vs evening", "formal vs casual", "then vs now"],
    },
  },
  {
    id: "emoji-recreation",
    title: "Emoji Recreation",
    type: "photo-challenge",
    category: "creative",
    description: "Recreate famous emojis with real photos",
    duration: 20,
    minParticipants: 1,
    difficulty: "medium",
    tags: ["emoji", "recreation", "humor"],
    icon: "Smile",
    popularity: 85,
    settings: { emojis: ["😂", "🤔", "😍", "🤯", "🥳"] },
  },

  // TEAM ACTIVITIES
  {
    id: "team-building-bingo",
    title: "Team Building Bingo",
    type: "team-activity",
    category: "social",
    description: "Find team members who match bingo descriptions",
    duration: 25,
    minParticipants: 8,
    maxParticipants: 50,
    difficulty: "easy",
    tags: ["team building", "networking", "discovery"],
    icon: "Grid3x3",
    popularity: 88,
    settings: {
      bingoItems: [
        "Has traveled to 3+ countries",
        "Speaks 2+ languages",
        "Has a pet",
        "Born in a different state",
        "Plays an instrument",
      ],
    },
  },
  {
    id: "collaborative-story",
    title: "Collaborative Storytelling",
    type: "team-activity",
    category: "creative",
    description: "Build a story together, one sentence at a time",
    duration: 15,
    minParticipants: 3,
    maxParticipants: 15,
    difficulty: "medium",
    tags: ["storytelling", "collaboration", "creativity"],
    icon: "BookOpen",
    popularity: 82,
    settings: {
      maxSentenceLength: 100,
      storyPrompts: ["adventure", "mystery", "comedy"],
    },
  },

  // PREDICTION GAMES
  {
    id: "future-predictions",
    title: "Future Predictions",
    type: "prediction",
    category: "engagement",
    description: "Make predictions about future events",
    duration: 10,
    minParticipants: 1,
    difficulty: "easy",
    tags: ["future", "guessing", "fun"],
    icon: "CrystalBall",
    popularity: 79,
    settings: {
      categories: ["technology", "entertainment", "sports", "weather"],
      revealDate: "end_of_event",
    },
  },
  {
    id: "couple-predictions",
    title: "Couple's Future",
    type: "prediction",
    category: "engagement",
    description: "Predict the couple's future milestones",
    duration: 12,
    minParticipants: 1,
    difficulty: "easy",
    tags: ["wedding", "future", "milestones"],
    icon: "Heart",
    popularity: 86,
    settings: {
      predictions: [
        "How many kids will they have?",
        "Where will they honeymoon?",
        "What will be their first pet?",
        "Anniversary celebration idea?",
      ],
    },
  },

  // VOTING GAMES
  {
    id: "awards-ceremony",
    title: "Superlative Awards",
    type: "voting",
    category: "social",
    description: "Vote for fun awards among participants",
    duration: 20,
    minParticipants: 5,
    difficulty: "easy",
    tags: ["awards", "recognition", "fun"],
    icon: "Award",
    popularity: 90,
    settings: {
      categories: [
        "Most likely to become famous",
        "Best dressed",
        "Funniest person",
        "Most adventurous",
        "Best dancer",
      ],
    },
  },
  {
    id: "photo-contest",
    title: "Photo Contest Voting",
    type: "voting",
    category: "creative",
    description: "Vote on the best submitted photos",
    duration: 15,
    minParticipants: 3,
    difficulty: "easy",
    tags: ["photography", "contest", "voting"],
    icon: "Image",
    popularity: 83,
    settings: {
      maxVotesPerPerson: 3,
      categories: ["most creative", "funniest", "best quality"],
    },
  },

  // WORD GAMES
  {
    id: "word-association",
    title: "Word Association Chain",
    type: "word-game",
    category: "engagement",
    description: "Build a chain of associated words",
    duration: 10,
    minParticipants: 2,
    difficulty: "easy",
    tags: ["words", "association", "quick thinking"],
    icon: "Type",
    popularity: 75,
    settings: { timeLimit: 10, maxChainLength: 50 },
  },
  {
    id: "acronym-game",
    title: "Creative Acronyms",
    type: "word-game",
    category: "creative",
    description: "Create funny meanings for acronyms",
    duration: 15,
    minParticipants: 2,
    difficulty: "medium",
    tags: ["acronyms", "creativity", "humor"],
    icon: "AlphabeticalOrder",
    popularity: 77,
    settings: {
      acronyms: ["PARTY", "WEDDING", "TEAM", "CELEBRATION"],
      votingEnabled: true,
    },
  },

  // SEASONAL GAMES
  {
    id: "holiday-trivia",
    title: "Holiday Traditions Trivia",
    type: "trivia",
    category: "seasonal",
    description: "Test knowledge of holiday traditions worldwide",
    duration: 18,
    minParticipants: 1,
    difficulty: "medium",
    tags: ["holidays", "traditions", "cultural"],
    icon: "Gift",
    popularity: 81,
    settings: {
      holidays: ["christmas", "halloween", "thanksgiving", "new_year"],
    },
  },
  {
    id: "summer-bucket-list",
    title: "Summer Bucket List",
    type: "poll",
    category: "seasonal",
    description: "Vote on the best summer activities",
    duration: 12,
    minParticipants: 1,
    difficulty: "easy",
    tags: ["summer", "activities", "bucket list"],
    icon: "Sun",
    popularity: 73,
    settings: {
      activities: [
        "Beach volleyball",
        "Road trip",
        "Music festival",
        "Camping",
        "Water sports",
        "Outdoor concerts",
      ],
    },
  },
];

export const getGamesByCategory = (category: string) =>
  expandedGameTemplates.filter((game) => game.category === category);

export const getFeaturedGames = () =>
  expandedGameTemplates
    .filter((game) => game.featured)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

export const getGamesByTags = (tags: string[]) =>
  expandedGameTemplates.filter((game) =>
    game.tags.some((tag) => tags.includes(tag)),
  );

export const searchGames = (query: string) =>
  expandedGameTemplates.filter(
    (game) =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.description.toLowerCase().includes(query.toLowerCase()) ||
      game.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  );
