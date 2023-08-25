import {Routes, Route} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateFavoriteRoute} from '../private-routes/private-favorite-route.tsx';
import {PrivateLoginRoute} from '../private-routes/private-login-route.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {checkAuthAction, fetchOffersAction} from '../../service/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {getErrorStatus} from '../../store/loading-process/loading-process.selectors.ts';
import {ServerErrorPage} from '../server-error-page/server-error-page.tsx';
import {HelmetProvider} from 'react-helmet-async';

export const App = () => {
  const dispatch = useAppDispatch();
  const hasError = useAppSelector(getErrorStatus);
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if(hasError){
    return <ServerErrorPage/>;
  }

  return(
    <HelmetProvider>
      <Routes>
        <Route
          path={Paths.Main}
          element={<MainPage/>}
        />
        <Route
          path={Paths.Login}
          element={
            <PrivateLoginRoute authorization={authStatus}>
              <LoginPage/>
            </PrivateLoginRoute>
          }
        />
        <Route
          path={Paths.Offer}
          element={<OfferPage />}
        />
        <Route
          path={Paths.Favorites}
          element={
            <PrivateFavoriteRoute authorization={authStatus}>
              <FavoritesPage/>
            </PrivateFavoriteRoute>
          }
        />
        <Route
          path={Paths.Error}
          element={<ErrorPage/>}
        />
      </Routes>
    </HelmetProvider>
  );
};

