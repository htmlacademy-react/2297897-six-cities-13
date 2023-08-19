import {describe, expect} from 'vitest';
import {
  ChosenOffer,
  InitialOffersState, loadChosenOffer,
  loadNearbyOffers, loadOfferReviews,
  loadOffers,
  Offer,
  offersProcess
} from './offers-process.slice.ts';
import {SortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {generateMockReview} from '../../mocks/generate-mock-review.ts';
import {MAX_REVIEWS_ON_PAGE} from '../../const.ts';

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

const mockOffers = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
const mockChosenOffer = generateMockOffer(true) as ChosenOffer;
const mockReviews = Array.from({length: 3}, () => generateMockReview());

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

  it('should return state with offer details with "loadChosenOffer" action', () => {
    const injectedChosenOffer = mockChosenOffer;
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      chosenOffer:{
        ...initialState.chosenOffer,
        offerDetails: injectedChosenOffer,
      }
    };

    const result = offersProcess.reducer(initialState, loadChosenOffer(injectedChosenOffer));

    expect(result).toEqual(expectedState);
  });

  it('should return state with reviews witch "loadOfferReviews" action', () => {
    const injectedOfferReviews = mockReviews;
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      chosenOffer:{
        ...initialState.chosenOffer,
        offerReviews: injectedOfferReviews.slice(-MAX_REVIEWS_ON_PAGE).reverse()
      }
    };

    const result = offersProcess.reducer(initialState, loadOfferReviews(injectedOfferReviews));

    expect(result).toEqual(expectedState);
  });
});
