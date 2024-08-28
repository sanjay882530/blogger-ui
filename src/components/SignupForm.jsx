import React, { useState } from "react";
import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

const SignupForm = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [recaptchaValue, setRecaptchaValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const RECAPTCHA_SITE_KEY = "6LcGexkqAAAAANpbbIGGiKCfUvmbgs19FXNES81P";

  const handleSignup = (e) => {
    e.preventDefault();

    // if (!recaptchaValue) {
    //   setError("Please complete the reCAPTCHA");
    //   return;
    // }

    axios
      .post("http://3.110.92.7:9080/api/blogs/signup", {
        username,
        password,
        email,
        // recaptchaToken: recaptchaValue,
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setSuccess("Signup successful!");
        setError("");
        setUsername(""); // Clear the username field
        setPassword(""); // Clear the password field
        setEmail(""); // Clear the email field
      })
      .catch((error) => {
        setError("Signup failed. Please try again.");
        setSuccess("");
      });
  };

  // const onRecaptchaChange = (value) => {
  //   setRecaptchaValue(value);
  // };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSignup}>
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        {/* <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} /> */}
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
