import {ReviewItem} from '../review-item/review-item.tsx';
import {FC, useEffect} from 'react';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {fetchOfferReviewsAction} from '../../service/api-actions.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {getChosenOffer} from '../../store/offers-process/offers-process.selectors.ts';
import {getCommentPostingStatus, getOffersLoadingStatus} from '../../store/loading-process/loading-process.selectors.ts';

export type ReviewsListProps = {
  offerId: string;
};

export const ReviewsList: FC<ReviewsListProps> = ({offerId}) => {
  const isOffersLoading = useAppSelector(getOffersLoadingStatus);
  const isCommentPosting = useAppSelector(getCommentPostingStatus);
  const {offerReviews} = useAppSelector(getChosenOffer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferReviewsAction(offerId));
  }, [isCommentPosting, isOffersLoading, offerId, dispatch]);

  return (
    <>
      {offerReviews.map(
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

