import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { realTimeCryptoNewsApi } from "../services/realTimeCryptoNewsApi";
const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [realTimeCryptoNewsApi.reducerPath]: realTimeCryptoNewsApi.reducer,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware().concat(cryptoApi.middleware),
  // });
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(realTimeCryptoNewsApi.middleware),
});
export default store;
