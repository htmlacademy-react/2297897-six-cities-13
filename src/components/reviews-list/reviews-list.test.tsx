import { render, waitFor, screen } from '@testing-library/react';
import { ReviewsList } from './reviews-list.tsx';
import {withStore} from '../../mocks/mock-component.tsx';
import {generateMockOffer} from '../../mocks/generate-mock-offer.ts';
import {generateMockReview} from '../../mocks/generate-mock-review.ts';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {ChosenOffer, initialOffersState} from '../../store/offers-process/offers-process.slice.ts';
import * as apiActions from '../../service/api-actions.ts';
import {beforeEach} from 'vitest';

describe('ReviewsList component', () => {
  const mockChosenOffer = generateMockOffer(true) as ChosenOffer;
  const mockReviews = Array.from({length: 3}, () => generateMockReview());
  const fetchOfferReviewsActionSpy = vi.spyOn(apiActions, 'fetchOfferReviewsAction');

  beforeEach(() => {
    const {withStoreComponent} = withStore(
      <ReviewsList offerId={mockChosenOffer.id}/>,
      {
        LOADERS: initialLoadingState,
        OFFERS: {
          ...initialOffersState,
          chosenOffer: {
            ...initialOffersState.chosenOffer,
            offerDetails: mockChosenOffer,
            offerReviews: mockReviews,
          }
        }
      });
    render(withStoreComponent);
  });

  it('should dispatch the fetchOfferReviewsAction on render', () => {
    expect(fetchOfferReviewsActionSpy).toHaveBeenCalled();
    expect(fetchOfferReviewsActionSpy).toHaveBeenCalledWith(mockChosenOffer.id);
  });

  it('should render the reviews list', async () => {
    await waitFor(() => {
      const userAvatars = screen.queryAllByAltText('Reviews avatar');
      const ratings = screen.queryAllByText('Rating');
      const dates = screen.queryAllByText('August 2023');

      for (const [index, review] of mockReviews.entries()) {
        const userName = screen.getByText(review.user.name);
        const userAvatar = userAvatars[index];
        const rating = ratings[index];
        const comment = screen.getByText(review.comment);
        const date = dates[index];

        expect(userName).toBeInTheDocument();
        expect(userAvatar).toBeInTheDocument();
        expect(rating).toBeInTheDocument();
        expect(comment).toBeInTheDocument();
        expect(date).toBeInTheDocument();
      }
    });
  });
});
