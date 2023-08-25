import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {MemoizedPlacesSortingForm, SortMethods} from './places-sorting-form.tsx';
import {fireEvent, render, screen} from '@testing-library/react';
import {initialOffersState, sortOffers} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: PlacesSortingForm', () => {
  const placesSortingFormElementId = 'places-sorting-form-element';

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <MemoizedPlacesSortingForm/>,
      {OFFERS: {...initialOffersState}}
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(placesSortingFormElementId)).toBeInTheDocument();
  });

  it('changes sort method correctly', () => {
    const placesSortingArrowElementId = 'places-sorting-arrow-element';
    const mockSortMethod = SortMethods.ByRating;
    const {withStoreComponent, mockStore} = withStore(
      <MemoizedPlacesSortingForm/>,
      {OFFERS: {...initialOffersState}}
    );
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    const currentSort = screen.getByTestId('current-sort-element');
    fireEvent.click(screen.getByTestId(placesSortingArrowElementId));
    fireEvent.click(screen.getByText(mockSortMethod));

    expect(currentSort.textContent).toBe(mockSortMethod);
    expect(mockStore.getActions()).toContainEqual({type: sortOffers.type, payload: mockSortMethod});
  });
});
