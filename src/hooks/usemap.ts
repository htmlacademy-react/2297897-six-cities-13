import {useState, useEffect, useRef, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {CityLocation} from '../store/offers-process/offers-process.slice.ts';

type UseMapArgs = {
  mapRef: MutableRefObject<null>;
  city: CityLocation;
}

export const useMap = ({mapRef, city}: UseMapArgs) => {
  const [map, setMap] = useState<null | leaflet.Map>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const tileLayer = leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      tileLayer.addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
};

