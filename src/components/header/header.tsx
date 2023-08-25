import {Link} from 'react-router-dom';
import {Authorization, Paths} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {logoutAction} from '../../service/api-actions.ts';
import {memo, SyntheticEvent} from 'react';
import {getAuthStatus, getUserInfo} from '../../store/user-process/user-process.selectors.ts';
import {getFavoriteOffers} from '../../store/offers-process/offers-process.selectors.ts';

const Header = () =>{
  const authStatus = useAppSelector(getAuthStatus);
  const {email, avatarUrl} = useAppSelector(getUserInfo);
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();

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
              <img
                className="header__logo"
                src="markup/img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
                data-testid="logo-element"
              />
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
                          <img src={avatarUrl} alt="avatar" style={{borderRadius: '50%'}}/>
                        </div>
                        <span className="header__user-name user__name">{email}</span>
                        <span className="header__favorite-count">{favoriteOffers.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link onClick={signOutButtonHandler} className="header__nav-link" to={Paths.Main}>
                        <span className="header__signout">Sign out</span>
                      </Link>
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

export const MemoizedHeader = memo(Header);
