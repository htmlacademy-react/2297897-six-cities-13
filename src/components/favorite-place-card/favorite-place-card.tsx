import {Authorization, Paths, RATING_COEFFICIENT} from '../../const.ts';
import {PlaceCardProps} from '../place-card/place-card.tsx';
import {Link} from 'react-router-dom';
import {FC} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {setFavoriteAction} from '../../service/api-actions.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {redirectToRoute} from '../../store/action.ts';
import {capitalizeFirstLetter} from '../../utils.ts';

type FavoritePlaceCardProps = Omit<PlaceCardProps, 'isPremium' | 'isFavorite'>

export const FavoritePlaceCard: FC<FavoritePlaceCardProps> = ({
  id,
  previewImg,
  price,
  title,
  type,
  rating
}) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  const handleFavoriteClick = () => {
    if(authStatus === Authorization.NoAuth){
      dispatch(redirectToRoute(Paths.Login));
    }
    dispatch(setFavoriteAction({ id, isFavorite: true}));
  };

  return(
    <article
      className="favorites__card place-card"
      data-testid="favorite-place-card-element"
    >
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImg}
            width="150"
            height="110"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
            onClick={handleFavoriteClick}
            data-testid="favorite-button-element"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
};
