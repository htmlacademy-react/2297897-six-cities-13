import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {MainPage} from './main-page.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {initialOffersState, Offer} from '../../store/offers-process/offers-process.slice.ts';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {render, screen} from '@testing-library/react';

describe('Component: MainPage', () => {
  let mockOffer = generateMockOffer(false) as Offer;
  mockOffer = {
    ...mockOffer,
    city: {
      ...mockOffer.city,
      name: 'Amsterdam',
    },
  };

  it('should render correctly with already loaded offers and after authorization check', () => {
    const mainPageElementId = 'main-page-element';
    const {withStoreComponent} = withStore(
      <MainPage/>, {
        USER: {
          ...initialUserState,
          authStatus: 'authorized',
        },
        LOADERS: {
          ...initialLoadingState,
          isOffersLoading: false,
        },
        OFFERS: {
          ...initialOffersState,
          offers: [mockOffer],
        },
      });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(mainPageElementId)).toBeInTheDocument();
  });

  it('should render loading screen before authorization check', () => {
    const loadingScreenElementId = 'loading-container';
    const {withStoreComponent} = withStore(
      <MainPage/>, {
        USER: {
          ...initialUserState,
        },
        LOADERS: {
          ...initialLoadingState,
          isOffersLoading: false,
        },
        OFFERS: {
          ...initialOffersState,
          offers: [mockOffer],
        },
      });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loadingScreenElementId)).toBeInTheDocument();
  });

  it('should render loading screen when offers is loading', () => {
    const loadingScreenElementId = 'loading-container';
    const {withStoreComponent} = withStore(
      <MainPage/>, {
        USER: {
          ...initialUserState,
          authStatus: 'non-authorized',
        },
        LOADERS: {
          ...initialLoadingState,
        },
        OFFERS: {
          ...initialOffersState,
          offers: [mockOffer],
        },
      });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loadingScreenElementId)).toBeInTheDocument();
  });

  it('should return main empty page when offers not found', () => {
    const mainEmptyPageElementId = 'main-empty-page-element';
    const {withStoreComponent} = withStore(
      <MainPage/>, {
        USER: {
          ...initialUserState,
          authStatus: 'non-authorized',
        },
        LOADERS: {
          ...initialLoadingState,
          isOffersLoading: false,
        },
        OFFERS: {
          ...initialOffersState,
        },
      });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(mainEmptyPageElementId)).toBeInTheDocument();
  });
});
