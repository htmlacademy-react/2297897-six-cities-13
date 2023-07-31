import {ActiveCardProps, PlaceCard} from '../place-card/place-card.tsx';
import {Offer} from '../../mocks/offers.ts';

type PlacesListProps = {
  offers: Offer[];
  selectedPlace?: Offer;
} & ActiveCardProps;

export const PlacesList = (
  {
    offers,
    handleMouseEnter,
    handleMouseLeave,
    selectedPlace
  }: PlacesListProps) => {
  let nearPlaces: Offer[] = [];

  if(selectedPlace){
    nearPlaces = offers.filter((offer) => offer.id !== selectedPlace.id);
  }

  return (
    <>
      {(selectedPlace ? nearPlaces : offers).map(
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

              handleMouseEnter={() => handleMouseEnter ? handleMouseEnter(offer.id) : null}
              handleMouseLeave={handleMouseLeave ?? undefined}
            />
          )
      )};
    </>
  );
};
