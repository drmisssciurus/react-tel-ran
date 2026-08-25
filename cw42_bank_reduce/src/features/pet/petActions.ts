export const FEED = 'pet/feed';
export const PLAY = 'pet/play';
export const SLEEP = 'pet/sleep';
export const RESET = 'pet/reset';

export type FeedAction = {
  type: typeof FEED;
};

export type PlayAction = {
  type: typeof PLAY;
};

export type SleepAction = {
  type: typeof SLEEP;
};

export type ResetAction = {
  type: typeof RESET;
};

export type PetAction = FeedAction | PlayAction | SleepAction | ResetAction;

export function feedAction(): FeedAction {
  return {
    type: FEED,
  };
}

export function playAction(): PlayAction {
  return {
    type: PLAY,
  };
}

export function sleepAction(): SleepAction {
  return {
    type: SLEEP,
  };
}

export function resetAction(): ResetAction {
  return {
    type: RESET,
  };
}
