import React, { FC, useEffect } from 'react';
import TickersList from '../../components/TickersList/TickersList';
import { useAppDispatch } from '../../hooks';
import { socketServices } from '../../socket';

const TickersPage:FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketServices.connectSocket();
    socketServices.startSocket();

    dispatch(socketServices.getTickers());
    return () => {
      socketServices.closeSocket();
    };
  }, []);

  return (
    <TickersList />
  );
};

export default TickersPage;
