import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {Header} from '../../components/header/header.tsx';

export const ErrorPage = () => (
  <div>
    <Header/>
    <div style={{textAlign: 'center', marginTop: '10%', fontSize: '30px',}}>
      404. Page Not Found.<br/>
      <Link to={Paths.Main} style={{textDecoration: 'underline', color: '#4481c3'}}>
        На главную
      </Link>
    </div>
  </div>
);
