import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchOffersAction} from '../../service/api-actions.ts';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import classes from './server-error-page.module.css';

export const ServerErrorPage = () => {
  const dispatch = useAppDispatch();

  const handleReloadClick = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <HelmetProvider>
      <div className={classes.serverErrorPage}>
        <Helmet>
          <title>6 cities. Server error</title>
        </Helmet>
        <p className="error__text">Server is not available</p>
        <button
          onClick={handleReloadClick}
          className="locations__item-link tabs__item"
          style={{
            backgroundColor: '#3069a6',
            borderColor: '#3069a6',
            color: 'white',
          }}
          type="button"
        >
        Try again
        </button>
      </div>
    </HelmetProvider>
  );
};
