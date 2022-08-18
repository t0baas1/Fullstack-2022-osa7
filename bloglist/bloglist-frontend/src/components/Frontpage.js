import Blog from "./Blog";
import { Table } from "react-bootstrap"
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
      <Table striped>
        <tbody>
          {savedBlogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={deleteBlog}
                currentUser={currentUser}
              />
            </td>
            <td>
              {blog.author}
            </td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  );
};

export default Frontpage;
