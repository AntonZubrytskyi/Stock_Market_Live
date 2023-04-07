import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import LoginForm from '../../components/LoginForm/LoginForm';
import { RoutePath } from '../../constants';
import { localStorageHelper } from '../../helpers';

const LoginPage:FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: ({ access_token }) => {
      localStorageHelper.setToLocalStorage('accessToken', access_token);
      navigate(RoutePath.TICKERS);
    },
  });
  return (
    <LoginForm login={login} />
  );
};

export default LoginPage;
