import type { GameScore, User } from '../types';

const SCORE_STORAGE_KEY = 'guess-city-score';
const USER_STORAGE_KEY = 'guess-city-user';

export const emptyScore: GameScore = {
  correct: 0,
  wrong: 0,
  total: 0,
};

export function findOrCreateUser(name: string): User {
  const rawUsers = localStorage.getItem(USER_STORAGE_KEY);
  const user = JSON.parse(rawUsers ?? '[]') as User[];
  const existingUser = user.find((u) => u.name === name);
  if (!existingUser) {
    const newUser: User = {
      id: Date.now(),
      name,
    };
    user.push(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return newUser;
  }
  return existingUser;
}

export function loadAllUsers(): User[] {
  const rawUsers = localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUsers) {
    return [];
  }
  return JSON.parse(rawUsers) as User[];
}
export function deleteUser(userId: number): User[] {
  const rawUsers = loadAllUsers();
  const user = rawUsers.find((u) => u.id === userId);
  if (!user) {
    return;
  }
  const newUsers = rawUsers.filter((u) => u.id !== userId);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUsers));
  clearScore(userId);
  return newUsers;
}

export function loadScore(userId: number): GameScore {
  const rawScore = localStorage.getItem(SCORE_STORAGE_KEY);
  if (!rawScore) {
    return emptyScore;
  }
  try {
    const score = JSON.parse(rawScore) as Record<number, GameScore>;
    const userScore = score[userId];
    if (!userScore) return emptyScore;
    if (
      typeof userScore.correct !== 'number' ||
      typeof userScore.wrong !== 'number' ||
      typeof userScore.total !== 'number' ||
      userScore.wrong + userScore.correct !== userScore.total
    ) {
      return emptyScore;
    }
    return userScore;
  } catch {
    localStorage.removeItem(SCORE_STORAGE_KEY);
    return emptyScore;
  }
}

export function saveScore(userId: number, score: GameScore): void {
  const rawScore = localStorage.getItem(SCORE_STORAGE_KEY);
  const scoreMap = JSON.parse(rawScore ?? '{}') as Record<number, GameScore>;
  scoreMap[userId] = score;
  localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scoreMap));
}

export function clearScore(userId: number): void {
  const rawScore = localStorage.getItem(SCORE_STORAGE_KEY);
  if (!rawScore) {
    return;
  }
  const scoreMap = JSON.parse(rawScore) as Record<number, GameScore>;
  delete scoreMap[userId];
  localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scoreMap));
}
