import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import GlobalContext from "../GlobalContext";
import defaultpicture from "../assets/noimage.png";
import BookBtn from "./BookBtn";

import { useNavigate } from "react-router-dom";

export const ConcertLatest = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [limit, setLimit] = useState(25);
  const navigate = useNavigate();
  const [button, setButton] = useState(false);
  const { auth } = useContext(GlobalContext);

  //Raw JSON Date example:  "2023-02-08T23:15:30.000Z"
  let currentDate = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    const loadConcerts = async () => {
      const resConcerts = await axios.get("/data/concerts");
      const resTickets = await axios.get("/data/tickets");

      // getting all concerts above today
      const filteredData = resConcerts.data.filter((concert) => {
        return concert.datum >= currentDate;
      });

      for (let i = 0; i < resTickets.data.length; i++) {
        for (let j = 0; j < filteredData.length; j++) {
          if (
            resTickets.data[i].concertid == filteredData[j].id &&
            resTickets.data[i].booked == 0
          ) {
            Object.assign(filteredData[j], { status: "available" });
          }
        }
      }

      setConcerts(
        filteredData.sort((a, b) =>
          a.datum > b.datum ? 1 : a.datum < b.datum ? -1 : 0
        )
      );
    };
    loadConcerts();
  }, []);

  console.log(concerts);

  if (!concerts.length) {
    return <p className="center">Loading...</p>;
  }

  return (
    <div className="center">
      <h1 className="textpink">Upcoming concerts </h1>
      <hr className="stylez" />
      {concerts.slice(0, limit ? limit : concerts.length).map((concert) => {
        return (
          <div className="cards-container " key={concert.id}>
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
              {auth.loggedIn ? (
                concert.status ? (
                  <BookBtn text="Book a ticket" />
                ) : (
                  <BookBtn color="gray" />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}

      <div>
        <hr className="stylez" />
        <button className="btn-singup " onClick={() => setLimit(limit + 5)}>
          Show more
        </button>
      </div>
    </div>
  );
};
