import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {CityLocation, Offer} from '../../mocks/offers.ts';
import {useEffect, useRef} from 'react';
import {UrlMarkers} from '../../const.ts';
import {useMap} from '../../hooks/usemap.ts';

type MapProps = {
  offers: Offer[];
  city: CityLocation;
  selectedPlace: Offer | null;
  isOfferPage: boolean;
}

export const Map = (
  {
    offers,
    city,
    selectedPlace,
    isOfferPage
  }: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});

  const defaultCustomIcon = leaflet.icon({
    iconUrl: UrlMarkers.Default,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: UrlMarkers.Current,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const getMapStyle = () =>
    isOfferPage
      ? {height: '100%', width: '1150px', margin: '0 auto'}
      : {height: '100%'};

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: selectedPlace?.id === offer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedPlace, currentCustomIcon, defaultCustomIcon]);

  return (
    <div
      style={getMapStyle()}
      ref={mapRef}
    >

    </div>
  );
};
