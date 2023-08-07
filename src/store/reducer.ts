import {createReducer} from '@reduxjs/toolkit';
import {Authorization, AuthorizationStatus, CITIES} from '../const.ts';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {allowedSortMethods, SortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';
import {
  loadChosenOffer,
  loadOffersAction,
  requireAuthorization,
  setLoadOffersStatusAction,
  updateCityAction,
  updateFavoriteAction,
  updateSortMethodAction
} from './action.ts';

export type InitialStateType = {
  city: typeof CITIES[number];
  offers: Offer[];
  sortMethod: allowedSortMethods;
  authorizationStatus: AuthorizationStatus;
  loadingStatus: boolean;
  chosenOffer: ChosenOffer | null;
}

const initialState: InitialStateType = {
  city: 'Amsterdam',
  offers: [],
  sortMethod: SortMethods.ByPopularity,
  authorizationStatus: Authorization.Unknown,
  loadingStatus: true,
  chosenOffer: null,
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
      .addCase(updateSortMethodAction, (state, action) => {
        state.sortMethod = action.payload;
      })
      .addCase(loadOffersAction, (state, action) => {
        state.offers = action.payload;
      })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setLoadOffersStatusAction, (state, action) => {
        state.loadingStatus = action.payload;
      })
      .addCase(loadChosenOffer, (state, action) => {
        state.chosenOffer = action.payload;
      })
);

