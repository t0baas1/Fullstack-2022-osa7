import { createSlice } from "@reduxjs/toolkit";

const successSlice = createSlice({
  name: "success",
  initialState: null,
  reducers: {
    setSuccess(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    deleteSuccess(state, action) {
      return null;
    },
  },
});

export const { setSuccess, deleteSuccess } = successSlice.actions;

export default successSlice.reducer;
