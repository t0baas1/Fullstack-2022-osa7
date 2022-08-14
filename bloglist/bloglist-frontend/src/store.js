import { configureStore } from "@reduxjs/toolkit";

import successReducer from "./reducers/successReducer";
import errorReducer from "./reducers/errorReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    success: successReducer,
    error: errorReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;
