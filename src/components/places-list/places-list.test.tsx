import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {PlacesList} from './places-list.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {Offer} from '../../store/offers-process/offers-process.slice.ts';
import {render, screen} from '@testing-library/react';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';

describe('Component: PlacesList', () => {
  const mockOffers = Array.from({length: 3}, () => generateMockOffer(false)) as Offer[];
  it('should render correctly', () => {
    const placesListElementId = 'places-list-element';
    const {withStoreComponent} = withStore(<PlacesList offers={mockOffers}/>, {USER: initialUserState});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(placesListElementId)).toBeInTheDocument();
  });
});
