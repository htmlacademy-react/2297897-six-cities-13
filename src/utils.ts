import {Months} from './const.ts';
import {Offer} from './mocks/offers.ts';

export const humanizeISODate = (date: string) => {
  const parseDate = new Date(date);
  return `${parseDate.getDate()} ${Months[parseDate.getMonth()]}`;
};

export const shuffleNearby = (nearbyOffers: Offer[]) => {
  const shuffledNearbyOffers = [...nearbyOffers];
  for(let i = nearbyOffers.length - 1; i > 0; i--){
    const random = Math.floor(Math.random() * (i + 1));
    [shuffledNearbyOffers[random], shuffledNearbyOffers[i]] = [shuffledNearbyOffers[i], shuffledNearbyOffers[random]];
  }
  return shuffledNearbyOffers.slice(0, 3);
};
