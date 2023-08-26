import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {MemoizedRandomLoginCity} from './random-login-city.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: RandomLoginCity', () => {
  const randomLoginCityElementId = 'random-login-city-element';

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MemoizedRandomLoginCity/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(randomLoginCityElementId)).toBeInTheDocument();

  });
});
