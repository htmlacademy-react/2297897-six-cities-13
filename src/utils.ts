import {Authorization, Months, Paths} from './const.ts';
import {Offer} from './store/offers-process/offers-process.slice.ts';
import {setFavoriteAction} from './service/api-actions.ts';
import {redirectToRoute} from './store/action.ts';
import {AppDispatch} from './hooks/use-app-dispatch.ts';
import {AuthorizationStatus} from './store/user-process/user-process.slice.ts';

export const humanizeISODate = (date: string) => {
  const parseDate = new Date(date);
  return `${parseDate.getDate()} ${Months[parseDate.getMonth()]}`;
};

export const shuffleNearby = (nearbyOffers: Offer[]) => {
  const shuffledNearbyOffers = [...nearbyOffers];
  for(let i = nearbyOffers.length - 1; i > 0; i--){
    const random = Math.floor(Math.random() * (i + 1));
    [shuffledNearbyOffers[random], shuffledNearbyOffers[i]] = [shuffledNearbyOffers[i], shuffledNearbyOffers[random]];
  }
  return shuffledNearbyOffers.slice(0, 3);
};

export const handleFavoriteClick = (authStatus: AuthorizationStatus, dispatch: AppDispatch, offerId: string, isFavorite: boolean) => authStatus === Authorization.Auth
  ? dispatch(setFavoriteAction({id: offerId, isFavorite}))
  : dispatch(redirectToRoute(Paths.Login));
