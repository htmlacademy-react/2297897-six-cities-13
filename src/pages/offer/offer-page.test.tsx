import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {OfferPage} from './offer-page.tsx';
import {ChosenOffer, initialOffersState, Offer} from '../../store/offers-process/offers-process.slice.ts';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {render, screen, waitFor} from '@testing-library/react';
import {generateMockReview} from '../../mocks/generate-mock-review.ts';
import {APIPaths} from '../../const.ts';

describe('Component: OfferPage', () => {
  let mockOfferDetails = generateMockOffer(true) as ChosenOffer;
  mockOfferDetails = {
    ...mockOfferDetails,
    id: 'defaultId',
  };
  const mockOffers = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
  mockOffers[1].id = 'defaultId';
  const nearbyMockOffers = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
  const mockReviews = Array.from({length: 3}, () => generateMockReview());

  it('should render with comment form when user authorized and all info is loaded', async () => {
    const offerPageElementId = 'offer-page-element';
    const commentSendFormElementId = 'comment-send-form-element';
    const {withStoreComponent,mockAxiosAdapter} = withStore(
      <OfferPage/>, {
        OFFERS: {
          ...initialOffersState,
          offers: mockOffers,
          chosenOffer: {
            offerDetails: mockOfferDetails,
            nearbyOffers: nearbyMockOffers,
            offerReviews: mockReviews,
          },
        },
        LOADERS: {
          ...initialLoadingState,
          isChosenOfferLoading: false,
          isOffersLoading: false,
          isFavoriteOffersLoading: false,
          isNearbyOffersLoading: false,
        },
        USER: {
          ...initialUserState,
          authStatus: 'authorized',
        },
      });
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onGet(`${APIPaths.Offers}/defaultId`).reply(200, mockOfferDetails);
    mockAxiosAdapter.onGet(`${APIPaths.Offers}/defaultId/nearby`).reply(200);
    render(preparedComponent);

    await waitFor(() => {
      expect(screen.getByTestId(offerPageElementId)).toBeInTheDocument();
      expect(screen.getByText(mockOfferDetails.title)).toBeInTheDocument();
      expect(screen.getByTestId(commentSendFormElementId)).toBeInTheDocument();
    });
  });

  it('should render without comment form when user authorized and all info is loaded', async () => {
    const offerPageElementId = 'offer-page-element';
    const commentSendFormElementId = 'comment-send-form-element';
    const {withStoreComponent,mockAxiosAdapter} = withStore(
      <OfferPage/>, {
        OFFERS: {
          ...initialOffersState,
          offers: mockOffers,
          chosenOffer: {
            offerDetails: mockOfferDetails,
            nearbyOffers: nearbyMockOffers,
            offerReviews: mockReviews,
          },
        },
        LOADERS: {
          ...initialLoadingState,
          isChosenOfferLoading: false,
          isOffersLoading: false,
          isFavoriteOffersLoading: false,
          isNearbyOffersLoading: false,
        },
        USER: {
          ...initialUserState,
          authStatus: 'non-authorized',
        },
      });
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onGet(`${APIPaths.Offers}/defaultId`).reply(200, mockOfferDetails);
    mockAxiosAdapter.onGet(`${APIPaths.Offers}/defaultId/nearby`).reply(200);
    render(preparedComponent);

    await waitFor(() => {
      expect(screen.getByTestId(offerPageElementId)).toBeInTheDocument();
      expect(screen.getByText(mockOfferDetails.title)).toBeInTheDocument();
      expect(screen.queryByTestId(commentSendFormElementId)).not.toBeInTheDocument();
    });
  });

  it('should render loading screen when chosen offer is loading', () => {
    const loadingContainerTestId = 'loading-container';
    const {withStoreComponent} = withStore(
      <OfferPage/>, {
        OFFERS: {
          ...initialOffersState,
          offers: mockOffers,
          chosenOffer: {
            offerDetails: mockOfferDetails,
            nearbyOffers: nearbyMockOffers,
            offerReviews: mockReviews,
          },
        },
        LOADERS: {
          ...initialLoadingState,
          isChosenOfferLoading: true,
          isOffersLoading: false,
          isFavoriteOffersLoading: false,
          isNearbyOffersLoading: false,
        },
        USER: {
          ...initialUserState,
        },
      });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(screen.getByTestId(loadingContainerTestId)).toBeInTheDocument();
  });

  it('should render loading screen when nearby offers is loading', () => {
    const loadingContainerTestId = 'loading-container';
    const {withStoreComponent} = withStore(
      <OfferPage/>, {
        OFFERS: {
          ...initialOffersState,
          offers: mockOffers,
          chosenOffer: {
            offerDetails: mockOfferDetails,
            nearbyOffers: nearbyMockOffers,
            offerReviews: mockReviews,
          },
        },
        LOADERS: {
          ...initialLoadingState,
          isChosenOfferLoading: false,
          isOffersLoading: false,
          isFavoriteOffersLoading: false,
          isNearbyOffersLoading: true,
        },
        USER: {
          ...initialUserState,
        },
      });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(screen.getByTestId(loadingContainerTestId)).toBeInTheDocument();
  });

  it('should render error page when id doesn\'t exist', () => {
    mockOffers[1].id = 'notExpectedId';
    const errorPageElementId = 'error-page-element';
    const {withStoreComponent} = withStore(
      <OfferPage/>, {
        OFFERS: {
          ...initialOffersState,
          offers: mockOffers,
          chosenOffer: {
            offerDetails: mockOfferDetails,
            nearbyOffers: nearbyMockOffers,
            offerReviews: mockReviews,
          },
        },
        LOADERS: {
          ...initialLoadingState,
          isChosenOfferLoading: false,
          isOffersLoading: false,
          isFavoriteOffersLoading: false,
          isNearbyOffersLoading: false,
        },
        USER: {
          ...initialUserState,
        },
      });
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(screen.getByTestId(errorPageElementId)).toBeInTheDocument();
  });
});
