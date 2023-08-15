import {State} from '../../hooks/use-app-selector.ts';
import {NameSpace} from '../../const.ts';

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Loaders].isOffersLoading;

export const getChosenOfferLoadingStatus = (state: State): boolean => state[NameSpace.Loaders].isChosenOfferLoading;

export const getNearbyOffersLoadingStatus = (state: State): boolean => state[NameSpace.Loaders].isNearbyOffersLoading;

export const getOfferReviewsLoadingStatus = (state: State): boolean => state[NameSpace.Loaders].isOfferReviewsLoading;

export const getCommentPostingStatus = (state: State): boolean => state[NameSpace.Loaders].isCommentPosting;
