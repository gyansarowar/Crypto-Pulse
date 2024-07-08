import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_CRYPTONEWSAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_CRYPTONEWSAPI_HOST,
};
const baseUrl = import.meta.env.VITE_CRYPTONEWSAPI_URL;
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ count }) => createRequest(`/coindesk?limit=${count}`),
    }),
  }),
});
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
