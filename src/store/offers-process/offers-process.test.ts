import {describe, expect} from 'vitest';
import {InitialOffersState, loadNearbyOffers, loadOffers, offersProcess} from './offers-process.slice.ts';
import {SortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {generateMockOffer} from '../../mocks/create-mock-offer.ts';

const initialOffersState: InitialOffersState = {
  offersCity: 'Amsterdam',
  offers: [],
  savedOrderOffers: [],
  favoriteOffers: [],
  sortMethod: SortMethods.ByPopularity,
  chosenOffer: {
    offerDetails: null,
    offerReviews: [],
    nearbyOffers: [],
  }
};

const mockOffers = Array.from({length: 3}, () => generateMockOffer());

describe('OffersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = initialOffersState;

    const result = offersProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialOffersState;

    const result = offersProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return state with loaded offers and saved order offers with "loadOffers" action', () => {
    const injectedOffers = mockOffers;
    const initialState = initialOffersState;
    const expectedState = {...initialState, offers: injectedOffers, savedOrderOffers: injectedOffers};

    const result = offersProcess.reducer(initialState, loadOffers(injectedOffers));

    expect(result).toEqual(expectedState);
  });

  it('should return state with nearby offers with "loadNearbyOffers" action', () => {
    const injectedOffers = mockOffers;
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      chosenOffer: {
        ...initialState.chosenOffer,
        nearbyOffers: injectedOffers,
      }
    };

    const result = offersProcess.reducer(initialState, loadNearbyOffers(injectedOffers));

    expect(result).toEqual(expectedState);
  });
});
