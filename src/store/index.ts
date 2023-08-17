import {configureStore} from '@reduxjs/toolkit';

import {createAPI} from '../service/api.ts';
import {redirect} from './middlwares/redirect.ts';
import {rootReducer} from './root-reducer.ts';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
