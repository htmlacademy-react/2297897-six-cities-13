import {describe, expect} from 'vitest';
import {
  changeOffersCity,
  ChosenOffer,
  InitialOffersState, loadChosenOffer, loadFavoriteOffers,
  loadNearbyOffers, loadOfferReviews,
  loadOffers,
  Offer,
  offersProcess, sortOffers
} from './offers-process.slice.ts';
import {SortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {generateMockReview} from '../../mocks/generate-mock-review.ts';
import {MAX_REVIEWS_ON_PAGE} from '../../const.ts';

describe('offersProcess Slice', () => {
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
      chosenOffer: {
        ...initialState.chosenOffer,
        offerDetails: injectedChosenOffer,
      }
    };

    const result = offersProcess.reducer(initialState, loadChosenOffer(injectedChosenOffer));

    expect(result).toEqual(expectedState);
  });

  it('should return state with reviews with "loadOfferReviews" action', () => {
    const injectedOfferReviews = mockReviews;
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      chosenOffer: {
        ...initialState.chosenOffer,
        offerReviews: injectedOfferReviews.slice(-MAX_REVIEWS_ON_PAGE).reverse()
      }
    };

    const result = offersProcess.reducer(initialState, loadOfferReviews(injectedOfferReviews));

    expect(result).toEqual(expectedState);
  });

  it('should return state with favorite offers with "loadFavoriteOffers" action', () => {
    const injectedFavoriteOffers = mockOffers;
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      favoriteOffers: injectedFavoriteOffers,
    };

    const result = offersProcess.reducer(initialState, loadFavoriteOffers(injectedFavoriteOffers));

    expect(result).toEqual(expectedState);
  });

  it('should return state with new offers city with "changeOffersCity" action', () => {
    const newCity = 'Hamburg';
    const initialState = initialOffersState;
    const expectedState = {
      ...initialState,
      offersCity: newCity,
    };

    const result = offersProcess.reducer(initialState, changeOffersCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('"by popularity" sort is working correct', () => {
    const initialState = {
      ...initialOffersState,
      offers: mockOffers,
      savedOrderOffers: mockOffers,
    };
    const expectedState = structuredClone(initialState);

    const result = offersProcess.reducer(initialState, sortOffers(SortMethods.ByPopularity));

    expect(result).toEqual(expectedState);
  });

  it('"by price increase" sort is working correct', () => {
    const byPriceIncreaseSortedOffers = [...mockOffers].sort((a, b) => a.price - b.price);
    const initialState = {
      ...initialOffersState,
      offers: mockOffers
    };
    const expectedState = {
      ...initialState,
      sortMethod: SortMethods.ByPriceIncrease,
      offers: byPriceIncreaseSortedOffers,
    };

    const result = offersProcess.reducer(initialState, sortOffers(SortMethods.ByPriceIncrease));

    expect(result).toEqual(expectedState);
  });

  it('"by price decrease" sort is working correct', () => {
    const byPriceDecreaseSortedOffers = [...mockOffers].sort((a, b) => b.price - a.price);
    const initialState = {
      ...initialOffersState,
      offers: mockOffers
    };
    const expectedState = {
      ...initialState,
      sortMethod: SortMethods.ByPriceDecrease,
      offers: byPriceDecreaseSortedOffers,
    };

    const result = offersProcess.reducer(initialState, sortOffers(SortMethods.ByPriceDecrease));

    expect(result).toEqual(expectedState);
  });

  it('"by rating" sort is working correct', () => {
    const byRatingSortedOffers = [...mockOffers].sort((a, b) => b.rating - a.rating);
    const initialState = {
      ...initialOffersState,
      offers: mockOffers
    };
    const expectedState = {
      ...initialState,
      sortMethod: SortMethods.ByRating,
      offers: byRatingSortedOffers,
    };

    const result = offersProcess.reducer(initialState, sortOffers(SortMethods.ByRating));

    expect(result).toEqual(expectedState);
  });

  it('default case sort is working correct', () => {
    const initialState = {
      ...initialOffersState,
      offers: mockOffers,
      savedOrderOffers: mockOffers,
    };
    const expectedState = structuredClone(initialState);

    // for default case test
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = offersProcess.reducer(initialState, sortOffers());

    expect(result).toEqual(expectedState);
  });
});
