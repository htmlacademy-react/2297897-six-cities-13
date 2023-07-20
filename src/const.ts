export const RATING_COEFFICIENT = 20;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'] as const;

export const RATINGS = [
  { value: '5', id: '5-stars', title: 'perfect' },
  { value: '4', id: '4-stars', title: 'good' },
  { value: '3', id: '3-stars', title: 'not bad' },
  { value: '2', id: '2-stars', title: 'badly' },
  { value: '1', id: '1-star', title: 'terribly' }
] as const;

export const Paths = {
  Main: '/',
  Favorites: '/favorites',
  Login: '/login',
  Offer: '/offer/:id',
  Error: '*',
}as const;

export const Authorization = {
  Auth: 'authorized',
  NoAuth: 'non-authorized'
}as const;
