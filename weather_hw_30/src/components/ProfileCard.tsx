import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeNameAction } from '../features/profile/profileActions';

function ProfileCard() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  return (
    <div>
      <div>{profile.name.toUpperCase()}</div>
      <p>{profile.role}</p>
      <label htmlFor="name">
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
