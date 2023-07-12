import {Authorization, Paths} from '../../const.ts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authorization: string;
  children: JSX.Element;
}

export const PrivateRoute = ({authorization, children}: PrivateRouteProps): JSX.Element | null =>
  authorization === Authorization.Auth
    ? children
    : <Navigate to={Paths.Login}/>;
