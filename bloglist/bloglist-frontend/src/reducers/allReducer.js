import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const allSlice = createSlice({
  name: "all",
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload;
    },
  },
});

export const { setAll } = allSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setAll(users));
  };
};

export default allSlice.reducer;
