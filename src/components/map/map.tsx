import leaflet, {layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {CityLocation, Offer} from '../../store/offers-process/offers-process.slice.ts';
import {FC, useEffect, useRef} from 'react';
import {UrlMarkers} from '../../const.ts';
import {useMap} from '../../hooks/use-map.ts';

type MapProps = {
  offers: Offer[];
  nearbyOffers?: Offer[];
  city: CityLocation;
  selectedOfferId: string | undefined;
  isOfferPage: boolean;
}

export const Map: FC<MapProps> = ({
  offers,
  nearbyOffers = undefined,
  city,
  selectedOfferId,
  isOfferPage
}) => {
  const mapRef = useRef(null);
  const map = useMap({mapRef, city});
  const {latitude: cityLatitude, longitude: cityLongitude, zoom} = city.location;

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

  if(nearbyOffers !== undefined){
    const selectedOffer = offers.find((offer) => offer.id === selectedOfferId)!;
    nearbyOffers = [...nearbyOffers, selectedOffer];
  }

  useEffect(() => {
    if (map) {
      map.flyTo([cityLatitude, cityLongitude], zoom);
      const placeLayer = layerGroup().addTo(map);
      (nearbyOffers ?? offers).forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(selectedOfferId === offer.id
            ? currentCustomIcon
            : defaultCustomIcon,
          )
          .addTo(placeLayer);
      });
      return () => {
        map.removeLayer(placeLayer);
      };
    }
  }, [map, offers, selectedOfferId, currentCustomIcon, defaultCustomIcon, cityLongitude, cityLatitude, zoom, nearbyOffers]);

  return (
    <div style={getMapStyle()} ref={mapRef} data-testid="map-element">
    </div>
  );
};
