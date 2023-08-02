import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Paths, Authorization} from '../../const.ts';
import {MainPage} from '../../pages/main/main-page.tsx';
import {LoginPage} from '../../pages/login/login-page.tsx';
import {OfferPage} from '../../pages/offer/offer-page.tsx';
import {FavoritesPage} from '../../pages/favorites/favorites-page.tsx';
import {ErrorPage} from '../../pages/error/error-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {Offer} from '../../mocks/offers.ts';
import {Review} from '../../mocks/reviews.ts';
import {FC} from 'react';

type AppGlobalProps = {
  offers: Offer[];
  reviews: Review[];
};

export const App: FC<AppGlobalProps> = ({offers, reviews}) => (
  <BrowserRouter>
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
        element={<OfferPage offers={offers} reviews={reviews}/>} //WIP
      />
      <Route
        path={Paths.Favorites}
        element={
          <PrivateRoute authorization={Authorization.Auth}>
            <FavoritesPage/>
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

