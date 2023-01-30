import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export const Artist = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function loadArtists() {
      const response = await axios.get("/get/artists");
      artists = response.data;
    }
    loadArtists();
  }, []);

  if (!artists.length) {
    return <h1>Loading...</h1>;
  }
  console.log("artists: " + artists);
  return (
    <div>
      <h1> Artist list </h1>
      <h2>{artists[2]}</h2>
    </div>
  );
};
