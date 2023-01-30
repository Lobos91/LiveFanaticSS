import Login from "./Login";
import logo from "../assets/livefanlogo.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src={logo} className="logo-image" />
      <button className="btn" onClick={() => navigate("/")}>
        Home
      </button>
      <button className="btn" onClick={() => navigate("/concerts")}>
        Current concerts
      </button>

      <button className="btn" onClick={() => navigate("/artist")}>
        Artists
      </button>

      <Login />
    </header>
  );
}

export default Header;
