import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {offersProcess} from './offers-process/offers-process.slice.ts';
import {userProcess} from './user-process/user-process.slice.ts';
import {loadingProcess} from './loading-process/loading-process.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Loaders]: loadingProcess.reducer,
});
