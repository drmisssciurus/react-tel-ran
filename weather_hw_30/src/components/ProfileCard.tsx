import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeNameAction } from '../features/profile/profileActions';

function ProfileCard() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="profile-card">
      <p className="weather-card__label">Profile</p>
      <h2>{profile.name.toUpperCase()}</h2>
      <p className="weather-card__description">{profile.role}</p>
      <label htmlFor="name" className="profile-card__field">
        Name
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name}
          onChange={(e) => dispatch(changeNameAction(e.target.value))}
        />
      </label>
    </div>
  );
}

export default ProfileCard;
