import {Fragment, MouseEventHandler, useState} from 'react';
import {CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';

export const CitiesList = () => {
  const [activeCity, setActiveCity] = useState('Amsterdam');

  const onCityClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
    evt.preventDefault();
    const nextCity = evt.currentTarget.querySelector('span')?.textContent;
    if(nextCity){
      setActiveCity(nextCity);
    }
  };

  return (
    <Fragment>
      {CITIES.map((city) =>
        (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item ${activeCity === city ? 'tabs__item--active' : ''}`}
              onClick={onCityClick}
              to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        )
      )}
    </Fragment>
  );
};
