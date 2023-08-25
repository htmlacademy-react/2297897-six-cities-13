import {MemoizedHeader} from '../../components/header/header.tsx';
import {useParams} from 'react-router-dom';
import {CommentSendForm} from '../../components/comment-send-form/comment-send-form.tsx';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {ErrorPage} from '../error/error-page.tsx';
import {MemoizedPlacesList} from '../../components/places-list/places-list.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect, useState} from 'react';
import {fetchChosenOfferAction, fetchNearbyOffersAction, setFavoriteAction} from '../../service/api-actions.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {Authorization, Paths, RATING_COEFFICIENT} from '../../const.ts';
import {LoadingScreen} from '../../components/loading-screen/loading-screen.tsx';
import {getChosenOffer, getOffers} from '../../store/offers-process/offers-process.selectors.ts';
import {getOffersLoadingStatus} from '../../store/loading-process/loading-process.selectors.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {redirectToRoute} from '../../store/action.ts';
import {Helmet} from 'react-helmet-async';

export const OfferPage = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const offerId = useParams().id || 'defaultId';
  const isExistingId = offers.some((offer) => offer.id === offerId);
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const {offerDetails, offerReviews, nearbyOffers} = useAppSelector(getChosenOffer);
  const authStatus = useAppSelector(getAuthStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState<undefined | boolean>(undefined);

  useEffect(() => {
    if (!isExistingId) {
      return;
    }

    const fetchData = async () => {
      try{
        await dispatch(fetchChosenOfferAction(offerId));
        setIsFavoriteLocal(offerDetails?.isFavorite);
        await dispatch(fetchNearbyOffersAction(offerId));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isExistingId, offerId, dispatch, offerDetails?.isFavorite, authStatus]);

  if(!isExistingId && !isOffersLoading){
    return <ErrorPage/>;
  } else if(isLoading){
    return <LoadingScreen/>;
  }

  if(!offerDetails){
    return <ErrorPage/>;
  }

  const {
    title,
    type,
    price,
    city,
    isPremium,
    rating,
    images,
    host,
    description,
    bedrooms,
    goods,
    maxAdults
  } = offerDetails;

  const handleFavoriteClick = () => {
    if(authStatus === Authorization.NoAuth){
      dispatch(redirectToRoute(Paths.Login));
    }

    try {
      dispatch(setFavoriteAction({id: offerId, isFavorite: isFavoriteLocal ?? false}));
    } finally {
      setIsFavoriteLocal((prevIsFavorite) => !prevIsFavorite);
    }

  };

  return (
    <div
      className="page"
      data-testid="offer-page-element"
    >
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <MemoizedHeader/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map(
                (image) => (
                  <div
                    className="offer__image-wrapper"
                    key={image}
                  >
                    <img
                      className="offer__image"
                      src={image}
                      alt="Place Image"
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button
                  className={`
                      offer__bookmark-button
                      ${isFavoriteLocal ? 'offer__bookmark-button--active' : ''}
                      button
                      `}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg
                    className="offer__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.ceil(rating) * RATING_COEFFICIENT}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire" style={{textTransform: 'capitalize'}}>
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map(
                    (good) => (
                      <li
                        className="offer__inside-item"
                        key={good}
                      >
                        {good}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReviews.length}</span></h2>
                <ul className="reviews__list">
                  <ReviewsList offerId={offerId}/>
                </ul>
                {<CommentSendForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={offers}
              nearbyOffers={nearbyOffers}
              city={city}
              selectedOfferId={offerId}
              isOfferPage
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <MemoizedPlacesList offers={nearbyOffers}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
