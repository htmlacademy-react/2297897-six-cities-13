import {CITIES} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updateCityAction} from '../../store/action.ts';
import {InitialStateType} from '../../store/reducer.ts';


export const CitiesList = () => {
  const activeCity = useSelector(((store: InitialStateType) => store.city));
  const dispatch = useDispatch();
  const onCityClick = (nextCityName: typeof CITIES[number]) => dispatch(updateCityAction(nextCityName));

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
