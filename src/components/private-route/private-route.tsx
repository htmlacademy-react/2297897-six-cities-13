import {Authorization, Paths} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {FC, ReactElement} from 'react';

type PrivateRouteProps = {
  authorization: string;
  children: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({authorization, children}) =>
  authorization === Authorization.Auth
    ? children
    : <Navigate to={Paths.Login}/>;
