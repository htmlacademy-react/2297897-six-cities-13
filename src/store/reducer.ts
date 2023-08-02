import {createReducer} from '@reduxjs/toolkit';
import {CITIES} from '../const.ts';
import {Offer} from '../mocks/offers.ts';

import {mockOffers} from '../mocks/offers.ts';
import {updateCityAction, updateFavoriteAction} from './action.ts';

export type InitialStateType = {
  city: typeof CITIES[number];
  offers: Offer[];
}

const initialState: InitialStateType = {
  city: 'Amsterdam',
  offers: mockOffers
};

export const reducer = createReducer<InitialStateType>(
  initialState,
  (builder) =>
    builder
      .addCase(updateFavoriteAction,
        (state, action) => {
          const currentOffer = state.offers.findIndex(
            (offer) => offer.id === action.payload.id
          );
          state.offers[currentOffer].isFavorite = !state.offers[currentOffer].isFavorite;
        })
      .addCase(updateCityAction,
        (state, action) => {
          state.city = action.payload;
        })
);

