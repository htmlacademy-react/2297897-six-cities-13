import { render, screen, fireEvent } from '@testing-library/react';
import { MemoizedPlaceCard } from './place-card';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {Authorization} from '../../const.ts';
import {beforeEach} from 'vitest';

const mockPlaceCardProps = {
  id: '1',
  isPremium: true,
  isFavorite: true,
  previewImg: 'test-image-url',
  price: 50,
  rating: 4,
  title: 'Test title',
  type: 'Test type',
};

describe('Component: PlaceCard', () => {
  const handleMouseEnterMock = vi.fn();
  const handleMouseLeaveMock = vi.fn();

  const {withStoreComponent} = withStore(
    <MemoizedPlaceCard
      {...mockPlaceCardProps}
      handleMouseEnter={handleMouseEnterMock}
      handleMouseLeave={handleMouseLeaveMock}
    />,
    {USER: {...initialUserState, authStatus: Authorization.NoAuth}}
  );
  const preparedComponent = withHistory(withStoreComponent);

  beforeEach(() => {
    render(preparedComponent);
  });


  it('should render place card with passed data', () => {
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText(`€${mockPlaceCardProps.price}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockPlaceCardProps.title}`)).toBeInTheDocument();
  });

  it('should call mouse event handlers', () => {
    fireEvent.mouseEnter(screen.getByTestId('place-card-element'));
    expect(handleMouseEnterMock).toHaveBeenCalledWith(mockPlaceCardProps.id);

    fireEvent.mouseLeave(screen.getByTestId('place-card-element'));
    expect(handleMouseLeaveMock).toHaveBeenCalled();
  });
});
