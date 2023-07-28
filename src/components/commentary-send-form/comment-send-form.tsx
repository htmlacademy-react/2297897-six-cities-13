import {ChangeEvent, Fragment, useState} from 'react';
import {RATINGS} from '../../const.ts';

type Comment = {
  rating: string;
  description: string;
}

export const CommentSendForm = () => {
  const [comment, setComment] = useState<Comment>({rating: '', description: ''});

  const handleRadioChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({...comment, rating: evt.target.value});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating) => (
          <Fragment key={rating.id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating.value}
              id={rating.id}
              type="radio"
              checked={rating.value === comment.rating}
              onChange={handleRadioChange}
            />
            <label
              htmlFor={rating.id}
              className="reviews__rating-label form__rating-label"
              title={rating.title}
            >
              <svg
                className="form__star-image"
                width="37"
                height="33"
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        value={comment.description}
        onChange={
          (evt) => setComment({...comment, description: evt.target.value})
        }
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>
          Submit
        </button>
      </div>
    </form>
  );
};
