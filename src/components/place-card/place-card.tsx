import {Offer} from '../../mocks/offers.ts';
import {MouseEventHandler} from 'react';
import {RATING_COEFFICIENT} from '../../const.ts';

type PlaceCardProps = {
  offer: Offer;
  activeCard: Offer | null;
  handleMouseEnter: (offerId: string) => void;
  handleMouseLeave: MouseEventHandler;
}

export const PlaceCard = ({offer, activeCard, handleMouseEnter, handleMouseLeave}: PlaceCardProps) => (
  <article
    className="cities__card place-card"
    onMouseEnter={() => handleMouseEnter(offer.id)}
    onMouseLeave={handleMouseLeave}
    style={
      offer.id === (activeCard ? activeCard.id : 'none')
        ? {boxShadow: '0px 5px 10px #4481c3'}
        : {boxShadow: 'none'}
    }
  >
    {offer.isPremium
      ? <div className="place-card__mark"><span>Premium</span></div>
      : ''}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{offer.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button">
          <svg
            className="place-card__bookmark-icon"
            width="18"
            height="19"
            style={
              offer.isFavorite
                ? {
                  fill: '#4481c3',
                  stroke: '#4481c3'
                }
                : {fill: 'none'}
            }
          >
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${offer.rating * RATING_COEFFICIENT}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#">{offer.title}</a>
      </h2>
      <p className="place-card__type" style={{textTransform: 'capitalize'}}>{offer.type}</p>
    </div>
  </article>
);
