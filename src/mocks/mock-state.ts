import {userProcess} from '../store/user-process/user-process.slice.ts';
import {NameSpace} from '../const.ts';
import {offersProcess} from '../store/offers-process/offers-process.slice.ts';
import {loadingProcess} from '../store/loading-process/loading-process.slice.ts';
import {Action} from '@reduxjs/toolkit';

export const mockState = {
  [NameSpace.Offers]: offersProcess.getInitialState(),
  [NameSpace.User]: userProcess.getInitialState(),
  [NameSpace.Loaders]: loadingProcess.getInitialState(),
};

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);
