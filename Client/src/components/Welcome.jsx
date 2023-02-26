import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";
import skyltning from "../assets/Screenshot_1.png";

import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { auth } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div>
      <section>
        {auth.loggedIn ? (
          <div className="center">
            <h1 className="textpink">Welcome {auth.email}</h1>
            <hr />
            <h2>
              As a user, you gain access to over two thousand live and online
              concerts.
            </h2>
            <h2>All concerts are free so jump in and enjoy! </h2>
            <img className="responsive" src={skyltning} alt="Concert image" />
            <h5>
              Keep in mind, not all concerts might be available at the very
              moment.{" "}
            </h5>
          </div>
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
