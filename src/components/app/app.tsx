import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Paths, Authorization} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Offer} from '../../mocks/offers.ts';

type AppGlobalProps = {
  offers: Offer[];
}
export const App = ({offers}: AppGlobalProps) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={Paths.Main}
          element={<MainPage offers={offers}/>}
        />
        <Route
          path={Paths.Login}
          element={<LoginPage/>}
        />
        <Route
          path={Paths.Offer}
          element={<OfferPage offers={offers}/>}
        />
        <Route
          path={Paths.Favorites}
          element={
            <PrivateRoute authorization={Authorization.Auth}>
              <FavoritesPage favoriteOffers={favoriteOffers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={Paths.Error}
          element={<ErrorPage/>}
        />
      </Routes>
    </BrowserRouter>
  );
};
