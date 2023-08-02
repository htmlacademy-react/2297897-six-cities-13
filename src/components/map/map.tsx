import leaflet, {layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {CityLocation, Offer} from '../../mocks/offers.ts';
import {FC, useEffect, useRef} from 'react';
import {UrlMarkers} from '../../const.ts';
import {useMap} from '../../hooks/usemap.ts';

type MapProps = {
  offers: Offer[];
  city: CityLocation;
  selectedPlace: Offer | null;
  isOfferPage: boolean;
}

export const Map: FC<MapProps> = ({
  offers,
  city,
  selectedPlace,
  isOfferPage
}) => {
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
      const placeLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(selectedPlace?.id === offer.id
            ? currentCustomIcon
            : defaultCustomIcon,
          )
          .addTo(placeLayer);
      });
      return () => {
        map.removeLayer(placeLayer);
      };
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
