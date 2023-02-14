import React from "react";
import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

export const UserPage = () => {
  const { auth } = useContext(GlobalContext);
  return (
    <div>
      <h3>Hello {auth.email}</h3>
      <div>
        <h3>Your booked concerts:</h3>
        <div class="gallery">
          <a target="_blank" href="img_5terre.jpg">
            <img
              src="img_5terre.jpg"
              alt="Cinque Terre"
              width="600"
              height="400"
            />
          </a>
          <div class="desc">Add a description of the image here</div>
        </div>
      </div>
    </div>
  );
};
