import React from "react";
import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

export const UserPage = () => {
  const { auth } = useContext(GlobalContext);
  return (
    <div>
      <h1>Welcome back {auth.email}</h1>
    </div>
  );
};
