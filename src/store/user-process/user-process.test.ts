import {Authorization} from '../../const.ts';
import {generateUserInfo} from '../../mocks/generate-mock-user-info.ts';
import {describe, expect} from 'vitest';
import {InitialUserState, loadUserData, userProcess} from './user-process.slice.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../service/api-actions.ts';

const initialUserState: InitialUserState = {
  authStatus: Authorization.Unknown,
  userInfo: {
    email: '',
    token: '',
    name: '',
    avatarUrl: '',
    isPro: false,
  },
};

const mockUser = generateUserInfo();

describe('userProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = initialUserState;

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialUserState;

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('"loadUserData" action works correct', () => {
    it('should return initial state with user info with "loadUserData" action', () => {
      const injectedUserInfo = mockUser;
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        userInfo: injectedUserInfo
      };

      const result = userProcess.reducer(initialState, loadUserData(injectedUserInfo));

      expect(result).toEqual(expectedState);
    });
  });

  describe('"checkAuthAction" action works correct', () => {
    it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        authStatus: Authorization.Auth,
      };
      const result = userProcess.reducer(initialState, checkAuthAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        authStatus: Authorization.NoAuth,
      };
      const result = userProcess.reducer(initialState, checkAuthAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"loginAction" action works correct', () => {
    it('should set "Auth" with "loginAction.fulfilled" action', () => {
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        authStatus: Authorization.Auth,
      };
      const result = userProcess.reducer(initialState, loginAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" with "loginAction.rejected" action', () => {
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        authStatus: Authorization.NoAuth,
      };
      const result = userProcess.reducer(initialState, loginAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('"logoutAction" action works correct', () => {
    it('should set "NoAuth" with "logoutAction.fulfilled" action', () => {
      const initialState = initialUserState;
      const expectedState = {
        ...initialState,
        authStatus: Authorization.NoAuth,
      };
      const result = userProcess.reducer(initialState, logoutAction.fulfilled);

      expect(result).toEqual(expectedState);
    });
  });
});
