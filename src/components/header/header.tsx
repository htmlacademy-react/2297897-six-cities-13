import {Link} from 'react-router-dom';
import {Authorization, Paths} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {fetchUserInfo, logoutAction} from '../../service/api-actions.ts';
import {SyntheticEvent, useEffect} from 'react';

export const Header = () =>{
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const {email, avatarUrl} = useAppSelector((state) => state.userInfo);

  useEffect(() => {
    if(authStatus === Authorization.Auth){
      dispatch(fetchUserInfo());
    }
  }, [authStatus, dispatch]);

  const signOutButtonHandler = (evt: SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={Paths.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              { authStatus === Authorization.Auth
                ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={Paths.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={avatarUrl} style={{borderRadius: '50%'}}/>
                        </div>
                        <span className="header__user-name user__name">{email}</span>
                        <span className="header__favorite-count">3</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a onClick={signOutButtonHandler} className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                )
                : (
                  <li className="header__nav-item user">
                    <Link to={Paths.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

