import { Link } from "react-router-dom";

const User = ({ user, blogs }) => {
  return (
    <div>
      <Link id="singlecustomer" to={`/users/${user.id}`}>
        {user.name}
      </Link>
      {blogs.length}
    </div>
  );
};

const Userlist = ({ users }) => {
  return (
    <div>
      <h3>Users</h3>
      <h4>blogs created</h4>
      {users
        .slice()
        .sort((a, b) => a.name > b.name)
        .map((user) => (
          <User key={user.id} user={user} blogs={user.blogs} />
        ))}
    </div>
  );
};

export default Userlist;
