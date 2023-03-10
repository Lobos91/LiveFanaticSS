import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { submitLogin, auth } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onPost = async (event) => {
    event.preventDefault();
    await axios
      .post("/data/users", {
        email: email,
        password: password,
        roles: userRole,
      })
      .then(function (response) {
        console.log(response);
      });

    submitLogin(email, password);
    navigate("/welcome");
  };

  return (
    <div className="box">
      <h1>Sign up </h1>

      <p className="input-field">
        Please fill in this form to create an account.
      </p>
      <form onSubmit={onPost}>
        <input
          type="email"
          placeholder="Email"
          required={"Please enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <input
          type="password"
          placeholder="Password"
          required={"Please enter a new password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password confirmation"
          required={"Please confirm your password"}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="input-field"
        />
        <div className="input-field">
          {password == passwordConfirm && password != "" ? (
            <button className="btn">Sign Up</button>
          ) : (
            "Password must match !"
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
