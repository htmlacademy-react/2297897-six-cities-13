import {ReactElement, ReactNode} from 'react';
import {createMemoryHistory, MemoryHistory} from 'history';
import {HistoryRouter} from '../components/history-route/history-router.tsx';
import {HelmetProvider} from 'react-helmet-async';
import {State} from '../hooks/use-app-selector.ts';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../service/api.ts';
import thunk from 'redux-thunk';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch} from './app-thunk-dispatch.ts';
import {Provider} from 'react-redux';

export const withHistory = (component: ReactNode, history?: MemoryHistory) => {
  const memoryHistory = history ?? createMemoryHistory();

  return(
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component};
      </HelmetProvider>
    </HistoryRouter>
  );
};

type ComponentWithMockStore = {
    withStoreComponent: ReactElement;
    mockStore: MockStore;
    mockAxiosAdapter: MockAdapter;
}

export const withStore = (
  component: ReactElement,
  initialState: Partial<State> = {},
): ComponentWithMockStore => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
};
