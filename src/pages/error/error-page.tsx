import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {MemoizedHeader} from '../../components/header/header.tsx';
import {Helmet} from 'react-helmet-async';

export const ErrorPage = () => (
  <div data-testid = "error-page-element">
    <Helmet>
      <title>6 cities. error page</title>
    </Helmet>
    <MemoizedHeader/>
    <div style={{textAlign: 'center', marginTop: '10%', fontSize: '30px',}}>
      404. Page Not Found.<br/>
      <Link to={Paths.Main} style={{textDecoration: 'underline', color: '#4481c3'}}>
        На главную
      </Link>
    </div>
  </div>
);
