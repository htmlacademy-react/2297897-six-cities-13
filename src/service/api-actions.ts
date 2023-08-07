import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/use-app-dispatch.ts';
import {State} from '../hooks/use-app-selector.ts';
import {AxiosInstance} from 'axios';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {APIPaths, Authorization, AuthorizationStatus, Paths} from '../const.ts';
import {dropToken, saveToken} from './token.ts';
import {
  loadChosenOffer,
  loadOffersAction,
  redirectAction,
  requireAuthorization,
  setLoadOffersStatusAction
} from '../store/action.ts';

export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  id: string;
  email: string;
  token: string;
}

export type OfferId = string;

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadOffersStatusAction(true));
    const {data} = await api.get<Offer[]>(APIPaths.Offers);
    dispatch(setLoadOffersStatusAction(false));
    dispatch(loadOffersAction(data));
  }
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      await api.get<AuthorizationStatus>(APIPaths.Login);
      dispatch(requireAuthorization(Authorization.Auth));
    } catch {
      dispatch(requireAuthorization(Authorization.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) =>{
    const {data: {token}} = await api.post<UserData>(APIPaths.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(Authorization.Auth));
    dispatch(redirectAction(Paths.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIPaths.Logout);
    dropToken();
    dispatch(requireAuthorization(Authorization.NoAuth));
  }
);

export const fetchChosenOffer = createAsyncThunk<void, OfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId: OfferId, {dispatch, extra: api})=>{
    const {data} = await api.get<ChosenOffer>(`${APIPaths.Offers}/${offerId}`);
    dispatch(loadChosenOffer(data));
  }
);
