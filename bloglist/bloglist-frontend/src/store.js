import { configureStore } from "@reduxjs/toolkit";

import successReducer from "./reducers/successReducer";
import errorReducer from "./reducers/errorReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    success: successReducer,
    error: errorReducer,
    blogs: blogReducer,
  },
});

export default store;
