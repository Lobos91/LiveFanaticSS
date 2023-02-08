import Login from "./Login";
import logo from "../assets/livefanlogo.png";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src={logo} className="logo-image" />

      <section>
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          {/* empty div to get burger icon */}
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li>
            <button className="btn" onClick={() => navigate("/")}>
              Home
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/concerts")}>
              Upcoming concerts
            </button>
          </li>
          <li>
            {" "}
            <button className="btn" onClick={() => navigate("/concerts")}>
              Concerts Today
            </button>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <Login />
          </li>
        </ul>
      </section>
    </header>
  );
}

export default Header;
