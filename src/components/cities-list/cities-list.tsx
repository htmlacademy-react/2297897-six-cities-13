import {CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import {updateCityAction} from '../../store/action.ts';
import * as selectors from '../../store/selectors.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {memo} from 'react';

const CitiesList = () => {
  const activeCity = useAppSelector(selectors.getActiveCity);
  const dispatch = useAppDispatch();
  const handleCityClick = (nextCityName: typeof CITIES[number]) => dispatch(updateCityAction(nextCityName));

  return (
    <>
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
    </>
  );
};

export const MemoizedCitiesList = memo(CitiesList);
