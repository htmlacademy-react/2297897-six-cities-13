import {Header} from '../../components/header/header.tsx';
import {Offer} from '../../mocks/offers.ts';
import {FavoriteCityPlaces} from '../../components/favorite-places-list/favorite-places-list.tsx';
import {CITIES} from '../../const.ts';

type FavoritesPageProps = {
  favoriteOffers: Offer[];
}

export const FavoritesPage = ({favoriteOffers}: FavoritesPageProps) => {
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
      <Header/>
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
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};
