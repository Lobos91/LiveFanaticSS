import React from "react";
import { useNavigate } from "react-router-dom";

export const InfoComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="center">
      <h2 className="textpink">You are not authorized to access this page. </h2>
      <h3>Please login or</h3>
      <button className="btn-singup" onClick={() => navigate("/signup")}>
        Sign Up
      </button>
    </div>
  );
};
