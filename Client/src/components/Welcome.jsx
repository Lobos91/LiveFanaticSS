import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { auth } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <section>
        {auth.loggedIn ? (
          "Welcome " + auth.email
        ) : (
          <div className="welcome-unlogged ">
            <div>
              <button
                className="btn-singup"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
