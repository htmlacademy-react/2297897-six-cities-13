import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, CITIES} from '../const.ts';
import {allowedSortMethods} from '../components/places-sorting-form/places-sorting-form.tsx';
import {ChosenOffer, Offer} from '../mocks/offers.ts';
import {Review} from '../mocks/reviews.ts';
import {UserInfo} from './reducer.ts';

export const updateFavoriteAction = createAction('offer/updateFavorite',
  (offerId: string) => ({payload: offerId}));

export const updateCityAction = createAction('city/updateCity',
  (newCity: typeof CITIES[number]) => ({payload: newCity}));

export const updateSortMethodAction = createAction('offers/updateSortMethod',
  (sortMethod: allowedSortMethods) => ({payload: sortMethod})
);

export const sortOffersAction = createAction('offers/sortOffers',
  (newSortMethod: allowedSortMethods) => ({payload: newSortMethod}));

export const loadOffersAction = createAction('data/loadOffers',
  (offers: Offer[]) => ({payload: offers})
);

export const setLoadChosenOfferStatusAction = createAction('data/setLoadChosenOffersStatus',
  (status: boolean) => ({payload: status})
);

export const setLoadNearbyOfferStatusAction = createAction('data/setLoadNearbyOffersStatus',
  (status: boolean) => ({payload: status})
);

export const setLoadOfferReviewsAction = createAction('data/setLoadOfferReviewsStatus',
  (status: boolean) => ({payload: status})
);

export const setLoadOffersStatusAction = createAction('data/setLoadOffersStatus',
  (status: boolean) => ({payload: status})
);

export const setLoadUserInfoAction = createAction('data/setLoadUserInfoStatus',
  (status: boolean) => ({payload: status})
);
export const saveUserInfoAction = createAction('user/saveInfo',
  (userInfo: UserInfo) => ({payload: userInfo})
);

export const requireAuthorization = createAction('user/requireAuthorization',
  (status: AuthorizationStatus) => ({payload: status})
);

export const redirectAction = createAction('app/redirectToRoute',
  (route: string) => ({payload: route})
);

export const loadChosenOffer = createAction('offer/loadOfferDetails',
  (offer: ChosenOffer) => ({payload: offer})
);
export const loadChosenOfferReviews = createAction('offer/loadOfferComments',
  (reviews: Review[]) => ({payload: reviews})
);
export const loadNearbyOffers = createAction('offer/loadNearbyOffers',
  (nearbyOffers: Offer[]) => ({payload: nearbyOffers})
);
