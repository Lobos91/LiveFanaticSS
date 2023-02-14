import React, { useState, useEffect } from "react";
import { createSearchParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState();

  const handleChange = (event) => {
    navigate({
      pathname: "/searchpage",
      search: createSearchParams({
        band: query,
      }).toString(),
    });
  };

  return (
    <div>
      <input
        className="navinput"
        type="text"
        placeholder="Artist/Band"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn" onClick={handleChange}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
