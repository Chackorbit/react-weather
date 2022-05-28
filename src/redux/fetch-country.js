import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_KEY = 'f53706c760b3a71531924962d57efc4b';

export const countryFetch = createApi({
  reducerPath: 'country',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://nominatim.openstreetmap.org`,
  }),
  tagTypes: ['Country'],

  endpoints: builder => ({
    find: builder.mutation({
      query: city => ({
        url: `/search?&city=${city}&format=json`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useFindMutation } = countryFetch;
