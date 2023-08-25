import {getRandomCity, humanizeISODate, shuffleNearby} from './utils.ts';
import {describe, expect} from 'vitest';
import {generateMockOffer} from './mocks/generate-mock-offer.ts';
import {Offer} from './store/offers-process/offers-process.slice.ts';
import {CITIES} from './const.ts';

describe('Utilities', () => {
  it('humanizeIsoDate function works correctly', () => {
    const formattedResult = humanizeISODate('2023-08-24T12:34:56.789Z');
    expect(formattedResult).toBe('August 2023');
  });

  it('shuffleNearby function works correctly', () => {
    const initialOrder = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
    const shuffledOrder = shuffleNearby(initialOrder);
    expect(shuffledOrder).not.toBe(initialOrder);
  });

  it('getRandomCity function works correctly', () => {
    const randomCity = getRandomCity();
    const result = (CITIES.includes(randomCity));

    expect(result).toBe(true);
  });
});
