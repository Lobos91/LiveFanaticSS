import React, { useState, useEffect } from "react";
import axios from "axios";
import { createSearchParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  //
  // const searchText = (event) => {
  //   setQuery(event.target.value);
  //   handleChange();
  // };

  const handleChange = (event) => {
    navigate({
      pathname: "/searchpage",
      search: createSearchParams({
        id: query,
      }).toString(),
    });
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Artist/Band"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" onClick={handleChange}>
        {" "}
        Search
      </button>
    </div>
  );
};

export default SearchBar;
