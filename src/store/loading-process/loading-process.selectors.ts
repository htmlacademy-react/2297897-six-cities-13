import {State} from '../../hooks/use-app-selector.ts';
import {NameSpace} from '../../const.ts';

export const getOffersLoadingStatus = (state: Pick<State, typeof NameSpace.Loaders>): boolean => state[NameSpace.Loaders].isOffersLoading;

export const getFavoriteOffersLoadingStatus = (state: Pick<State, typeof NameSpace.Loaders>): boolean => state[NameSpace.Loaders].isFavoriteOffersLoading;

export const getCommentPostingStatus = (state: Pick<State, typeof NameSpace.Loaders>): boolean => state[NameSpace.Loaders].isCommentPosting;

export const getErrorStatus = (state: Pick<State, typeof NameSpace.Loaders>): boolean => state[NameSpace.Loaders].hasError;
