import {render, screen} from '@testing-library/react';
import {ErrorPage} from './error-page.tsx';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const errorPageElementId = 'error-page-element';
    const {withStoreComponent} = withStore(
      <ErrorPage />,
      {USER: initialUserState, OFFERS: initialOffersState});

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId(errorPageElementId)).toBeInTheDocument();
  });
});
