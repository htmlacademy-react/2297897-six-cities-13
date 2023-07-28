import {Header} from '../../components/header/header.tsx';
import {Offer} from '../../mocks/offers.ts';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {useState} from 'react';

type MainScreenProps = {
  offers: Offer[];
};

export const MainPage = ({offers}: MainScreenProps) => {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);

  const handleMouseEnter = (offerId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    if (currentOffer) {
      setActiveCard(currentOffer);
    }
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  return (
    <div className="page page--gray page--main">
      <Header/>
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
              <b className="places__found">312 places to stay in Amsterdam</b>
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
                  activeCard={activeCard}
                  offers={offers}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} city={offers[0].city} selectedPlace={activeCard}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
