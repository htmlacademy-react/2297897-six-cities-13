import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../mocks/offers.ts';
import {CITIES} from '../const.ts';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (value: Offer) => ({payload: value}));
export const updateCityAction = createAction('city/updateCity',
  (value: typeof CITIES[number]) => ({payload: value}));
