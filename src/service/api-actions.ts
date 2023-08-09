import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/use-app-dispatch.ts';
import {State} from '../hooks/use-app-selector.ts';
import {AxiosInstance} from 'axios';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {APIPaths, Authorization, AuthorizationStatus, Paths} from '../const.ts';
import {dropToken, saveToken} from './token.ts';
import {Review} from '../mocks/reviews.ts';
import {UserInfo} from '../store/reducer.ts';
import {CommentWithOfferId} from '../components/commentary-send-form/comment-send-form.tsx';
import {
  loadChosenOffer,
  loadChosenOfferReviews,
  loadNearbyOffers,
  loadOffersAction,
  redirectAction,
  requireAuthorization,
  saveUserInfoAction,
  setLoadChosenOfferStatusAction,
  setLoadNearbyOfferStatusAction,
  setLoadOfferReviewsAction,
  setLoadOffersStatusAction,
  setLoadUserInfoAction,
  setPostingCommentStatus,
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

export const fetchChosenOffer = createAsyncThunk<void, OfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId, {dispatch, extra: api})=>{
    dispatch(setLoadChosenOfferStatusAction(true));
    const {data: offerDetails} = await api.get<ChosenOffer>(`${APIPaths.Offers}/${offerId}`);
    dispatch(setLoadChosenOfferStatusAction(false));
    dispatch(loadChosenOffer(offerDetails));
  }
);

export const fetchOfferReviews = createAsyncThunk<void, OfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'offer/fetchOfferReviews',
  async (offerId, {dispatch, extra: api})=> {
    dispatch(setLoadOfferReviewsAction(true));
    const {data: reviews} = await api.get<Review[]>(`${APIPaths.Comments}/${offerId}`);
    dispatch(setLoadOfferReviewsAction(false));
    dispatch(loadChosenOfferReviews(reviews));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, OfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'offer/fetchNearbyOffers',
  async(offerId, {dispatch, extra: api}) => {
    dispatch(setLoadNearbyOfferStatusAction(true));
    const {data: nearbyOffers} = await api.get<Offer[]>(`${APIPaths.Offers}/${offerId}/nearby`);
    dispatch(setLoadNearbyOfferStatusAction(false));
    dispatch(loadNearbyOffers(nearbyOffers));
  }
);

export const fetchUserInfo = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchUserData',
  async (_args, {dispatch, extra: api}) => {
    setLoadUserInfoAction(true);
    const {data} = await api.get<UserInfo>(APIPaths.Login);
    setLoadUserInfoAction(false);
    dispatch(saveUserInfoAction(data));
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

export const postComment = createAsyncThunk<void, CommentWithOfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/postComment',
  async ({rating, description: comment, offerId}, {dispatch, extra: api}) => {
    dispatch(setPostingCommentStatus(true));
    await api.post(`${APIPaths.Comments}/${offerId}`, {rating, comment});
    dispatch(setPostingCommentStatus(false));
  }
);
