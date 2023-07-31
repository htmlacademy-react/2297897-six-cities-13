import {useState} from 'react';
import {CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';

export const CitiesList = () => {
  const [activeCity, setActiveCity] = useState('Amsterdam');

  const onCityClick = (nextCityName: string) => setActiveCity(nextCityName);

  return (
    <>
      {CITIES.map((city) =>
        (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item ${activeCity === city ? 'tabs__item--active' : ''}`}
              onClick={() => onCityClick(city)}
              to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        )
      )}
    </>
  );
};
