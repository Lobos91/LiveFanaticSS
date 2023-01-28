import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

export default function Welcome() {
  const { auth } = useContext(GlobalContext);

  return (
    <section>
      <h2>{auth.loggedIn ? "Welcome " + auth.email : "Welcome stranger"}</h2>
    </section>
  );
}
