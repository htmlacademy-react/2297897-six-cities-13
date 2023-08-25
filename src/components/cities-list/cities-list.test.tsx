import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {MemoizedCitiesList} from './cities-list.tsx';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const citiesListElementId = 'cities-list-element';
    const {withStoreComponent} = withStore(<MemoizedCitiesList />, {OFFERS: initialOffersState});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(citiesListElementId)).toBeInTheDocument();
  });
});
