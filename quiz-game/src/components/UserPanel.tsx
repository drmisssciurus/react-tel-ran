import { useState } from 'react';
import type { User } from '../types';

type UserPanelProps = {
  users: User[];
  activeUser: User | null;
  onSelect: (user: User) => void;
  onDelete: (user: User) => void;
  onCreate: (name: string) => void;
};
const UserPanel = ({
  users,
  onSelect,
  onDelete,
  onCreate,
  activeUser,
}: UserPanelProps) => {
  const [currentUser, setCurrentUser] = useState<string>('');

  return (
    <div className="user-panel">
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <button
              onClick={() => onSelect(user)}
              className={`user-btn${user.id === activeUser?.id ? ' active-user' : ''}`}
            >
              {user.name}
            </button>
            <button className="delete-btn" onClick={() => onDelete(user)}>
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="add-user-form">
        <input
          className="add-user-input"
          type="text"
          placeholder="New player..."
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value.toLowerCase())}
        />
        <button
          className="add-user-btn"
          onClick={() => {
            onCreate(currentUser.trim());
            setCurrentUser('');
          }}
          disabled={!currentUser.trim()}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
