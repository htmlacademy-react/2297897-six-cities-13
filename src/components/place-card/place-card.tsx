import {Offer} from '../../mocks/offers.ts';
import {MouseEventHandler} from 'react';
import {RATING_COEFFICIENT} from '../../const.ts';
import {Link} from 'react-router-dom';

export type PlaceCardProps = {
  id: string;
  isPremium: boolean;
  isFavorite: boolean;
  previewImg: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

type ActiveCardProps = {
  activeCard: Offer | null;
  handleMouseEnter: (offerId: string) => void;
  handleMouseLeave: MouseEventHandler;
};

type PlaceCardPropsWithActiveCard = PlaceCardProps & ActiveCardProps

export const PlaceCard = (
  {
    id,
    isPremium,
    isFavorite,
    previewImg,
    price,
    rating,
    title,
    type,

    activeCard,
    handleMouseEnter,
    handleMouseLeave
  }: PlaceCardPropsWithActiveCard) => {

  const getFavoriteStyles = (isFavoritePlace: boolean) => {
    if (isFavoritePlace) {
      return {fill: '#4481c3', stroke: '#4481c3'};
    }
  };

  const getActiveCardStyles = (cardId: string) => {
    if(cardId === (activeCard ? activeCard.id : 'none')){
      return {boxShadow: '0px 5px 10px #4481c3'};
    }
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => handleMouseEnter(id)}
      onMouseLeave={handleMouseLeave}
      style={getActiveCardStyles(id)}
    >

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={previewImg} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
              style={getFavoriteStyles(isFavorite)}
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * RATING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{type}</p>
      </div>
    </article>
  );
};

