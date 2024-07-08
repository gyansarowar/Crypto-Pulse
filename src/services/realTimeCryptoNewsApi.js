import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const realTimeCryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_REALTIMECRYPTONEWSAPI_KEY,
  "x-rapidapi-host": import.meta.env.VITE_REALTIMECRYPTONEWSAPI_HOST,
};
const baseUrl = import.meta.env.VITE_REALTIMECRYPTONEWSAPI_URL;
const createRequest = (url) => ({ url, headers: realTimeCryptoNewsHeaders });

export const realTimeCryptoNewsApi = createApi({
  reducerPath: "realTimeCryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRealTimeCryptoNews: builder.query({
      query: ({ name }) =>
        createRequest(
          `/search?query=${name}%20cryptocurrency%20news&limit=4&time_published=7d&country=US&lang=en`
        ),
    }),
  }),
});
export const { useGetRealTimeCryptoNewsQuery } = realTimeCryptoNewsApi;
