import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addVote(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
  },
});

export const { setBlogs, appendBlog, deleteBlog, addVote } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(deleteBlog(id));
  };
};

export const setVote = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog);
    dispatch(addVote(updatedBlog));
  };
};

export const setComment = (c, id) => {
  const comment = {comment: c}
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(comment, id)
    dispatch(addVote(commentedBlog))
  }
}

export default blogSlice.reducer;
