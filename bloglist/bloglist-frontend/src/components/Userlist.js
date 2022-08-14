const User = (user) => {
  const blogs = user.blogs.length;
  return (
    <div>
      {user.name} {blogs}
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
          <User key={user.id} name={user.name} blogs={user.blogs} />
        ))}
    </div>
  );
};

export default Userlist;
