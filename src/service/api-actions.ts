import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/use-app-dispatch.ts';
import {State} from '../hooks/use-app-selector.ts';
import {AxiosInstance} from 'axios';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {APIPaths, MAX_REVIEWS_ON_PAGE, Paths} from '../const.ts';
import {dropToken, saveToken} from './token.ts';
import {Review} from '../mocks/reviews.ts';
import {CommentWithOfferId} from '../components/commentary-send-form/comment-send-form.tsx';
import {redirectToRoute} from '../store/action.ts';
import {loadUserData, UserInfo} from '../store/user-process/user-process.slice.ts';
import {
  loadChosenOffer,
  loadNearbyOffers,
  loadOfferReviews,
  loadOffers
} from '../store/offers-process/offers-process.slice.ts';

export type AuthData = {
  login: string;
  password: string;
}

export type UserData = {
  id: string;
  email: string;
  token: string;
}

export type favoriteData = {
  id: string;
  isFavorite: boolean;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIPaths.Offers);
    dispatch(loadOffers(data));
  }
);

export const fetchChosenOfferAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchOffer',
  async (offerId, {dispatch, extra: api})=>{
    const {data: offerDetails} = await api.get<ChosenOffer>(`${APIPaths.Offers}/${offerId}`);
    dispatch(loadChosenOffer(offerDetails));
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchOfferReviews',
  async (offerId, {dispatch, extra: api})=> {
    const {data: reviews} = await api.get<Review[]>(`${APIPaths.Comments}/${offerId}`);
    dispatch(loadOfferReviews(reviews.slice(-MAX_REVIEWS_ON_PAGE).reverse()));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchNearbyOffers',
  async(offerId, {dispatch, extra: api}) => {
    const {data: nearbyOffers} = await api.get<Offer[]>(`${APIPaths.Offers}/${offerId}/nearby`);
    // const offers =
    dispatch(loadNearbyOffers(nearbyOffers));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data: userData} = await api.get<UserInfo>(APIPaths.Login);
    dispatch(loadUserData(userData));
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async ({login: email, password}, {dispatch, extra: api}) =>{
    const {data: {token}} = await api.post<UserData>(APIPaths.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(Paths.Main));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIPaths.Logout);
    dropToken();
  }
);

export const postCommentAction = createAsyncThunk<void, CommentWithOfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFER/postComment',
  async ({rating, description: comment, offerId}, {extra: api}) => {
    await api.post(`${APIPaths.Comments}/${offerId}`, {rating, comment});
  }
);

export const setFavoriteAction = createAsyncThunk<void, favoriteData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFER/setFavorite',
  async({id: offerId, isFavorite}, {dispatch, extra: api}) => {
    await api.post(`${APIPaths.Favorite}/${offerId}/${Number(!isFavorite)}`);
    dispatch(fetchOffersAction);
  }
);
