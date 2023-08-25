import {beforeAll, beforeEach, describe, expect} from 'vitest';
import {createMemoryHistory, MemoryHistory} from 'history';
import {Authorization, Paths} from '../../const.ts';
import {withHistory} from '../../mocks/mock-component.tsx';
import {Route, Routes} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {PrivateLoginRoute} from './private-login-route.tsx';

describe('Component: PrivateFavoriteRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(Paths.Login);
  });

  it('should render component for public route, when user authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={Paths.Main}
          element={<span>{expectedText}</span>}
        />
        <Route path={Paths.Login} element={(
          <PrivateLoginRoute authorization={Authorization.Auth}>
            <span>{notExpectedText}</span>
          </PrivateLoginRoute>
        )}
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user not authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={Paths.Main}
          element={<span>{notExpectedText}</span>}
        />
        <Route path={Paths.Login} element={(
          <PrivateLoginRoute authorization={Authorization.NoAuth}>
            <span>{expectedText}</span>
          </PrivateLoginRoute>
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
