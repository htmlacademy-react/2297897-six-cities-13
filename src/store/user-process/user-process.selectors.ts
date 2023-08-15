import {AuthorizationStatus, UserInfo} from './user-process.slice.ts';
import {NameSpace} from '../../const.ts';
import {State} from '../../hooks/use-app-selector.ts';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authStatus;

export const getUserInfo = (state: State): UserInfo => state[NameSpace.User].userInfo;
