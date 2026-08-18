import { useEffect, useState } from 'react';
import type { RequestStatus, User } from '../types/user';
import { loadUsers } from '../api/usersApi';
import UserCard from '../components/UserCard';
import { withLogger } from '../hoc/withLogger';
import './UsersPage.css';

const LoggedUserCard = withLogger(UserCard);

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<RequestStatus>('loading');

  useEffect(() => {
    async function getUsers() {
      setStatus('loading');
      try {
        const users = await loadUsers();
        setUsers(users);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        console.error(error);
      }
    }
    void getUsers();
  }, []);

  if (status === 'loading') {
    return <div className="users-page__status">Loading...</div>;
  }

  if (status === 'error') {
    return (
      <div className="users-page__status users-page__status--error">
        Error loading users
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="users-page__grid">
        {users.map((user) => (
          <LoggedUserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
