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
    <div>
      <h1>Sign up page</h1>
      <form onSubmit={onPost}>
        <div className="registrationForm">
          <div>
            <input
              type="email"
              placeholder="email"
              required={"Please enter your email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="password"
              required={"Please enter a new password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="password confirmation"
              required={"Please confirm your password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div>
            {password == passwordConfirm && password != "" ? (
              <button>Sign Up</button>
            ) : (
              "Password doesn't match"
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
