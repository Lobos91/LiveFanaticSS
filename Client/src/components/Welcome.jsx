import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";
import { UserPage } from "./UserPage";

import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { auth } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div>
      <section>
        {auth.loggedIn ? (
          <UserPage />
        ) : (
          <div className="box ">
            <div className="input-field ">
              <h1 className="textpink">Welcome at Live Fanatics SS</h1>
              <h2 className="column ">
                Register today to get access to multiple concerts across the
                world and enjoy the music!
              </h2>
              <div style={{ paddingTop: 30 }}>
                <button
                  className="btn-singup "
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
