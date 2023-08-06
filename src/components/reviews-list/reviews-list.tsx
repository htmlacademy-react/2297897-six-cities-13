import {Review} from '../../mocks/reviews.ts';
import {ReviewItem} from '../review-item/review-item.tsx';
import {FC} from 'react';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList: FC<ReviewsListProps> = ({reviews}) => (
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
