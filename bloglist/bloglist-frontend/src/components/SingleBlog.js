const SingleBlog = ({ selectedBlog, addLike, removeBlog, currentUser }) => {
    const blog = selectedBlog
    if(!blog){
        return null
    }
    console.log(blog)
    return (
        <div>
          <h3>
            {blog.title} {blog.author}
          </h3>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button id="like-button" onClick={() => addLike(blog)}>
              like
            </button>
          </div>
          <div>added by {blog.user.name}</div>
          {blog.user.username === currentUser.username && (
            <button onClick={() => removeBlog(blog.id)}>remove</button>
          )}
        </div>
      );  
}

export default SingleBlog