import Login from "./Login";
import logo from "../assets/livefanlogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import { useContext, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";

import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();
  const { auth } = useContext(GlobalContext);

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
            {" "}
            <button className="btn" onClick={() => navigate("/explore")}>
              Explore
            </button>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <Login />
          </li>
          {auth.loggedIn ? (
            <li>
              <BsFillPersonFill
                className="profileBtn"
                onClick={() => navigate("/user")}
              />
            </li>
          ) : (
            ""
          )}
        </ul>
      </section>
    </header>
  );
}

export default Header;
