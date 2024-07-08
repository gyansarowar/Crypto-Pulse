import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_CRYPTOAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_CRYPTOAPI_HOST,
};
const baseUrl = import.meta.env.VITE_CRYPTOAPI_URL;
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(
          `/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`
        ),
    }),
  }),
});
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

