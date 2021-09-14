import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useMutation } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks"; // *******
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Jumbotron } from "react-bootstrap";

// const Login = (props) => {   // *****?????
const Login = () => {
  // *****?????
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [validated] = useState(false); // ************
  const [showAlert, setShowAlert] = useState(false); // ***********

  // const [loginUser] = useMutation(LOGIN_USER);  // ***********
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  console.log(data);

  return (
    <Jumbotron>
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2" id="login">
              Login
            </h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{" "}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Jumbotron>
  );
};

export default Login;
