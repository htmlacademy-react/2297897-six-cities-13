import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/use-app-dispatch.ts';
import {State} from '../hooks/use-app-selector.ts';
import {AxiosInstance} from 'axios';
import {ChosenOffer, Offer, sortOffers} from '../store/offers-process/offers-process.slice.ts';
import {APIPaths, Authorization, NameSpace, Paths} from '../const.ts';
import {dropToken, saveToken} from './token.ts';
import {Review} from '../store/offers-process/offers-process.slice.ts';
import {CommentWithOfferId} from '../components/comment-send-form/comment-send-form.tsx';
import {redirectToRoute} from '../store/action.ts';
import {loadUserData, UserInfo} from '../store/user-process/user-process.slice.ts';
import {shuffleNearby} from '../utils.ts';
import {toast} from 'react-toastify';
import {
  loadChosenOffer,
  loadFavoriteOffers,
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
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const {data} = await api.get<Offer[]>(APIPaths.Offers);
      dispatch(loadOffers(data));
      const currentSort = getState().OFFERS.sortMethod;
      dispatch(sortOffers(currentSort));
    } catch (error) {
      toast.error('Problem with getting offers. Please try later');
      throw error;
    }
  }
);

export const fetchChosenOfferAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchOffer',
  async (offerId, {dispatch, extra: api})=>{
    try {
      const {data: offerDetails} = await api.get<ChosenOffer>(`${APIPaths.Offers}/${offerId}`);
      dispatch(loadChosenOffer(offerDetails));
    } catch(error) {
      toast.error('Problem with getting data. Please try later');
      throw error;
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFER/fetchFavoriteOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: favoriteOffers} = await api.get<Offer[]>(APIPaths.Favorite);
      dispatch(loadFavoriteOffers(favoriteOffers));
    } catch(error) {
      toast.error('Problem with getting favorites. Please try later');
      throw error;
    }
  }
);

export const fetchOfferReviewsAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchOfferReviews',
  async (offerId, {dispatch, extra: api})=> {
    try {
      const {data: reviews} = await api.get<Review[]>(`${APIPaths.Comments}/${offerId}`);
      dispatch(loadOfferReviews(reviews));
    } catch(error) {
      toast.error('Problem with getting reviews. Please try later');
      throw error;
    }
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFERS/fetchNearbyOffers',
  async(offerId, {dispatch, extra: api}) => {
    try{
      const {data: nearbyOffers} = await api.get<Offer[]>(`${APIPaths.Offers}/${offerId}/nearby`);
      const shuffledNearbyOffers = shuffleNearby(nearbyOffers);
      dispatch(loadNearbyOffers(shuffledNearbyOffers));
    } catch(error) {
      toast.error('Problem with getting nearby offers. Please try later');
      throw error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, getState, extra: api}) => {
    const {data: userData} = await api.get<UserInfo>(APIPaths.Login);
    dispatch(loadUserData(userData));
    if(getState()[NameSpace.User].authStatus === Authorization.Auth){
      dispatch(fetchFavoriteOffersAction());
    }
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
    dispatch(fetchOffersAction());
    dispatch(redirectToRoute(Paths.Main));
    dispatch(checkAuthAction());
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {extra: api}) => {
    try {
      await api.delete(APIPaths.Logout);
      dropToken();
    } catch {
      toast.error('Problem with logout. Please try later');
    }
  }
);

export const postCommentAction = createAsyncThunk<void, CommentWithOfferId, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'OFFER/postComment',
  async ({rating, description: comment, offerId}, {extra: api}) => {
    try{
      await api.post(`${APIPaths.Comments}/${offerId}`, {rating, comment});
    } catch(error) {
      toast.error('Problem with sending commentary. Please, try later');
      throw error;
    }
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
    await dispatch(fetchFavoriteOffersAction());
    await dispatch(fetchOffersAction());
  }
);
