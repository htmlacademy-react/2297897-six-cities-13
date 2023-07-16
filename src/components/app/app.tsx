import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Preferences, Paths, Authorization} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';

export const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={Paths.Main}
        element={<MainPage placesCount={Preferences.PlacesCount} />}
      />
      <Route
        path={Paths.Login}
        element={<LoginPage />}
      />
      <Route
        path={Paths.Offer}
        element={<OfferPage />}
      />
      <Route
        path={Paths.Favorites}
        element={
          <PrivateRoute authorization={Authorization.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={Paths.Error}
        element={<ErrorPage />}
      />
    </Routes>
  </BrowserRouter>
);


