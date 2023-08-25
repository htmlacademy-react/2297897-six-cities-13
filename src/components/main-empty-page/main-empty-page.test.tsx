import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {MainEmptyPage} from './main-empty-page.tsx';
import {render, screen} from '@testing-library/react';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: MainEmptyPage', () => {
  it('should render correctly', () => {
    const mainEmptyPageElementId = 'main-empty-page-element';
    const mockActiveCity = 'Amsterdam';
    const {withStoreComponent} = withStore(
      <MainEmptyPage activeCity={mockActiveCity}/>,
      {OFFERS: initialOffersState});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(mainEmptyPageElementId)).toBeInTheDocument();
  });
});
