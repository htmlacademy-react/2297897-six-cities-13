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

export const App = () => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.loadingStatuses.isOffersLoading);
  const isUserInfoLoading = useAppSelector((state) => state.loadingStatuses.isUserInfoLoading);

  // TODO: Избавиться от моргания почты по возможности удалить статусы загрузки

  if(isOffersDataLoading || isUserInfoLoading){
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

