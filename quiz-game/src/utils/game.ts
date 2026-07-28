import type { City, GameScore, Question, User } from '../types';

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// function shuffle<T>(items: T[]): T[] {
//   return [...items].sort(() => Math.random() - 0.5);
// }

function shuffle<T>(items: T[]): T[] {
  const temp: T[] = [...items];
  for (let currentIndex = temp.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return temp;
}

export function createQuestion(
  cities: City[],
  previousCityId?: string
): Question {
  const availableCities = cities.filter((c) => c.id !== previousCityId);
  const correctCity = getRandomItem(availableCities);
  const wrongOptions = shuffle(
    cities.filter((c) => c.id !== correctCity.id).slice(0, 3)
  );
  return {
    correctCity,
    options: shuffle([correctCity, ...wrongOptions]),
  };
}

export function updateScore(score: GameScore, isCorrect: boolean): GameScore {
  return {
    correct: score.correct + (isCorrect ? 1 : 0),
    wrong: score.wrong + (isCorrect ? 0 : 1),
    total: score.total + 1,
  };
}

export function getAccuracy(score: GameScore): number {
  if (score.total === 0) {
    return 0;
  }
  return Math.round((score.correct / score.total) * 100);
}
