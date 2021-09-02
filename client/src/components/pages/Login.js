const Login = () => {
  return (
    <form id="login-form">
      <div className="form-group">
        <label htmlFor="name">Username</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="email"
          className="form-control"
          aria-describedby="emailHelp"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Login;
