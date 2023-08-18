import {Offer} from './offers-process.slice.ts';
import {NameSpace} from '../../const.ts';
import {allowedSortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {State} from '../../hooks/use-app-selector.ts';
import {City, OfferInfo} from './offers-process.slice.ts';

export const getOffers = (state: Pick<State, typeof NameSpace.Offers>): Offer[] => state[NameSpace.Offers].offers;

export const getSortMethod = (state: Pick<State, typeof NameSpace.Offers>): allowedSortMethods => state[NameSpace.Offers].sortMethod;

export const getChosenOffer = (state: Pick<State, typeof NameSpace.Offers>): OfferInfo => state[NameSpace.Offers].chosenOffer;

export const getFavoriteOffers = (state: Pick<State, typeof NameSpace.Offers>): Offer[] => state[NameSpace.Offers].favoriteOffers;

export const getOffersCity = (state: Pick<State, typeof NameSpace.Offers>): City => state[NameSpace.Offers].offersCity;
