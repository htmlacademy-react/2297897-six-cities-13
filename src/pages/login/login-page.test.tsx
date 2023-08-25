import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {LoginPage} from './login-page.tsx';
import {describe, expect} from 'vitest';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const loginElementTestId = 'login-element';
    const passwordElementTestId = 'password-element';
    const {withStoreComponent} = withStore(<LoginPage/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async() => {
    const loginElementTestId = 'login-element';
    const passwordElementTestId = 'password-element';
    const expectedLoginValue = 'test login';
    const expectedPasswordValue = 'test_password123';
    const {withStoreComponent} = withStore(<LoginPage/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
