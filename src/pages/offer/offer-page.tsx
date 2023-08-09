import {Header} from '../../components/header/header.tsx';
import {useParams} from 'react-router-dom';
import {CommentSendForm} from '../../components/commentary-send-form/comment-send-form.tsx';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Map} from '../../components/map/map.tsx';
import {ErrorPage} from '../error/error-page.tsx';
import {PlacesList} from '../../components/places-list/places-list.tsx';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {useEffect} from 'react';
import {fetchChosenOffer, fetchNearbyOffers, fetchOfferReviews} from '../../service/api-actions.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {RATING_COEFFICIENT} from '../../const.ts';
import {LoadingScreen} from '../../components/loading-screen/loading-screen.tsx';
import {getFavoriteStyles} from '../../utils.ts';

export const OfferPage = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const offerId = useParams().id!;
  const isExistingId = offers.some((offer) => offer.id === offerId);
  const loadingStatuses = useAppSelector((state) => state.loadingStatuses);
  const offerDetails = useAppSelector((state) => state.chosenOffer.offerDetails)!;
  const offerReviews = useAppSelector((state) => state.chosenOffer.offerReviews);
  const nearbyOffers = useAppSelector((state) => state.chosenOffer.nearbyOffers);

  useEffect(() => {
    if (!isExistingId) {
      return;
    }
    dispatch(fetchChosenOffer(offerId));
    dispatch(fetchOfferReviews(offerId));
    dispatch(fetchNearbyOffers(offerId));
  }, [isExistingId, offerId, dispatch]);

  const isAllLoaded = Object.values(loadingStatuses).every((status) => !status);

  if(!isExistingId && !loadingStatuses.isOffersLoading){
    return <ErrorPage/>;
  }

  if(!isAllLoaded){
    return <LoadingScreen/>;
  }

  const {
    title,
    type,
    price,
    city,
    isFavorite,
    isPremium,
    rating,
    images,
    host,
    description,
    bedrooms,
    goods,
    maxAdults
  } = offerDetails;


  return (
    <div className="page">
      <Header/>
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
                <button className="offer__bookmark-button button" type="button">
                  <svg
                    className="offer__bookmark-icon"
                    style={getFavoriteStyles(isFavorite)}
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
                  <span style={{width: `${rating * RATING_COEFFICIENT}%`}}></span>
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
                  <ReviewsList reviews={offerReviews}/>
                </ul>
                <CommentSendForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              offers={offers}
              city={city}
              selectedPlace={offerDetails}
              isOfferPage
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={nearbyOffers}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
