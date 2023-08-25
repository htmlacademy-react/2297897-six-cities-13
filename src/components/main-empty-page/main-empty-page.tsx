import {FC} from 'react';
import {MemoizedCitiesList} from '../cities-list/cities-list.tsx';
import {City} from '../../store/offers-process/offers-process.slice.ts';
import {Helmet} from 'react-helmet-async';

type MainEmptyPageProps = {
    activeCity: City;
}

export const MainEmptyPage: FC<MainEmptyPageProps> = ({activeCity}) => (
  <main
    className="page__main page__main--index page__main--index-empty"
    data-testid="main-empty-page-element"
  >
    <Helmet>
      <title>6 cities</title>
    </Helmet>
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          <MemoizedCitiesList/>
        </ul>
      </section>
    </div>
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
                We could not find any property available at the moment in {activeCity}
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  </main>
);
