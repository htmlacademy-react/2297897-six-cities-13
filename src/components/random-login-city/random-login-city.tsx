import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {changeOffersCity} from '../../store/offers-process/offers-process.slice.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {getRandomCity} from '../../utils.ts';
import {memo} from 'react';

const RandomLoginCity = () =>{
  const dispatch = useAppDispatch();
  const randomCity = getRandomCity();
  return(
    <div className="locations__item">
      <Link
        className="locations__item-link"
        to={Paths.Main}
        onClick={() => dispatch(changeOffersCity(randomCity))}
      >
        <span>{randomCity}</span>
      </Link>
    </div>
  );
};

export const MemoizedRandomLoginCity = memo(RandomLoginCity);
