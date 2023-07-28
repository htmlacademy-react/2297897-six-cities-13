import {PlaceCard} from '../place-card/place-card.tsx';
import {Offer} from '../../mocks/offers.ts';
import {Fragment, MouseEventHandler} from 'react';

type PlacesListProps = {
  offers: Offer[];
  activeCard: Offer | null;
  handleMouseEnter: (offerId: string) => void;
  handleMouseLeave: MouseEventHandler;
}

export const PlacesList = ({offers, handleMouseEnter, handleMouseLeave, activeCard}: PlacesListProps) => (
  <Fragment>
    {offers.map(
      (offer) =>
        (
          <PlaceCard
            id={offer.id}
            isPremium={offer.isPremium}
            isFavorite={offer.isFavorite}
            price={offer.price}
            previewImg={offer.previewImage}
            rating={offer.rating}
            title={offer.title}
            type={offer.type}

            key={offer.id}

            activeCard={activeCard}
            handleMouseEnter={() => handleMouseEnter(offer.id)}
            handleMouseLeave={handleMouseLeave}
          />
        )
    )};
  </Fragment>
);
