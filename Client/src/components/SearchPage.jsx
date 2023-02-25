import React from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import GlobalContext from "../GlobalContext";
import defaultpicture from "../assets/noimage.png";
import BookBtn from "./BookBtn";

export const SearchPage = (props) => {
  const [concerts, setConcerts] = useState([]);
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const { auth } = useContext(GlobalContext);
  const [limit, setLimit] = useState(25);

  const query = searchparams.get("band");

  useEffect(() => {
    // Load concerts and artist from database
    const loadData = async () => {
      const resConcerts = await axios.get("/data/concerts");
      const tickets = await axios.get("/data/tickets");

      for (let i = 0; i < tickets.data.length; i++) {
        for (let j = 0; j < resConcerts.data.length; j++) {
          if (
            tickets.data[i].concertid == resConcerts.data[j].id &&
            tickets.data[i].booked == 0
          ) {
            Object.assign(resConcerts.data[j], { status: "available" });
          }
        }
      }

      setConcerts(resConcerts.data);
    };

    loadData();
  }, []);

  const queryConcerts = concerts.filter((concert) =>
    concert.name.toLowerCase().includes(query)
  );

  console.log("lista", queryConcerts);

  queryConcerts.sort((a, b) =>
    a.datum > b.datum ? 1 : a.datum < b.datum ? -1 : 0
  );

  return (
    <div className=" center">
      <h1 className=" textpink">Search concerts </h1>
      <hr />
      {queryConcerts
        .slice(0, limit ? limit : concerts.length)
        .map((concert) => {
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
      <hr />
      {!queryConcerts.length ? (
        <h2>
          No artist matching "<span style={{ color: "red" }}>{query}</span>"
          found
        </h2>
      ) : (
        <button className="btn-singup " onClick={() => setLimit(limit + 5)}>
          Show more
        </button>
      )}
    </div>
  );
};
