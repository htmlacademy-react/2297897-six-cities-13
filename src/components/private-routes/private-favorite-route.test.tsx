import {beforeAll, beforeEach, describe, expect} from 'vitest';
import {createMemoryHistory, MemoryHistory} from 'history';
import {Authorization, Paths} from '../../const.ts';
import {withHistory} from '../../mocks/mock-component.tsx';
import {Route, Routes} from 'react-router-dom';
import {PrivateFavoriteRoute} from './private-favorite-route.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: PrivateFavoriteRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(Paths.Favorites);
  });

  it('should render component for public route, when user not authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={Paths.Login}
          element={<span>{expectedText}</span>}
        />
        <Route path={Paths.Favorites} element={(
          <PrivateFavoriteRoute authorization={Authorization.NoAuth}>
            <span>{notExpectedText}</span>
          </PrivateFavoriteRoute>
        )}
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={Paths.Login}
          element={<span>{notExpectedText}</span>}
        />
        <Route path={Paths.Favorites} element={(
          <PrivateFavoriteRoute authorization={Authorization.Auth}>
            <span>{expectedText}</span>
          </PrivateFavoriteRoute>
        )}
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

});
