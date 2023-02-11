import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import defaultpicture from "../assets/noimage.png";
import GlobalContext from "../GlobalContext";

const Explore = () => {
  //Raw JSON Date example:  "2023-02-08T23:15:30.000Z"
  let currentDate = new Date().toJSON().slice(0, 10);
  const { auth } = useContext(GlobalContext);
  const [concerts, setConcerts] = useState([]);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [limit, setLimit] = useState(25);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadConcerts = async () => {
      const request = await axios.get("data/concerts");
      setConcerts(request.data);
    };
    loadConcerts();
  }, []);

  const filtered = concerts.filter((concert) => {
    return concert.datum >= startDate && concert.datum <= endDate;
  });

  return (
    <div className="center">
      <label for="start">Start date:</label>
      <label for="end">End date:</label>

      <input
        type="date"
        id="start"
        value={startDate}
        min="2023-01-01"
        max="2030-12-31"
        onChange={(event) => setStartDate(event.target.value)}
      />

      <input
        type="date"
        id="end"
        value={endDate}
        min="2023-01-01"
        max="2030-12-31"
        onChange={(event) => setEndDate(event.target.value)}
      />

      <div>
        {!filtered.length && (
          <h2 className="center textpink">No concerts found</h2>
        )}

        {filtered.slice(0, limit ? limit : filtered.length).map((concert) => {
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
          {!filtered.length ? (
            ""
          ) : (
            <button className="btn-singup " onClick={() => setLimit(limit + 5)}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
