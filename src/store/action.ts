import {createAction} from '@reduxjs/toolkit';
import {CITIES} from '../const.ts';
import {allowedSortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (offerId: string) => ({payload: offerId}));

export const updateCityAction = createAction('city/updateCity',
  (newCity: typeof CITIES[number]) => ({payload: newCity}));

export const updateSortMethod = createAction('offers/updateSort',
  (newSortMethod: allowedSortMethods) => ({payload: newSortMethod}));
