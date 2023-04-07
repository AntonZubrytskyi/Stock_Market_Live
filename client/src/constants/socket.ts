const baseURL = process.env.REACT_APP_API || 'test';

enum SocketEvents {
  TICKER = 'ticker',
  START = 'start',
  ADD_TICKER = 'add_ticker',
  REMOVE_TICKER = 'remove_ticker',
}
export {
  baseURL,
  SocketEvents,
};
