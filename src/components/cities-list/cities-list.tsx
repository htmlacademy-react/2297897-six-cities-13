import {CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {memo} from 'react';
import {getOffersCity} from '../../store/offers-process/offers-process.selectors.ts';
import {changeOffersCity, City} from '../../store/offers-process/offers-process.slice.ts';

const CitiesList = () => {
  const activeCity = useAppSelector(getOffersCity);
  const dispatch = useAppDispatch();
  const handleCityClick = (nextCityName: City) => dispatch(changeOffersCity(nextCityName));

  return (
    <ul
      className="locations__list tabs__list"
      data-testid="cities-list-element"
    >
      {CITIES.map((city) =>
        (
          <li className="locations__item" key={city}>
            <Link
              className={`locations__item-link tabs__item ${activeCity === city ? 'tabs__item--active' : ''}`}
              onClick={() => handleCityClick(city)}
              to="#"
            >
              <span>{city}</span>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export const MemoizedCitiesList = memo(CitiesList);
