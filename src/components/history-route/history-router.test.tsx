import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {HistoryRouter, HistoryRouterProps} from './history-router.tsx';

describe('Component: HistoryRouter', () => {
  let history: ReturnType<typeof createMemoryHistory>;
  let props: HistoryRouterProps;

  beforeEach(() => {
    history = createMemoryHistory();
    props = { history };
  });

  it('renders works correctly', () => {
    render(<HistoryRouter {...props} />);
  });


  it('should set the correct location in Router', () => {
    const mockRoute = '/mock-route';
    history.push(mockRoute);

    render(
      <HistoryRouter {...props}>
        <div data-testid="test-element" />
      </HistoryRouter>
    );

    expect(screen.getByTestId('test-element'))
      .toBeInTheDocument();

    expect(history.location.pathname)
      .toEqual(mockRoute);
  });
});
