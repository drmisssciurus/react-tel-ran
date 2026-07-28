import { useState } from 'react';
import { findOrCreateUser } from '../storage/scoreStorage';
import type { User } from '../types';
type LoginFormProps = {
  onLogin: (user: User) => void;
};
const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [name, setName] = useState('');

  return (
    <div className="login-form">
      <h1>guess the city</h1>
      <p className="login-hint">enter your name to start</p>
      <input
        className="login-input"
        type="text"
        placeholder="your name"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="next-btn"
        disabled={!name.trim()}
        onClick={() => onLogin(findOrCreateUser(name))}
      >
        start game
      </button>
    </div>
  );
};

export default LoginForm;
