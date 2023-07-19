import {Offer} from '../mocks/offers.ts';
import {FavoritePlaceCard} from '../components/favorite-place-card/favorite-place-card.tsx';

type FavoriteCityPlacesList = {
  favoriteOffers: Offer[];
  cityName: string;
}

export const FavoriteCityPlacesList = ({favoriteOffers, cityName}: FavoriteCityPlacesList) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {favoriteOffers.map((offer) => <FavoritePlaceCard offer={offer} key={offer.id}/>)}
    </div>
  </li>
);


export default FavoriteCityPlacesList;
