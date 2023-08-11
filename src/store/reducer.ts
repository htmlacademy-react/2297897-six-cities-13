import {createReducer} from '@reduxjs/toolkit';
import {Authorization, AuthorizationStatus, CITIES} from '../const.ts';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {allowedSortMethods, SortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';
import {Review} from '../mocks/reviews.ts';
import {
  loadChosenOffer,
  loadChosenOfferReviews,
  loadNearbyOffers,
  loadOffersAction,
  requireAuthorization,
  saveUserInfoAction,
  setLoadChosenOfferStatusAction,
  setLoadNearbyOfferStatusAction,
  setLoadOfferReviewsAction,
  setLoadOffersStatusAction,
  setLoadUserInfoAction, setPostingCommentStatus,
  sortOffersAction,
  updateCityAction,
  updateFavoriteAction,
  updateSortMethodAction,
} from './action.ts';

export type OfferInfo = {
  offerDetails: ChosenOffer | null;
  offerReviews: Review[];
  nearbyOffers: Offer[];
};

export type LoadingStatuses = {
  isOffersLoading : boolean;
  isChosenOfferLoading: boolean;
  isNearbyOffersLoading: boolean;
  isOfferReviewsLoading: boolean;
  isUserInfoLoading: boolean;
  isCommentPosting: boolean;
};

export type UserInfo = {
  avatarUrl: string;
  email: string;
  isPro: boolean;
  name: string;
  token: string;
};

export type InitialStateType = {
  city: typeof CITIES[number];
  offers: Offer[];
  savedOrderOffers: Offer[];
  sortMethod: allowedSortMethods;
  userInfo: UserInfo;
  authorizationStatus: AuthorizationStatus;
  loadingStatuses: LoadingStatuses;
  chosenOffer: OfferInfo;
};

const initialState: InitialStateType = {
  city: 'Amsterdam',
  offers: [],
  savedOrderOffers: [],
  sortMethod: SortMethods.ByPopularity,
  userInfo: {
    avatarUrl: '',
    email: '',
    isPro: false,
    name: '',
    token: '',
  },
  authorizationStatus: Authorization.Unknown,
  loadingStatuses: {
    isOffersLoading: true,
    isChosenOfferLoading: true,
    isNearbyOffersLoading: true,
    isOfferReviewsLoading: false,
    isUserInfoLoading: false,
    isCommentPosting: false,
  },
  chosenOffer: {
    offerDetails: null,
    offerReviews: [],
    nearbyOffers: [],
  }
};

export const reducer = createReducer<InitialStateType>(
  initialState,
  (builder) =>
    builder
      .addCase(updateFavoriteAction,
        (state, action) => {
          const currentOffer = state.offers.findIndex(
            (offer) => offer.id === action.payload
          );
          state.offers[currentOffer].isFavorite = !state.offers[currentOffer].isFavorite;
        })
      .addCase(updateCityAction,
        (state, action) => {
          state.city = action.payload;
        })
      .addCase(updateSortMethodAction, (state, action) =>{
        state.sortMethod = action.payload;
      })
      .addCase(sortOffersAction, (state, action) => {
        localStorage.setItem('initialOffers', JSON.stringify(state.offers));
        switch(action.payload){
          case SortMethods.ByPopularity:
            state.offers = state.savedOrderOffers;
            break;
          case SortMethods.ByPriceIncrease:
            state.offers = state.offers.sort((a, b) => a.price - b.price);
            break;
          case SortMethods.ByPriceDecrease:
            state.offers = state.offers.sort((a, b) => b.price - a.price);
            break;
          case SortMethods.ByRating:
            state.offers = state.offers.sort((a, b) => b.rating - a.rating);
            break;
          default:
            state.offers = state.savedOrderOffers;
        }
      })
      .addCase(saveUserInfoAction, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(loadOffersAction, (state, action) => {
        state.offers = action.payload;
        state.savedOrderOffers = action.payload;
      })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setLoadOffersStatusAction, (state, action) => {
        state.loadingStatuses.isOffersLoading = action.payload;
      })
      .addCase(setLoadChosenOfferStatusAction, (state, action) => {
        state.loadingStatuses.isChosenOfferLoading = action.payload;
      })
      .addCase(setLoadNearbyOfferStatusAction, (state, action) => {
        state.loadingStatuses.isNearbyOffersLoading = action.payload;
      })
      .addCase(setLoadOfferReviewsAction, (state, action) => {
        state.loadingStatuses.isOfferReviewsLoading = action.payload;
      })
      .addCase(setLoadUserInfoAction, (state, action) => {
        state.loadingStatuses.isUserInfoLoading = action.payload;
      })
      .addCase(setPostingCommentStatus, (state, action) => {
        state.loadingStatuses.isCommentPosting = action.payload;
      })
      .addCase(loadChosenOffer, (state, action) => {
        state.chosenOffer.offerDetails = action.payload;
      })
      .addCase(loadChosenOfferReviews, (state, action) => {
        state.chosenOffer.offerReviews = action.payload;
      })
      .addCase(loadNearbyOffers, (state, action) => {
        state.chosenOffer.nearbyOffers = action.payload;
      })
);

