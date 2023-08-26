import {CITIES, Months} from './const.ts';
import {City, Offer} from './store/offers-process/offers-process.slice.ts';

export const humanizeISODate = (date: string) => {
  const parseDate = new Date(date);
  return `${Months[parseDate.getMonth()]} ${parseDate.getFullYear()}`;
};

export const shuffleNearby = (nearbyOffers: Offer[]) => {
  const shuffledNearbyOffers = [...nearbyOffers];
  for(let i = nearbyOffers.length - 1; i > 0; i--){
    const random = Math.floor(Math.random() * (i + 1));
    [shuffledNearbyOffers[random], shuffledNearbyOffers[i]] = [shuffledNearbyOffers[i], shuffledNearbyOffers[random]];
  }
  return shuffledNearbyOffers.slice(0, 3);
};

export const getRandomCity = (): City => CITIES[Math.floor(Math.random() * CITIES.length)];

export const capitalizeFirstLetter = (word: string): string => `${word[0].toUpperCase()}${word.slice(1)}`;
