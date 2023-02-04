import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // Load concerts and artist from database
    const loadData = async () => {
      const responseConcerts = await axios.get("/data/concerts");
      const responseArtists = await axios.get("/data/artists");
      setConcerts(responseConcerts.data);
      setArtists(responseArtists.data);
    };

    loadData();
  }, []);

  const queryConcerts = concerts.filter((concert) =>
    concert.name.toLowerCase().includes(query)
  );

  const queryArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query)
  );

  console.log(queryConcerts);
  console.log(queryArtists);

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search here"
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* ////// Content /////*/}
      {/* This content should be located in SearchPage */}
    </div>
  );
};

export default SearchBar;
