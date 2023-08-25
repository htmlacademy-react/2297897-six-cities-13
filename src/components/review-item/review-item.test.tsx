import { render, screen } from '@testing-library/react';
import { ReviewItem } from './review-item.tsx';
import {humanizeISODate} from '../../utils.ts';
import {RATING_COEFFICIENT} from '../../const.ts';

describe('ReviewItem component', () => {
  const mockReview = {
    date: '2023-08-24T12:34:56.789Z',
    user: {
      avatarUrl: 'https://example.com/avatar.png',
      name: 'John Doe',
      isPro: false,
    },
    comment: 'Great place!',
    rating: 4,
  };

  beforeEach(() => {
    render(<ReviewItem {...mockReview} />);
  });

  it('should render the user name', () => {
    const userName = screen.getByText(mockReview.user.name);
    expect(userName).toBeInTheDocument();
  });

  it('should render the user avatar', () => {
    const userAvatar = screen.getByAltText('Reviews avatar');
    expect(userAvatar).toBeInTheDocument();
    expect(userAvatar).toHaveAttribute('src', mockReview.user.avatarUrl);
  });

  it('should render the rating correctly', () => {
    const rating = screen.getByText('Rating').parentElement;
    expect(rating).toBeInTheDocument();
    expect(screen.getByTestId('review-rating-element')).toHaveStyle({ width: `${mockReview.rating * RATING_COEFFICIENT}%` });
  });

  it('should render the comment', () => {
    const comment = screen.getByText(mockReview.comment);
    expect(comment).toBeInTheDocument();
  });

  it('should render the date correctly', () => {
    const date = screen.getByText(humanizeISODate(mockReview.date));
    expect(date).toBeInTheDocument();
    expect(date).toHaveAttribute('dateTime', mockReview.date);
  });
});
