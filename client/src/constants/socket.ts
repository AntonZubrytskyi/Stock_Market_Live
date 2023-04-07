const baseURL = 'http://localhost:4000';

enum SocketEvents {
  TICKER = 'ticker',
  START = 'start',
  ADD_TICKER = 'add_ticker',
  REMOVE_TICKER = 'remove_ticker',
}

const mockData = [
  {
    ticker: 'AAPL', exchange: 'NASDAQ', price: '127.13', change: '70.16', change_percent: '0.13', dividend: '0.77', yieldValue: '0.24', last_trade_time: '2023-04-07T05:48:58.000Z',
  },
  {
    ticker: 'GOOGL', exchange: 'NASDAQ', price: '252.05', change: '166.34', change_percent: '0.07', dividend: '0.54', yieldValue: '1.01', last_trade_time: '2023-04-07T05:48:58.000Z',
  },
  {
    ticker: 'MSFT', exchange: 'NASDAQ', price: '297.74', change: '69.91', change_percent: '0.26', dividend: '0.94', yieldValue: '0.86', last_trade_time: '2023-04-07T05:48:58.000Z',
  },

];

export {
  baseURL,
  mockData,
  SocketEvents,
};
