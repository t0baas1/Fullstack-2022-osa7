import { configureStore } from "@reduxjs/toolkit";

import successReducer from "./reducers/successReducer";
import errorReducer from "./reducers/errorReducer";

const store = configureStore({
  reducer: {
    success: successReducer,
    error: errorReducer,
  },
});

export default store;
