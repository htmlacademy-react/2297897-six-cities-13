import {State} from '../../hooks/use-app-selector.ts';
import {NameSpace} from '../../const.ts';

export const getOffersLoadingStatus = (state: State): boolean => state[NameSpace.Loaders].isOffersLoading;

export const getCommentPostingStatus = (state: State): boolean => state[NameSpace.Loaders].isCommentPosting;
