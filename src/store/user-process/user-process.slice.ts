import {createSlice} from '@reduxjs/toolkit';
import {Authorization, NameSpace} from '../../const.ts';
import {checkAuthAction, loginAction, logoutAction} from '../../service/api-actions.ts';

export type UserInfo = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type AuthorizationStatus = typeof Authorization[keyof typeof Authorization];

export type InitialUserState = {
  authStatus: AuthorizationStatus;
  userInfo: UserInfo;
}

export const initialUserState: InitialUserState = {
  authStatus: Authorization.Unknown,
  userInfo: {
    email: '',
    token: '',
    name: '',
    avatarUrl: '',
    isPro: false,
  },
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState: initialUserState,
  reducers: {
    loadUserData: (state, action: {payload: UserInfo}) => {
      state.userInfo = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) =>{
        state.authStatus = Authorization.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = Authorization.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = Authorization.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = Authorization.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = Authorization.NoAuth;
      });
  }
});

export const {loadUserData} = userProcess.actions;
