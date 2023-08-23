import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '../hooks/use-app-selector.ts';
import {createAPI} from '../service/api.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>
