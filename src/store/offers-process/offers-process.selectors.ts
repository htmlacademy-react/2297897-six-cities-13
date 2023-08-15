import {Offer} from '../../mocks/offers.ts';
import {NameSpace} from '../../const.ts';
import {allowedSortMethods} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {State} from '../../hooks/use-app-selector.ts';
import {City, OfferInfo} from './offers-process.slice.ts';

export const getOffers = (state: State): Offer[] => state[NameSpace.Offers].offers;

export const getSortMethod = (state: State): allowedSortMethods => state[NameSpace.Offers].sortMethod;

export const getChosenOffer = (state: State): OfferInfo => state[NameSpace.Offers].chosenOffer;

export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Offers].favoriteOffers;

export const getOffersCity = (state: State): City => state[NameSpace.Offers].offersCity;
