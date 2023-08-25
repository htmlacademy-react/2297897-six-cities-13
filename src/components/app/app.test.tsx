import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import {App} from './app';
import {Paths} from '../../const.ts';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {initialOffersState} from '../../store/offers-process/offers-process.slice.ts';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';

describe('Component: App', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainPage when user navigate to "/"', () => {
    const mainEmptyPageElementId = 'main-empty-page-element';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      OFFERS: initialOffersState,
      LOADERS: {
        ...initialLoadingState,
        isOffersLoading: false,
      },
      USER: {
        ...initialUserState,
        authStatus: 'authorized',
      }
    });
    mockHistory.push(Paths.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(mainEmptyPageElementId)).toBeInTheDocument();
  });

  it('should render LoginPage when user navigate to "/login"', () => {
    const loginElementTestId = 'login-element';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      LOADERS: initialLoadingState,
      USER: {
        ...initialUserState,
        authStatus: 'non-authorized',
      },
    });
    mockHistory.push(Paths.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
  });

  it('should render ErrorPage when user navigate to non-exist route', () => {
    const errorPageElementId = 'error-page-element';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, {
      LOADERS: initialLoadingState,
      USER: {
        ...initialUserState,
        authStatus: 'non-authorized',
      },
      OFFERS: initialOffersState,
    });
    const unknownRoute = '/not-exist-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId(errorPageElementId)).toBeInTheDocument();
  });
});
