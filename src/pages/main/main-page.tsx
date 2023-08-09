import {Header} from '../../components/header/header.tsx';
import {Offer} from '../../mocks/offers.ts';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {useState} from 'react';
import {PlacesSortingForm} from '../../components/places-sorting-form/places-sorting-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import * as selectors from '../../store/selectors.ts';

export const MainPage = () => {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const offers = useAppSelector(selectors.getOffers);
  const activeCity = useAppSelector(selectors.getActiveCity);
  const offersForCity = offers.filter((offer) => offer.city.name === activeCity);

  const handleMouseEnter = (offerId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    if (!currentOffer) {
      return;
    }
    setActiveCard(currentOffer);
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
      {offersForCity.length
        ? (
          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <ul className="locations__list tabs__list">
                  <CitiesList/>
                </ul>
              </section>
            </div>
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersForCity.length} places to stay in {activeCity}</b>
                  <PlacesSortingForm/>
                  <div className="cities__places-list places__list tabs__content">
                    <PlacesList
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      offers={offersForCity}
                    />
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map offers={offersForCity} city={offersForCity[0].city} selectedPlace={activeCard}
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
                  <CitiesList/>
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
