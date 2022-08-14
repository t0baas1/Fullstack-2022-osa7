import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Frontpage from "./components/Frontpage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Success from "./components/Success";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Userlist from "./components/Userlist";

import { setSuccess, deleteSuccess } from "./reducers/successReducer";
import { setError, deleteError } from "./reducers/errorReducer";
import {
  initializeBlogs,
  setVote,
  removeBlog,
  createBlog,
} from "./reducers/blogReducer";

import { setUser, resetUser } from "./reducers/userReducer";
import { getUsers } from "./reducers/allReducer";

import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  let savedBlogs = useSelector((state) => state.blogs);
  let currentUser = useSelector((state) => state.user);
  let allUsers = useSelector((state) => state.all);
  console.log(allUsers);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setError("wrong username or password"));
      setTimeout(() => {
        dispatch(deleteError());
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(resetUser());
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(
      setSuccess(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    );
    setTimeout(() => {
      dispatch(deleteSuccess());
    }, 5000);
  };

  const addLike = (blog) => {
    const newBlog = {
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };
    dispatch(setVote(newBlog));
  };

  const deleteBlog = (id) => {
    const blog = savedBlogs.find((b) => b.id === id);
    const confirmRemoval = window.confirm(
      `remove blog ${blog.title} by author ${blog.author}`
    );

    if (confirmRemoval) {
      dispatch(removeBlog(id));
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (currentUser === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Error />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Success />

      <h3>
        {currentUser.name} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </h3>
      <Routes>
        <Route
          path="/"
          element={
            <Frontpage
              blogForm={blogForm()}
              savedBlogs={savedBlogs}
              currentUser={currentUser}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          }
        />
        <Route path="/users" element={<Userlist users={allUsers} />} />
      </Routes>
    </div>
  );
};

export default App;
