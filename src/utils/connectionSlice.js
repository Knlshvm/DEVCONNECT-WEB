import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
  },
});

export const { addConnection } = ConnectionSlice.actions;

export default ConnectionSlice.reducer;
