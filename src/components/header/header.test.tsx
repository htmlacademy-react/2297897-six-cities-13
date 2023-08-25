import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoizedHeader} from './header.tsx';
import {APIPaths, Authorization} from '../../const.ts';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import faker from 'faker';
import {BACKEND_URL} from '../../service/api.ts';
import {extractActionsTypes} from '../../mocks/mock-state.ts';
import {logoutAction} from '../../service/api-actions.ts';

describe('Component: Header', () => {
  const logoElementId = 'logo-element';
  it('should render correctly with authStatus.Auth', () => {
    const {withStoreComponent} = withStore(<MemoizedHeader />, {
      USER: {
        authStatus: Authorization.Auth,
        userInfo: {
          token: 'test0k3n',
          email: 'test@test.com',
          avatarUrl: faker.internet.url(),
          isPro: false,
          name: 'John',
        },
      },
      OFFERS: {...initialOffersState},
    });

    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    expect(screen.getByTestId(logoElementId)).toBeInTheDocument();
    expect(screen.getByAltText('avatar'));
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly with authStatus.NoAuth', () => {
    const {withStoreComponent} = withStore(<MemoizedHeader />, {
      USER: {
        authStatus: Authorization.NoAuth,
        userInfo: {
          token: 'test0k3n',
          email: 'test@test.com',
          avatarUrl: faker.internet.url(),
          isPro: false,
          name: 'John',
        },
      },
      OFFERS: {...initialOffersState},
    });

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(logoElementId)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly with action click "Sign out"', async () => {
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(<MemoizedHeader />, {
      USER: {
        authStatus: Authorization.Auth,
        userInfo: {
          token: 'test0k3n',
          email: 'test@test.com',
          avatarUrl: faker.internet.url(),
          isPro: false,
          name: 'John',
        },
      },
      OFFERS: {...initialOffersState},
    });

    mockAxiosAdapter.onDelete(`${BACKEND_URL + APIPaths.Logout}`).reply(204);
    const prepComponent = withHistory(withStoreComponent);
    render(prepComponent);

    const signOutClickHandle = screen.getByText('Sign out');

    await userEvent.click(signOutClickHandle);

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });
});
