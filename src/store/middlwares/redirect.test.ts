import {beforeAll, beforeEach, describe, expect} from 'vitest';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import browserHistory from '../../browser-history.ts';
import {redirect} from './redirect.ts';
import {State} from '../../hooks/use-app-selector.ts';
import {AnyAction} from '@reduxjs/toolkit';
import {redirectToRoute} from '../action.ts';
import {Paths} from '../../const.ts';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(Paths.Login);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(Paths.Login);
  });

  it('should not redirect to "/favorites" with empty action', () => {
    const emptyAction = {type: '', payload: Paths.Favorites};

    store.dispatch(emptyAction);

    expect(browserHistory.location.pathname).not.toBe(Paths.Favorites);
  });
});
