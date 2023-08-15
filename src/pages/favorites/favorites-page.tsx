import {MemoizedHeader} from '../../components/header/header.tsx';
import {Offer} from '../../mocks/offers.ts';
import {FavoriteCityPlaces} from '../../components/favorite-places-list/favorite-places-list.tsx';
import {CITIES, Paths} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getFavoriteOffers} from '../../store/offers-process/offers-process.selectors.ts';

export const FavoritesPage = () => {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const favoritePlaces: Record<string, Offer[]> = {
    Paris: [],
    Cologne: [],
    Brussels: [],
    Amsterdam: [],
    Hamburg: [],
    Dusseldorf: [],
  };

  const filterPlacesPerCities = () => {
    favoriteOffers.forEach((favoriteOffer) => {
      const cityName = favoriteOffer.city.name;
      favoritePlaces[cityName].push(favoriteOffer);
    });
  };

  filterPlacesPerCities();

  return (
    <div className="page">
      <MemoizedHeader/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">

              {CITIES.map((city) =>
                <FavoriteCityPlaces favoriteOffers={favoritePlaces[city]} cityName={city} key={city}/>
              )}

            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={Paths.Main}>
          <img className="footer__logo" src="markup/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};
