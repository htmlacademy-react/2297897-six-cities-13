import {describe, expect} from 'vitest';
import {initialOffersState, Offer,} from '../../store/offers-process/offers-process.slice.ts';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {FavoritesPage} from './favorites-page.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {render, screen} from '@testing-library/react';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';

describe('Component: FavoritesPage', () => {
  const favoritesPageElementId = 'favorites-page-element';
  let mockFavoriteOffer = generateMockOffer(false) as Offer;
  mockFavoriteOffer = {
    ...mockFavoriteOffer,
    city: {
      ...mockFavoriteOffer.city,
      name: 'Amsterdam',
    },
  };

  it('should return page with offers when favorites not empty and favorite offers is already loaded', () => {
    const {withStoreComponent} = withStore(
      <FavoritesPage/>, {
        OFFERS: {
          ...initialOffersState,
          favoriteOffers: [mockFavoriteOffer],
        },
        USER: {
          ...initialUserState,
          authStatus: 'authorized',
        },
        LOADERS: {
          ...initialLoadingState,
          isFavoriteOffersLoading: false,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritesPageElementId)).toBeInTheDocument();
  });

  it('should return loading screen when favoriteOffersLoading is loading', () => {
    const loadingScreenContainerId = 'loading-container';
    const {withStoreComponent} = withStore(
      <FavoritesPage/>, {
        OFFERS: {
          ...initialOffersState,
          favoriteOffers: [mockFavoriteOffer],
        },
        USER: {
          ...initialUserState,
          authStatus: 'authorized',
        },
        LOADERS: {
          ...initialLoadingState,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loadingScreenContainerId)).toBeInTheDocument();
  });

  it('should return empty favorite page when favorites empty', () => {
    const {withStoreComponent} = withStore(
      <FavoritesPage/>, {
        OFFERS: {
          ...initialOffersState,
        },
        USER: {
          ...initialUserState,
          authStatus: 'authorized',
        },
        LOADERS: {
          ...initialLoadingState,
          isFavoriteOffersLoading: false,
        },
      }
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });
});
