import { io } from 'socket.io-client';
import { baseURL, SocketEvents } from '../constants';
import { ITicker } from '../interfaces/ticker.interface';
import { AppDispatch, tickersActions } from '../redux';

const socket = io(baseURL);

const socketServices = {
  connectSocket: () => socket.connect(),
  startSocket: () => socket.emit(SocketEvents.START),
  getTickers: () => (dispatch:AppDispatch) => socket.on(
    SocketEvents.TICKER,
    (tickers:ITicker[]) => (
      dispatch(tickersActions.setTickers(tickers))),
  ),
  closeSocket: () => socket.close(),
  addTicker: (data:string) => socket.emit(SocketEvents.ADD_TICKER, data),
  removeTicker: (ticker:string) => socket.emit(SocketEvents.REMOVE_TICKER, ticker),
};

export {
  socketServices,
  socket,
};
