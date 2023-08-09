import {reducer} from '../reducer.ts';
import {Middleware, PayloadAction} from '@reduxjs/toolkit';
import {browserHistory} from '../../browser-history.ts';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
    () =>
      (next) =>
        (action: PayloadAction<string>) => {
          if(action.type === 'app/redirectToRoute') {
            browserHistory.push(action.payload);
          }
          return next(action);
        };
