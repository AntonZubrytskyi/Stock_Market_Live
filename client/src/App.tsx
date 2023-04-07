import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { localStorageHelper } from './helpers';
import { RoutePath } from './constants';
import MainLayout from './layouts/MainLayout/MainLayout';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import TickersPage from './pages/TickersPage/TickersPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App: FC = () => {
  const isAuthenticated = localStorageHelper.getFromLocalStorage('accessToken');

  return (
    <Routes>
      <Route
        index
        path="/"
        element={isAuthenticated
          ? <Navigate to={RoutePath.TICKERS} /> : <Navigate to={RoutePath.LOGIN} />}
      />
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<PrivateRoute />}>
          <Route path={RoutePath.TICKERS} element={<TickersPage />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route index path={RoutePath.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
