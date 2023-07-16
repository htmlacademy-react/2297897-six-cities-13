import {Authorization, Paths} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {PropsWithChildren} from 'react';

type PrivateRouteProps = {
  authorization: string;
  children: JSX.Element;
}

export const PrivateRoute = (props: PropsWithChildren<PrivateRouteProps>): JSX.Element | null =>
  props.authorization === Authorization.Auth
    ? props.children
    : <Navigate to={Paths.Login}/>;
