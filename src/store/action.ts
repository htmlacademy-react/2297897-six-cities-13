import {createAction} from '@reduxjs/toolkit';
import {CITIES} from '../const.ts';
import {allowedSortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (offerId: string) => ({payload: offerId}));

export const updateCityAction = createAction('city/updateCity',
  (value: typeof CITIES[number]) => ({payload: value}));

export const updateSortMethod = createAction('offers/updateSort',
  (value: allowedSortMethods) => ({payload: value}));
