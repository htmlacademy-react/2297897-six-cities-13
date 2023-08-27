import {Offer} from '../../store/offers-process/offers-process.slice.ts';
import {FavoritePlaceCard} from '../favorite-place-card/favorite-place-card.tsx';
import {FC} from 'react';

type FavoriteCityPlacesProps = {
  favoriteOffers: Offer[];
  cityName: string;
}

export const FavoriteCityPlaces: FC<FavoriteCityPlacesProps> = ({favoriteOffers, cityName}) => {
  if(!favoriteOffers.length){
    return null;
  }

  return (
    <li
      className="favorites__locations-items"
      data-testid="favorite-city-places-element"
    >
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
              id={offer.id}
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
