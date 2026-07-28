export type City = {
  id: string;
  name: string;
  country: string;
  searchQuery: string;
};

export type GameScore = {
  correct: number;
  wrong: number;
  total: number;
};

export type Question = {
  correctCity: City;
  options: City[];
};

export type CityPhoto = {
  url: string;
  alt: string;
  autorName: string;
  photoUrl: string;
};

export type User = {
  id: number;
  name: string;
};
