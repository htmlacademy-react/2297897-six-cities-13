import {Authorization, Paths} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {FC} from 'react';

type PrivateRouteProps = {
  authorization: string;
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({authorization, children}): JSX.Element | null =>
  authorization === Authorization.Auth
    ? children
    : <Navigate to={Paths.Login}/>;
