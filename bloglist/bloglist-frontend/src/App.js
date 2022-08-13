import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Success from "./components/Success";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

import { setSuccess, deleteSuccess } from "./reducers/successReducer";
import { setError, deleteError } from "./reducers/errorReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setSuccess(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
      );
      setTimeout(() => {
        dispatch(deleteSuccess());
      }, 5000);
    });
  };

  const addLike = (blog) => {
    const newBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    };

    blogService.update(blog.id, newBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      );
    });
  };

  const removeBlog = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const confirmRemoval = window.confirm(
      `remove blog ${blog.title} by author ${blog.author}`
    );

    if (confirmRemoval) {
      blogService.deleteBlog(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (user === null) {
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
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </h3>

      {blogForm()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="blog">
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removeBlog={removeBlog}
              currentUser={user}
            />
          </div>
        ))}
    </div>
  );
};

export default App;
