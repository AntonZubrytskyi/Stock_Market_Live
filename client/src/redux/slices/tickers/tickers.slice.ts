import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITicker } from '../../../interfaces/ticker.interface';

interface ITickersSliceState {
  tickers: ITicker[],
  error: string | null,
  status: string,
}

const initialState: ITickersSliceState = {
  tickers: [],
  error: null,
  status: '',
};

const tickersSlice = createSlice({
  name: 'tickersSlice',
  initialState,
  reducers: {
    setTickers: (
      state,
      action: PayloadAction<ITicker[]>,
    ) => {
      state.tickers = action.payload;
    },
    removeTicker: (
      state,
      action,
    ) => {
      state.tickers = state.tickers.filter((ticker) => ticker.ticker !== action.payload);
    },
  },
  extraReducers: {},
});

const {
  reducer: tickersReducer, actions: { setTickers, removeTicker },
} = tickersSlice;

const tickersActions = {
  setTickers,
  removeTicker,
};

export {
  tickersActions,
  tickersReducer,
};
