import {PlaceCard} from '../place-card/place-card.tsx';
import {Offer} from '../../mocks/offers.ts';
import {Fragment, useState} from 'react';

type PlacesListProps = {
  offers: Offer[];
}

export const PlacesList = ({offers}: PlacesListProps): JSX.Element => {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const handleMouseEnter = (offerId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    if (currentOffer) {
      setActiveCard(currentOffer);
    }
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
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
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          )
      )};
    </Fragment>
  );
};
