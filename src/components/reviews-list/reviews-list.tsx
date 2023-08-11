import {ReviewItem} from '../review-item/review-item.tsx';
import {FC, useEffect} from 'react';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import * as selectors from '../../store/selectors.ts';
import {fetchOfferReviews} from '../../service/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';

export type ReviewsListProps = {
  offerId: string;
}

export const ReviewsList: FC<ReviewsListProps> = ({offerId}) => {
  const {isCommentPosting, isOffersLoading} = useAppSelector(selectors.getLoadingStatuses);
  const reviews = useAppSelector(selectors.getOfferReviews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferReviews(offerId));
  }, [isCommentPosting, isOffersLoading, offerId, dispatch]);

  return (
    <>
      {reviews.map(
        (review) =>
          (
            <ReviewItem
              date={review.date}
              user={review.user}
              comment={review.comment}
              rating={review.rating}
              key={review.id}
            />
          )
      )}
    </>
  );
};

