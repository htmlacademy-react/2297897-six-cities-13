import {Authorization, Paths} from '../../const.ts';
import {Navigate} from 'react-router-dom';
import {FC, ReactElement} from 'react';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';

type PrivateRouteProps = {
    authorization: string;
    children: ReactElement;
}

export const PrivateLoginRoute: FC<PrivateRouteProps> = ({authorization, children}) =>{
  if(authorization === Authorization.Unknown){
    return <LoadingScreen/>;
  }
  return authorization === Authorization.Auth
    ? <Navigate to={Paths.Main}/>
    : children;
};
