import {ActiveCardProps, MemoizedPlaceCard} from '../place-card/place-card.tsx';
import {Offer} from '../../store/offers-process/offers-process.slice.ts';
import {FC, memo} from 'react';

type PlacesListProps = {
  offers: Offer[];
} & ActiveCardProps;

export const PlacesList: FC<PlacesListProps> = ({
  offers,
  handleMouseEnter,
  handleMouseLeave,
}) => (
  <>
    {offers.map(
      (offer) =>
        (
          <MemoizedPlaceCard
            id={offer.id}
            isPremium={offer.isPremium}
            isFavorite={offer.isFavorite}
            price={offer.price}
            previewImg={offer.previewImage}
            rating={offer.rating}
            title={offer.title}
            type={offer.type}

            key={offer.id}

            handleMouseEnter={() => handleMouseEnter ? handleMouseEnter(offer.id) : null}
            handleMouseLeave={handleMouseLeave ?? undefined}
          />
        )
    )};
  </>
);

export const MemoizedPlacesList = memo(PlacesList);
