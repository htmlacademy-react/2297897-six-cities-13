import {BrowserHistory} from 'history';
import {FC, ReactNode, useLayoutEffect, useState} from 'react';
import {Router} from 'react-router-dom';

export type HistoryRouteProps = {
    history: BrowserHistory;
    basename?: string;
    children?: ReactNode;
}

export const HistoryRouter: FC<HistoryRouteProps> = ({
  basename,
  children,
  history,
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return(
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};
