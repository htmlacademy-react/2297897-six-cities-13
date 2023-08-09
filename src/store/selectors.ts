import {InitialStateType} from './reducer.ts';

export const getOffers = (state: InitialStateType) => state.offers;

export const getLoadingStatuses = (state: InitialStateType) => state.loadingStatuses;

export const getOfferDetails = (state: InitialStateType) => state.chosenOffer.offerDetails!;

export const getOfferReviews = (state: InitialStateType) => state.chosenOffer.offerReviews;

export const getNearbyOffers = (state: InitialStateType) => state.chosenOffer.nearbyOffers;

export const getAuthStatus = (state: InitialStateType) => state.authorizationStatus;

export const getUserInfo = (state: InitialStateType) => state.userInfo;

export const getActiveCity = (state: InitialStateType) => state.city;
