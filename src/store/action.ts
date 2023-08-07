import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, CITIES} from '../const.ts';
import {allowedSortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';
import {ChosenOffer, Offer} from '../mocks/offers.ts';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (offerId: string) => ({payload: offerId}));

export const updateCityAction = createAction('city/updateCity',
  (newCity: typeof CITIES[number]) => ({payload: newCity}));

export const updateSortMethodAction = createAction('offers/updateSort',
  (newSortMethod: allowedSortMethods) => ({payload: newSortMethod}));

export const loadOffersAction = createAction('data/loadOffers',
  (offers: Offer[]) => ({payload: offers})
);

export const setLoadOffersStatusAction = createAction('data/setLoadOffersStatus',
  (status: boolean) => ({payload: status})
);

export const requireAuthorization = createAction('user/requireAuthorization',
  (status: AuthorizationStatus) => ({payload: status})
);

export const redirectAction = createAction('app/redirectToRoute',
  (route: string) => ({payload: route}));

export const loadChosenOffer = createAction('offer/loadOffer',
  (offer: ChosenOffer) => ({payload: offer}));
