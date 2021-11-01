import { configureStore } from '@reduxjs/toolkit';
import accountReduxer from './accountSlice';

export const store = configureStore({
  reducer: {
    account: accountReduxer,
  }
});
