import { Link } from "react-router-dom";
import Login from "./Login";
import logo from "../assets/livefanlogo.png";

function Header() {
  return (
    <header>
      <img src={logo} />
      <button className="btn">
        <Link to="/">Home</Link>
      </button>
      <Login />
    </header>
  );
}

export default Header;
