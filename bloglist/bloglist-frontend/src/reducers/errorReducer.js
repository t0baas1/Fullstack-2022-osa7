import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: null,
  reducers: {
    setError(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    deleteError(state, action) {
      return null;
    },
  },
});

export const { setError, deleteError } = errorSlice.actions;

export default errorSlice.reducer;
