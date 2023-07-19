export const RATING_COEFFICIENT = 20;

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
