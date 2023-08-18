import {Routes, Route} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {browserHistory} from '../../browser-history.ts';
import {HistoryRouter} from '../history-route/history-route.tsx';
import {checkAuthAction, fetchOffersAction} from '../../service/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {getErrorStatus} from '../../store/loading-process/loading-process.selectors.ts';
import {ServerErrorPage} from '../server-error-page/server-error-page.tsx';

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
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={Paths.Main}
          element={<MainPage/>}
        />
        <Route
          path={Paths.Login}
          element={<LoginPage/>}
        />
        <Route
          path={Paths.Offer}
          element={<OfferPage />}
        />
        <Route
          path={Paths.Favorites}
          element={
            <PrivateRoute authorization={authStatus}>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={Paths.Error}
          element={<ErrorPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
};

