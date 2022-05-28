import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'f53706c760b3a71531924962d57efc4b';

export const weatherFetch = createApi({
  reducerPath: 'weather',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.openweathermap.org/data/2.5`,
  }),
  tagTypes: ['Weather'],

  endpoints: builder => ({
    getWeather: builder.mutation({
      query: ({ lat, lon }) => ({
        url: `/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetWeatherMutation } = weatherFetch;
