import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {Offer} from '../../store/offers-process/offers-process.slice.ts';
import {render, screen} from '@testing-library/react';
import {FavoritePlaceCard} from './favorite-place-card.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {APIPaths} from '../../const.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../mocks/mock-state.ts';
import {setFavoriteAction} from '../../service/api-actions.ts';


describe('Component: FavoritePlaceCard', () => {
  let mockOffer = generateMockOffer(false) as Offer;
  mockOffer = {
    ...mockOffer,
    isFavorite: true,
  };

  it('should render correctly', () => {
    const favoritePlaceCardElementId = 'favorite-place-card-element';
    const {withStoreComponent} = withStore(
      <FavoritePlaceCard {...mockOffer} previewImg={mockOffer.previewImage}/>,
      {USER: initialUserState});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(favoritePlaceCardElementId)).toBeInTheDocument();
  });

  it('should dispatch setFavoriteAction on favorite button click with 0 at end of route', async () => {
    const favoriteButtonElementId = 'favorite-button-element';
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(
      <FavoritePlaceCard {...mockOffer} previewImg={mockOffer.previewImage}/>,
      {USER: {...initialUserState, authStatus: 'authorized'}});
    const preparedComponent = withHistory(withStoreComponent);

    mockAxiosAdapter.onPost(`${APIPaths.Favorite}/${mockOffer.id}/0`).reply(200);

    render(preparedComponent);
    await userEvent.click(screen.getByTestId(favoriteButtonElementId));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual(expect.arrayContaining([
      setFavoriteAction.pending.type,
      setFavoriteAction.fulfilled.type
    ]));
  });
});
