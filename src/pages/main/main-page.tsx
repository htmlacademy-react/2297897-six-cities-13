import {Header} from '../../components/header/header.tsx';
import {Offer} from '../../mocks/offers.ts';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {InitialStateType} from '../../store/reducer.ts';

export const MainPage = () => {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const offers = useSelector(((store: InitialStateType) => store.offers));
  const activeCity = useSelector(((store: InitialStateType) => store.city));
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
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
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
