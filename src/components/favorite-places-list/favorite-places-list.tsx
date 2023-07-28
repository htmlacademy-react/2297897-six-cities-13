import {Offer} from '../../mocks/offers.ts';
import {FavoritePlaceCard} from '../favorite-place-card/favorite-place-card.tsx';

type FavoritePlacesList = {
  favoriteOffers: Offer[];
  cityName: string;
}

export const FavoriteCityPlaces = ({favoriteOffers, cityName}: FavoritePlacesList): JSX.Element | null => {
  if(!favoriteOffers.length){
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {favoriteOffers.map((offer) =>
          (
            <FavoritePlaceCard
              price={offer.price}
              previewImg={offer.previewImage}
              rating={offer.rating}
              title={offer.title}
              type={offer.type}
              key={offer.id}
            />
          )
        )}
      </div>
    </li>
  );
};
