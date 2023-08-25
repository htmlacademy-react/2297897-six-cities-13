import {MemoizedHeader} from '../header/header.tsx';
import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {Helmet} from 'react-helmet-async';

export const FavoriteEmptyPage = () => (
  <div data-testid="favorite-empty-page-element">
    <Helmet>
      <title>6 cities. Favorites</title>
    </Helmet>
    <MemoizedHeader/>
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
          </div>
        </section>
      </div>
    </main>
    <footer className="footer container">
      <Link className="footer__logo-link" to={Paths.Main}>
        <img className="footer__logo" src="markup/img/logo.svg" alt="6 cities logo" width="64" height="33"/>
      </Link>
    </footer>
  </div>
);
