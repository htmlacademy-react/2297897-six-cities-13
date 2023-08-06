import {ActiveCardProps, PlaceCard} from '../place-card/place-card.tsx';
import {Offer} from '../../mocks/offers.ts';
import {FC} from 'react';
import {allowedSortMethods, SortMethods} from '../places-sorting-form/places-sorting-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';

type PlacesListProps = {
  offers: Offer[];
  selectedPlace?: Offer;
} & ActiveCardProps;

export const PlacesList: FC<PlacesListProps> = ({
  offers,
  handleMouseEnter,
  handleMouseLeave,
  selectedPlace,
}) => {

  const sortMethod = useAppSelector((state) => state.sortMethod);
  let nearPlaces: Offer[] = [];
  let sortedOffers: Offer[] = [];

  const sortOffers = (currentSortMethod: allowedSortMethods) => {
    switch(currentSortMethod){
      case SortMethods.ByPopularity:
        sortedOffers = [...offers];
        return;
      case SortMethods.ByPriceIncrease:
        sortedOffers = [...offers].sort((a, b) => a.price - b.price);
        return;
      case SortMethods.ByPriceDecrease:
        sortedOffers = [...offers].sort((a, b) => b.price - a.price);
        return;
      case SortMethods.ByRating:
        sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
        return;
      default:
        sortedOffers = [...offers];
    }
  };

  if(selectedPlace){
    nearPlaces = offers.filter((offer) => offer.id !== selectedPlace.id);
  } else {
    sortOffers(sortMethod);
  }

  return (
    <>
      {(selectedPlace ? nearPlaces : sortedOffers).map(
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
