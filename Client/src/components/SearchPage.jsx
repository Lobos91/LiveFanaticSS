import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import defaultpicture from "../assets/noimage.png";

export const SearchPage = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [searchparams] = useSearchParams();
  const { auth } = useContext(GlobalContext);

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

  queryConcerts.sort((a, b) =>
    a.datum > b.datum ? 1 : a.datum < b.datum ? -1 : 0
  );

  return (
    <div>
      <h1 className="center">Search concerts </h1>
      <hr className="stylez" />
      {queryConcerts.map((concert) => {
        return (
          <div className="cards-container" key={concert.id}>
            <div className="card">
              <h3>
                {concert.name.length > 32
                  ? concert.name.slice(0, 32) + "..."
                  : concert.name}
              </h3>
              <img
                src={concert?.image ? concert.image : defaultpicture}
                alt="Band-Image"
              />
              <div>
                <p className="label">{concert.datum}</p>
                <p className="cardAdress">
                  {concert.venue.length > 30
                    ? concert.venue.slice(0, 27) + "..."
                    : concert.venue}
                </p>
              </div>
              {auth.loggedIn ? <a href="#">Book a ticket</a> : ""}
            </div>
          </div>
        );
      })}
      <hr className="stylez" />
    </div>
  );
};
