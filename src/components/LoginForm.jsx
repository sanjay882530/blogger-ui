import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://3.110.92.7:9080/api/blogs/login",
        { username, password },
        {
          headers: {
            Origin: "https://blogger-ui.vercel.app/",
          },
        }
      )
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        console.log("user details fetch by user name:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/blogger"); // Redirect to the blogger's page
      })
      .catch((error) => {
        setError("Invalid username or password");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Sign In</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="dropdownCheck"
            />
            <label className="form-check-label" htmlFor="dropdownCheck">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>

          <label className="form-label">
            Not a member? Register here...
            <button className="btn btn-secondary">
              <Link className="nav-link text-white" to="/signup">
                Sign Up
              </Link>
            </button>
          </label>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
