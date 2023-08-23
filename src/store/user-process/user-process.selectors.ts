import {AuthorizationStatus, UserInfo} from './user-process.slice.ts';
import {NameSpace} from '../../const.ts';
import {State} from '../../hooks/use-app-selector.ts';

export const getAuthStatus = (state: Pick<State, typeof NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authStatus;

export const getUserInfo = (state: Pick<State, typeof NameSpace.User>): UserInfo => state[NameSpace.User].userInfo;
