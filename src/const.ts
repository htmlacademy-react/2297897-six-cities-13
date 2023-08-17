export const RATING_COEFFICIENT = 20;
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_REVIEWS_ON_PAGE = 10;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'] as const;

export const RATINGS = [
  { value: 5, id: '5-stars', title: 'perfect' },
  { value: 4, id: '4-stars', title: 'good' },
  { value: 3, id: '3-stars', title: 'not bad' },
  { value: 2, id: '2-stars', title: 'badly' },
  { value: 1, id: '1-star', title: 'terribly' },
] as const;

export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const UrlMarkers = {
  Default: 'markup/img/pin.svg',
  Current: 'markup/img/pin-active.svg',
} as const;

export const Paths = {
  Main: '/',
  Favorites: '/favorites',
  Login: '/login',
  Offer: '/offer/:id',
  Error: '*',
} as const;

export const Authorization = {
  Auth: 'authorized',
  NoAuth: 'non-authorized',
  Unknown: 'unknown',
} as const;

export const APIPaths = {
  Offers: '/offers',
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout',
  Favorite: '/favorite',
} as const;

export const NameSpace = {
  User: 'USER',
  Offers: 'OFFERS',
  Loaders: 'LOADERS',
} as const;
