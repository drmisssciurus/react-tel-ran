import { CHANGE_NAME, type ProfileAction } from './profileActions';

export type ProfileState = {
  name: string;
  role: string;
};

const initialProfileState: ProfileState = {
  name: 'Alina',
  role: 'VibeCoder',
};

export function ProfileReducer(
  state: ProfileState = initialProfileState,
  action: ProfileAction
): ProfileState {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
