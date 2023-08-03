import {createReducer} from '@reduxjs/toolkit';
import {CITIES} from '../const.ts';
import {Offer} from '../mocks/offers.ts';

import {mockOffers} from '../mocks/offers.ts';
import {updateCityAction, updateFavoriteAction, updateSortMethod} from './action.ts';
import {allowedSortMethods, SortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';

export type InitialStateType = {
  city: typeof CITIES[number];
  offers: Offer[];
  sortMethod: allowedSortMethods;
}

const initialState: InitialStateType = {
  city: 'Amsterdam',
  offers: mockOffers,
  sortMethod: SortMethods.ByPopularity,
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
      .addCase(updateSortMethod, (state, action) => {
        state.sortMethod = action.payload;
      })
);

