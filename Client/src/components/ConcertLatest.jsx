import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import defaultpicture from "../assets/noimage.png";

import { useNavigate } from "react-router-dom";

export const ConcertLatest = () => {
  const [concerts, setConcerts] = useState([]);
  const [tickets, setTickets] = useState([]);

  const { auth } = useContext(GlobalContext);
  const [limit, setLimit] = useState(25);
  const navigate = useNavigate();

  //Raw JSON Date example:  "2023-02-08T23:15:30.000Z"
  let currentDate = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    const loadConcerts = async () => {
      const response = await axios.get("/data/concerts");
      console.log(response.data);

      const rawData = response.data;
      const filteredData = rawData.filter((concert) => {
        return concert.datum >= currentDate;
      });

      setConcerts(
        filteredData.sort((a, b) =>
          a.datum > b.datum ? 1 : a.datum < b.datum ? -1 : 0
        )
      );
    };

    loadConcerts();
  }, []);

  if (!concerts.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="center ">Upcoming concerts </h1>
      <hr className="stylez" />
      {concerts.slice(0, limit ? limit : concerts.length).map((concert) => {
        return (
          <div className="cards-container" key={concert.id}>
            <div className="card">
              <h3>
                {concert.name.length > 32
                  ? concert.name.slice(0, 32) + "..."
                  : concert.name}
              </h3>
              <h2>{concert.id}</h2>
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
      <div className="center">
        <hr className="stylez" />
        <button className="btn-singup " onClick={() => setLimit(limit + 5)}>
          Show more
        </button>
      </div>
    </div>
  );
};
