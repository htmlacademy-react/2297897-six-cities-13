import {MemoizedHeader} from '../../components/header/header.tsx';
import {MemoizedPlacesList} from '../../components/places-list/places-list.tsx';
import {MemoizedCitiesList} from '../../components/cities-list/cities-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {useCallback, useState} from 'react';
import {MemoizedPlacesSortingForm} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getOffers, getOffersCity} from '../../store/offers-process/offers-process.selectors.ts';

export const MainPage = () => {
  const [activeId, setActiveId] = useState<string | undefined>(undefined);

  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getOffersCity);
  const offersForCity = offers.filter((offer) => offer.city.name === activeCity);

  const handleMouseEnter = useCallback((offerId: string | undefined) => {
    setActiveId(offerId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveId(undefined);
  }, []);

  return (
    <div className="page page--gray page--main">
      <MemoizedHeader/>
      {offersForCity.length
        ? (
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  <MemoizedCitiesList />
                </ul>
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersForCity.length} places to stay in {activeCity}</b>
                  <MemoizedPlacesSortingForm/>
                  <div className="cities__places-list places__list tabs__content">
                    <MemoizedPlacesList
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      offers={offersForCity}
                    />
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={offersForCity} city={offersForCity[0].city} selectedOfferId={activeId}
                      isOfferPage={false}
                    />
                  </section>
                </div>
              </div>
            </div>
          </main>
        )
        : (
          <main className="page__main page__main--index page__main--index-empty">
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
                    <p className="cities__status-description">We could not find any property available at the moment
                      in {activeCity}
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            </div>
          </main>
        )}
    </div>
  );
};
