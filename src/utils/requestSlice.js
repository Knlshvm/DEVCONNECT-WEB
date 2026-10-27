import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequets: (state, action) => {
      return state.filter((requet) => requet._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequets } = RequestsSlice.actions;

export default RequestsSlice.reducer;
