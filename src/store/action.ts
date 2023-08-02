import {createAction} from '@reduxjs/toolkit';
import {CITIES} from '../const.ts';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (offerId: string) => ({payload: offerId}));
export const updateCityAction = createAction('city/updateCity',
  (value: typeof CITIES[number]) => ({payload: value}));
