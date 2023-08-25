import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {Authorization, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATINGS} from '../../const.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {postCommentAction} from '../../service/api-actions.ts';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {getCommentPostingStatus} from '../../store/loading-process/loading-process.selectors.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';

export type Comment = {
  rating: number;
  description: string;
};

export type CommentWithOfferId = Comment & {offerId: string};

export const CommentSendForm = () => {
  const initialComment: Comment = {rating: 0, description: ''};
  const [comment, setComment] = useState(initialComment);
  const dispatch = useAppDispatch();
  const offerId = useParams().id || '';
  const isCommentPosting = useAppSelector(getCommentPostingStatus);
  const authStatus = useAppSelector(getAuthStatus);

  if(authStatus !== Authorization.Auth){
    return null;
  }

  const handleRadioChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setComment({...comment, rating: Number(evt.target.value)});
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({...comment, description: evt.target.value});
  };

  const handleSubmitButton = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction({
      rating: comment.rating,
      description: comment.description,
      offerId: offerId,
    }));
    setComment(initialComment);
  };

  const isNeedDisable = isCommentPosting ||
                                 comment.rating === 0 ||
                                 comment.description.length < MIN_COMMENT_LENGTH ||
                                 comment.description.length > MAX_COMMENT_LENGTH;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      data-testid="comment-send-form-element"
    >
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
        onChange={handleTextAreaChange}
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
        <button
          onClick={handleSubmitButton}
          className="reviews__submit form__submit button"
          disabled={isNeedDisable}
        >
          {isCommentPosting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
