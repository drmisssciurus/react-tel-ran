import { FEED, PLAY, RESET, SLEEP, type PetAction } from './petActions';

export type PetState = {
  name: string;
  hunger: number;
  happiness: number;
  energy: number;
};

export const initialState: PetState = {
  name: 'Shlepa',
  hunger: 50,
  happiness: 50,
  energy: 50,
};

export const ACTION_NUMBER = 10;

export function petReducer(
  state: PetState = initialState,
  action: PetAction
): PetState {
  switch (action.type) {
    case FEED:
      const resFeed = state.hunger - ACTION_NUMBER;
      return {
        ...state,
        hunger: resFeed < 0 ? state.hunger : resFeed,
      };
    case PLAY:
      const resPlay = state.happiness + ACTION_NUMBER;
      const resEnergy = state.energy - ACTION_NUMBER;
      return {
        ...state,
        happiness: resPlay > 100 ? state.happiness : resPlay,
        energy: resEnergy < 0 ? state.energy : resEnergy,
      };
    case SLEEP:
      const resSleep = state.energy + ACTION_NUMBER;
      const resHunger = state.hunger + ACTION_NUMBER;
      const resHappines = state.happiness - ACTION_NUMBER;
      return {
        ...state,
        energy: resSleep > 100 ? state.energy : resSleep,
        hunger: resHunger > 100 ? state.hunger : resHunger,
        happiness: resHappines < 0 ? state.happiness : resHappines,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
