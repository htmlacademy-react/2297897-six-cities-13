import {store} from '../store';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export type State = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
