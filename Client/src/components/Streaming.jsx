import React from "react";
import GlobalContext from "../GlobalContext";
import { useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { InfoComponent } from "./InfoComponent";

export const Streaming = () => {
  const { auth } = useContext(GlobalContext);
  const { state } = useLocation();
  let concert;
  if (state) {
    concert = state.concert;
  }

  if (auth.loggedIn) {
    return (
      <div className="box">
        <h1 className="textpink">Enjoy your concert! </h1>
        <video controls>
          <source src={"/data/video-stream/1"} type="video/mp4" />
        </video>
        <h1 className="textpink">{concert.name} </h1>
      </div>
    );
  } else {
    return <InfoComponent />;
  }
};
