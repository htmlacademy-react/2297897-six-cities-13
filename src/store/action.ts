import {createAction} from '@reduxjs/toolkit';

export const redirectToRoute = createAction('app/redirectToRoute',
  (route: string) => ({payload: route})
);
