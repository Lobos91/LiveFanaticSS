import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import defaultpicture from "../assets/noimage.png";
import GlobalContext from "../GlobalContext";
import BookBtn from "./BookBtn";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  //Raw JSON Date example:  "2023-02-08T23:15:30.000Z"
  let currentDate = new Date().toJSON().slice(0, 10);
  const { auth } = useContext(GlobalContext);
  const [concerts, setConcerts] = useState([]);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [limit, setLimit] = useState(25);
  const navigate = useNavigate();

  useEffect(() => {
    const loadConcerts = async () => {
      const resConcerts = await axios.get("data/concerts");
      const tickets = await axios.get("/data/tickets");

      //adding available status to array of concerts
      for (let i = 0; i < tickets.data.length; i++) {
        for (let j = 0; j < resConcerts.data.length; j++) {
          if (
            tickets.data[i].concertid == resConcerts.data[j].id &&
            tickets.data[i].booked == 0
          ) {
            Object.assign(resConcerts.data[j], {
              status: "available",
            });
          }
        }
      }

      setConcerts(resConcerts.data);
    };
    loadConcerts();
  }, []);

  // filtering by date but not sorted
  const filtered = concerts.filter((concert) => {
    return concert.datum >= startDate && concert.datum <= endDate;
  });

  // sorting in ascending order
  filtered.sort((a, b) => (a.datum > b.datum ? 1 : a.datum < b.datum ? -1 : 0));

  return (
    <div className="center ">
      <h3>Search for concerts between two dates!</h3>
      <input
        className="input"
        type="date"
        id="start"
        value={startDate}
        min="2023-01-01"
        max="2030-12-31"
        onChange={(event) => setStartDate(event.target.value)}
      />
      <input
        className="input"
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

                {concert.live ? (
                  <h2 className="online"> Online</h2>
                ) : (
                  <h2 className="textpink"> Live!</h2>
                )}

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
                    <BookBtn
                      text="Book a ticket"
                      clickFunc={() =>
                        navigate("/concert", {
                          state: { concert },
                        })
                      }
                    />
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
          <hr />
          {!filtered.length ? (
            ""
          ) : (
            <button className="btn-singup" onClick={() => setLimit(limit + 4)}>
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
