import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
            placeholder="write here blog title"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="write here blog author"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
            placeholder="write here blog url"
          />
        </div>
        <button id="create" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
