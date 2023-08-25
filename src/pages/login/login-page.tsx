import {ChangeEvent, FormEvent, useState} from 'react';
import {AuthData, loginAction} from '../../service/api-actions.ts';
import {Link} from 'react-router-dom';
import {Paths} from '../../const.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {MemoizedRandomLoginCity} from '../../components/random-login-city/random-login-city.tsx';
import {Helmet} from 'react-helmet-async';

export const LoginPage = () => {
  const [AuthInfo, setAuthInfo] = useState<AuthData>({login: '', password: ''});
  const [isFocused, setIsFocused] = useState(false);
  const loginRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  const isValidPassword = passwordRegex.test(AuthInfo.password);
  const isValidEmail = loginRegex.test(AuthInfo.login);
  const isNeedDisable = !AuthInfo.login || !isValidPassword || !isValidEmail;
  const dispatch = useAppDispatch();

  const handleFocusPassword = () => {
    setIsFocused(true);
  };

  const handleBlurPassword = () => {
    setIsFocused(false);
  };

  const handleLoginChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({...AuthInfo, login: evt.target.value});
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthInfo({...AuthInfo, password: evt.target.value});
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      login: AuthInfo.login,
      password: AuthInfo.password,
    });
  };

  return(
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={Paths.Main}>
                <img className="header__logo" src="markup/img/logo.svg" alt="6 cities logo" width="81" height="41" />
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
                  onChange={handleLoginChange}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="login-element"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  value={AuthInfo.password}
                  onFocus={handleFocusPassword}
                  onBlur={handleBlurPassword}
                  onChange={handlePasswordChange}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="password-element"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="sign-in-button"
                disabled={isNeedDisable}
              >
                Sign in
              </button>
              <ul>
                { isFocused &&
                <li style={{color: isValidPassword ? 'green' : 'red'}}>Password must contain at least 1 number and letter</li>}
              </ul>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <MemoizedRandomLoginCity />
          </section>
        </div>
      </main>
    </div>
  );
};
