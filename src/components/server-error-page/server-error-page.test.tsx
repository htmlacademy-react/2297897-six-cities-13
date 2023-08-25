import {describe, expect} from 'vitest';
import {withStore} from '../../mocks/mock-component.tsx';
import {ServerErrorPage} from './server-error-page.tsx';
import {render, screen} from '@testing-library/react';
import {APIPaths} from '../../const.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../mocks/mock-state.ts';
import {fetchOffersAction} from '../../service/api-actions.ts';
import {
  initialOffersState,
  loadOffers,
  sortOffers
} from '../../store/offers-process/offers-process.slice.ts';

describe('Component: ServerErrorScreen', () => {
  it('should render correctly', () => {
    const firstExpectedText = 'Server is not available';
    const {withStoreComponent} = withStore(<ServerErrorPage/>, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch "fetchOffersAction" when user clicked reloadButton', async () => {
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(<ServerErrorPage/>, {OFFERS: initialOffersState});
    mockAxiosAdapter.onGet(APIPaths.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      loadOffers.type,
      sortOffers.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });
});
