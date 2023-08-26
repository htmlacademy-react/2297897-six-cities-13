import {describe, expect} from 'vitest';
import {LoadingScreen} from './loading-screen.tsx';
import {render, screen} from '@testing-library/react';

describe('Component: Loading screen', () => {
  it('should render correctly', () => {
    const loadingContainerTestId = 'loading-container';

    render(<LoadingScreen/>);
    const loadingScreen = screen.getByTestId(loadingContainerTestId);

    expect(loadingScreen).toBeInTheDocument();
  });
});
