export const CHANGE_NAME = 'profile/change_name';

export type ChangeNameAction = {
  type: typeof CHANGE_NAME;
  payload: string;
};

export type ProfileAction = ChangeNameAction;

export function changeNameAction(name: string): ChangeNameAction {
  return {
    type: CHANGE_NAME,
    payload: name,
  };
}
