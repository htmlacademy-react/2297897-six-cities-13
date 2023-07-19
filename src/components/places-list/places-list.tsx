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
              key={offer.id}
              offer={offer}
              activeCard={activeCard}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave = {handleMouseLeave}
            />
          )
      )};
    </Fragment>
  );
};
