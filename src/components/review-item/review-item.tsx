import {Review} from '../../store/offers-process/offers-process.slice.ts';
import {RATING_COEFFICIENT} from '../../const.ts';
import {humanizeISODate} from '../../utils.ts';

type ReviewItemProps = Omit<Review, 'id'>

export const ReviewItem = (
  {
    date,
    user,
    comment,
    rating
  }: ReviewItemProps) => (
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img
          className="reviews__avatar user__avatar"
          src={user.avatarUrl}
          width="54"
          height="54"
          alt="Reviews avatar"
        />
      </div>
      <span className="reviews__user-name">{user.name}
      </span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span data-testid="review-rating-element" style={{width: `${rating * RATING_COEFFICIENT}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">
        {comment}
      </p>
      <time className="reviews__time" dateTime={date}>{humanizeISODate(date)}</time>
    </div>
  </li>
);
