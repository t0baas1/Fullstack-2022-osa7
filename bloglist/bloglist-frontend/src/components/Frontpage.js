import Blog from "./Blog";
const Frontpage = ({
  blogForm,
  savedBlogs,
  currentUser,
  addLike,
  deleteBlog,
}) => {
  return (
    <div>
      {blogForm}

      {savedBlogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="blog">
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removeBlog={deleteBlog}
              currentUser={currentUser}
            />
          </div>
        ))}
    </div>
  );
};

export default Frontpage;
