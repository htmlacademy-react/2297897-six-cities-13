import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {FavoriteEmptyPage} from './favorite-empty-page.tsx';
import {render, screen} from '@testing-library/react';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: FavoriteEmptyPage', () => {
  it('should render correctly', () => {
    const favoriteEmptyPageElementId = 'favorite-empty-page-element';
    const {withStoreComponent} = withStore(
      <FavoriteEmptyPage/>,
      {USER: initialUserState, OFFERS: initialOffersState});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoriteEmptyPageElementId)).toBeInTheDocument();
  });
});
