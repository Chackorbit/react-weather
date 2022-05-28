import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState: initialState,
  reducers: {
    addCountry: (state, action) => {
      state.countries.push(action.payload);
    },
    removeCountry: (state, action) => {
      const newArray = state.countries.filter(
        el => el.place_id !== action.payload
      );
      state.countries = newArray;
    },
  },
});

export const { addCountry, removeCountry } = countrySlice.actions;
export default countrySlice.reducer;
