import Login from "./Login";
import logo from "../assets/livefanlogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src={logo} className="logo-image" />

      <section class="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
          <li>
            <button className="btn" onClick={() => navigate("/")}>
              Home
            </button>
          </li>
          <li>
            <button className="btn" onClick={() => navigate("/concerts")}>
              Current concerts
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
