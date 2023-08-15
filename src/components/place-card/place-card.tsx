import {FC, memo, MouseEventHandler} from 'react';
import {RATING_COEFFICIENT} from '../../const.ts';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {setFavoriteAction} from '../../service/api-actions.ts';

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

export type ActiveCardProps = {
  handleMouseEnter?: (offerId: string) => void;
  handleMouseLeave?: MouseEventHandler;
};

type PlaceCardPropsWithActiveCard = PlaceCardProps & ActiveCardProps;

const PlaceCard: FC<PlaceCardPropsWithActiveCard> = ({
  id,
  isPremium,
  isFavorite,
  previewImg,
  price,
  rating,
  title,
  type,

  handleMouseEnter,
  handleMouseLeave,
}) => {
  const dispatch = useAppDispatch();

  const setFavorite = () => {
    dispatch(setFavoriteAction({id, isFavorite}));
  };
  const handleFavoriteClick = () => {
    setFavorite();
  };

  return(
    <article
      className="cities__card place-card"
      onMouseEnter={() => handleMouseEnter ? handleMouseEnter(id) : null}
      onMouseLeave={handleMouseLeave ?? undefined}
    >

      {
        isPremium
          ? <div className="place-card__mark"><span>Premium</span></div>
          : null
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImg} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`
              place-card__bookmark-button
              ${isFavorite ? 'place-card__bookmark-button--active' : ''}
              button
            `}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
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
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type" style={{textTransform: 'capitalize'}}>{type}</p>
      </div>
    </article>
  );
};

export const MemoizedPlaceCard = memo(PlaceCard);
