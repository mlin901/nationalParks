import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";

// import { useMutation } from "@apollo/client";

import { useMutation } from '@apollo/react-hooks';  // *******

import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      console.log(data)

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <Jumbotron>
      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
          <div className="card" id="signupform">
            <h2 className="card-header bg-dark text-light p-2" id="signup">
              Sign Up
            </h2>
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
                    placeholder="Your name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
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
                
                    <button className="button-os">
                      <a href="#save">Sign Up</a>
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

export default Signup;
