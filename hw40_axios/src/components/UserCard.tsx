import type { User } from '../types/user';
import './UserCard.css';

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <h2 className="user-card__name">{user.name}</h2>
      <p className="user-card__email">{user.email}</p>
      <p className="user-card__city">
        <span className="user-card__label">City: </span>
        {user.address.city}
      </p>
      <p className="user-card__company">
        <span className="user-card__label">Company: </span>
        {user.company.name}
      </p>
    </div>
  );
};

export default UserCard;
