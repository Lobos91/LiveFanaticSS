import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const SearchPage = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [searchparams] = useSearchParams();

  const query = searchparams.get("id");

  useEffect(() => {
    // Load concerts and artist from database
    const loadData = async () => {
      const responseConcerts = await axios.get("/data/concerts");
      setConcerts(responseConcerts.data);
    };

    loadData();
  }, []);

  const queryConcerts = concerts.filter((concert) =>
    concert.name.toLowerCase().includes(query)
  );

  return (
    <div>
      <h1>Stronka search page</h1>
      <div>
        {queryConcerts.map((concert) => (
          <h2>{concert.name}</h2>
        ))}
      </div>
    </div>
  );
};
