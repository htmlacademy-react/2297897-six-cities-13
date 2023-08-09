import {ChangeEvent, FormEvent, useState} from 'react';
import {AuthData, loginAction} from '../../service/api-actions.ts';
import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';

export const LoginPage = () => {
  const [AuthInfo, setAuthInfo] = useState<AuthData>({login: '', password: ''});
  const dispatch = useAppDispatch();

  const onLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({...AuthInfo, login: evt.target.value});
  };

  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({...AuthInfo, password: evt.target.value});
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(AuthInfo.login !== '' && AuthInfo.password !== ''){
      onSubmit({
        login: AuthInfo.login,
        password: AuthInfo.password,
      });
    }
  };

  return(
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Paths.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  value={AuthInfo.login}
                  onChange={onLoginChange}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={AuthInfo.password}
                  onChange={onPasswordChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
