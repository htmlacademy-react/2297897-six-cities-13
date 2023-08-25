import {datatype} from 'faker';
import {dropToken, getToken, saveToken} from './token.ts';

const localStorageMock = (function localStorageMock () {
  let store = {} as Record<string, string>;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Token', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return empty store when localStorage is empty', () => {
    const token = getToken();
    expect(token)
      .toEqual('');
  });

  it('should return updated token', () => {
    const firstMockToken = datatype.string(10);
    const secondMockToken = datatype.string(10);
    const thirdMockToken = datatype.string(10);

    saveToken(firstMockToken);
    expect(getToken()).toEqual(firstMockToken);

    saveToken(secondMockToken);

    saveToken(thirdMockToken);
    expect(getToken()).toEqual(thirdMockToken);
  });


  it('drop token works correctly', () => {
    const mockToken = datatype.string(10);

    saveToken(mockToken);

    dropToken();
    expect(getToken()).toEqual('');

    dropToken();
    dropToken();
    expect(getToken()).toEqual('');
  });
});
