import {Routes, Route} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';
import {browserHistory} from '../../browser-history.ts';
import {HistoryRouter} from '../history-route/history-route.tsx';
import {checkAuthAction, fetchOffersAction} from '../../service/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import * as selectors from '../../store/selectors.ts';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(selectors.getAuthStatus);
  const {isOffersLoading} = useAppSelector(selectors.getLoadingStatuses);
  const {isUserInfoLoading} = useAppSelector(selectors.getLoadingStatuses);

  // TODO: Избавиться от моргания почты по возможности удалить статусы загрузки

  if(isOffersLoading || isUserInfoLoading){
    return <LoadingScreen />;
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
          element={<OfferPage />} //WIP
        />
        <Route
          path={Paths.Favorites}
          element={
            <PrivateRoute authorization={authorizationStatus}>
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

