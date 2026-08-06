import { useEffect, useState } from 'react';
import './App.css';
import type { City, CityPhoto, GameScore, Question, User } from './types';
import {
  clearScore,
  loadScore,
  saveScore,
  emptyScore,
  loadAllUsers,
  findOrCreateUser,
  deleteUser,
} from './storage/scoreStorage';
import { cities } from './data/cities';
import { createQuestion, updateScore } from './utils/game';
import AnswerButton from './components/AnswerButton';
import CityImage from './components/CityImage';
import ScorePanel from './components/ScorePanel';
import { loadCityPhoto } from './api/unsplashApi';
import UserPanel from './components/UserPanel';
import RatingPanel from './components/RatingPanel';

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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!user) return;
    saveScore(user.id, score);
  }, [score, user]);

  useEffect(() => {
    setUsers(loadAllUsers());
  }, []);

  function handeSelectUser(user: User) {
    setUser(user);
    setScore(loadScore(user.id));
  }

  function handleAddUser(name: string) {
    setUsers([...users, findOrCreateUser(name)]);
  }

  function handleDeleteUser(userToDelete: User) {
    setUsers(deleteUser(userToDelete.id));
    if (user?.id === userToDelete.id) {
      setUser(null);
      setScore(emptyScore);
    }
  }

  useEffect(() => {
    let ignore = false;
    async function loadPhoto() {
      setIsPhotoLoading(true);
      setPhotoError(undefined);
      setPhoto(undefined);
      try {
        const nextPhoto = await loadCityPhoto(question.correctCity);

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

  const feedback =
    selectCityId === undefined
      ? 'Look at the photo and choose the city'
      : selectCityId === question.correctCity.id
      ? 'Correct!'
      : `Wrong it was ${question.correctCity.name}`;

  return (
    <>
      <main className="game">
        <div className="game-wrapper">
          <RatingPanel users={users} />
          {user === null ? (
            <div>
              <h1>Select player to start</h1>
              <UserPanel
                users={users}
                activeUser={user}
                onSelect={handeSelectUser}
                onDelete={handleDeleteUser}
                onCreate={handleAddUser}
              />
            </div>
          ) : (
            <>
              <UserPanel
                users={users}
                activeUser={user}
                onSelect={handeSelectUser}
                onDelete={handleDeleteUser}
                onCreate={handleAddUser}
              />
              <ScorePanel
                user={user.name}
                score={score}
                onReset={handleResetScore}
              />
              <h1>Hi {user.name}! Guess the City:</h1>
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
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
