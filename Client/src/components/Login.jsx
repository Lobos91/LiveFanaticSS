import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

function Login() {
  const { submitLogin, auth, logout } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    submitLogin(email, password);
  };

  let loggedIn = true;

  return (
    <div>
      {auth.loggedIn ? (
        <div>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={submit}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ marginRight: 5 }}
                className="login"
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="login"
              />
              <input className="btn" type="submit" value="Login" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
