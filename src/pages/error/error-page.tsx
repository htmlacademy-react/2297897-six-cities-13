import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {MemoizedHeader} from '../../components/header/header.tsx';
import {Helmet} from 'react-helmet-async';
import classes from './error-page.module.css';

export const ErrorPage = () => (
  <div data-testid = "error-page-element">
    <Helmet>
      <title>6 cities. error page</title>
    </Helmet>
    <MemoizedHeader/>
    <div className={classes.errorPageContainer}>
      404. Page Not Found.<br/>
      <Link to={Paths.Main} className={classes.tryAgainButton}>
        На главную
      </Link>
    </div>
  </div>
);
