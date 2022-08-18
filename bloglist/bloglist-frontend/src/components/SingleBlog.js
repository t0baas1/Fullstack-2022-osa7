import { useState } from "react"

const SingleBlog = ({ selectedBlog, addLike, removeBlog, currentUser, addComment }) => {

  const [comment, setComment] = useState("")

  const updateComment = (event) => {
    let comment = event.target.value.toString()
    setComment(comment)
  }

  const sendComment = () => {
    addComment(comment, blog.id)
    setComment("")
  }

  const blog = selectedBlog
  if(!blog){
      return null
  }
  const comments = blog.comments
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
        <div>
          <h3>comments</h3>
          <p><input value={comment} onChange={updateComment}/><button onClick={() => sendComment()}>add comment</button></p>
          <ul>
            {comments.map(c => (
              <li key={c.id}>{c.comment}</li>
            ))}
          </ul>
        </div>
      </div>
    );  
}

export default SingleBlog