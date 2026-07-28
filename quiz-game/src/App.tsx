import { useEffect, useState } from 'react';
import './App.css';
import type { City, CityPhoto, GameScore, Question, User } from './types';
import {
  clearScore,
  loadScore,
  saveScore,
  emptyScore,
} from './storage/scoreStorage';
import { cities } from './data/cities';
import { createQuestion, updateScore } from './utils/game';
import AnswerButton from './components/AnswerButton';
import CityImage from './components/CityImage';
import ScorePanel from './components/ScorePanel';
import { loadCityPhoto } from './api/unsplashApi';
import LoginForm from './components/LoginForm';

function App() {
  const [score, setScore] = useState<GameScore>(emptyScore);
  const [question, setQuestion] = useState<Question>(() =>
    createQuestion(cities)
  );
  const [selectCityId, setSelectCityId] = useState<string>();
  const [photo, setPhoto] = useState<CityPhoto>();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState<string>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) return;
    saveScore(user.id, score);
  }, [score, user]);

  useEffect(() => {
    let ignore = false;
    async function loadPhoto() {
      setIsPhotoLoading(true);
      setPhotoError(undefined);
      setPhoto(undefined);
      try {
        console.log('load photo');
        const nextPhoto = await loadCityPhoto(question.correctCity);
        console.log(nextPhoto);
        if (!ignore) {
          setPhoto(nextPhoto);
        }
      } catch (error) {
        if (!ignore) {
          setPhotoError(
            error instanceof Error ? error.message : 'unknown photo error'
          );
        }
      } finally {
        if (!ignore) {
          setIsPhotoLoading(false);
        }
      }
    }
    void loadPhoto();
    return () => {
      ignore = true;
    };
  }, [question.correctCity]);

  function handleAnswer(city: City) {
    if (selectCityId) {
      return;
    }
    const isCorrect = city.id === question.correctCity.id;
    setSelectCityId(city.id);
    setScore((currentScore) => updateScore(currentScore, isCorrect));
  }
  function handleNextQuestion() {
    setQuestion(createQuestion(cities, question.correctCity.id));
    setSelectCityId(undefined);
  }
  function handleResetScore() {
    if (!user) return;
    clearScore(user.id);
    setScore(emptyScore);
  }

  function handleLogin(user: User): void {
    setUser(user);
    setScore(loadScore(user.id));
  }

  const feedback =
    selectCityId === undefined
      ? 'Look at the photo and choose the city'
      : selectCityId === question.correctCity.id
      ? 'Correct!'
      : `Wrong it was ${question.correctCity.name}`;

  return (
    <>
      <main className="game">
        {user ? (
          <div className="game-wrapper">
            <h1>Hi {user.name}! Guess the City:</h1>
            <ScorePanel
              user={user.name}
              score={score}
              onReset={handleResetScore}
            />
            <CityImage
              photo={photo}
              error={photoError}
              isLoading={isPhotoLoading}
            />
            <p className="feedback">{feedback}</p>
            <div className="answer-grid">
              {question.options.map((city) => (
                <AnswerButton
                  key={city.id}
                  city={city}
                  correctCityId={question.correctCity.id}
                  selectedCityId={selectCityId}
                  onSelect={handleAnswer}
                />
              ))}
            </div>
            <button
              className="next-btn"
              type="button"
              onClick={handleNextQuestion}
              disabled={isPhotoLoading}
            >
              Next question
            </button>
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </main>
    </>
  );
}

export default App;
