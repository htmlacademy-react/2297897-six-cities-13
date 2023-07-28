import {Review} from '../../mocks/reviews.ts';
import {ReviewItem} from '../review-item/review-item.tsx';
import {Fragment} from 'react';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({reviews}: ReviewsListProps) => (
  <Fragment>
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
  </Fragment>
);
