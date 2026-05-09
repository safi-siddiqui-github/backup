import { useState, useEffect } from 'react';
import { Game } from '../GamesModule';

interface GameSession {
  id: string;
  gameId: string;
  code: string;
  status: 'waiting' | 'active' | 'completed';
  participants: string[];
  results: any[];
  createdAt: Date;
}

// Simulated global game session store
let globalGameSessions: GameSession[] = [];
let globalGames: Game[] = [];

export const useGameSessionManager = () => {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([]);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);

  // Sync with global state (in a real app, this would be a backend service)
  useEffect(() => {
    setGameSessions([...globalGameSessions]);
    setAvailableGames([...globalGames]);
  }, []);

  const createGameSession = (game: Game) => {
    const session: GameSession = {
      id: `session-${Date.now()}`,
      gameId: game.id,
      code: generateGameCode(),
      status: 'waiting',
      participants: [],
      results: [],
      createdAt: new Date()
    };

    globalGameSessions.push(session);
    setGameSessions([...globalGameSessions]);
    
    return session;
  };

  const joinGameSession = (sessionId: string, participantName: string) => {
    const session = globalGameSessions.find(s => s.id === sessionId);
    if (session && !session.participants.includes(participantName)) {
      session.participants.push(participantName);
      setGameSessions([...globalGameSessions]);
    }
    return session;
  };

  const updateGamesState = (games: Game[]) => {
    globalGames = games;
    setAvailableGames([...globalGames]);
  };

  const getLiveGameSessions = () => {
    return globalGameSessions.filter(session => 
      session.status === 'waiting' || session.status === 'active'
    );
  };

  const getGameBySessionId = (sessionId: string) => {
    const session = globalGameSessions.find(s => s.id === sessionId);
    if (!session) return null;
    return globalGames.find(g => g.id === session.gameId) || null;
  };

  return {
    gameSessions,
    availableGames,
    createGameSession,
    joinGameSession,
    updateGamesState,
    getLiveGameSessions,
    getGameBySessionId
  };
};

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export type { GameSession };