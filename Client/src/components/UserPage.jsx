import React from "react";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import axios from "axios";
import barcode from "../assets/kod.png";
import { useNavigate } from "react-router-dom";
import { InfoComponent } from "./InfoComponent";

export const UserPage = () => {
  const { auth } = useContext(GlobalContext);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let tickets = [];
    let concerts = [];

    const loadData = async () => {
      const resConcerts = await axios.get("/data/concerts");
      const resTickets = await axios.get("/data/tickets");

      resTickets.data.forEach((ticket) => {
        if (ticket.userid == auth.id && ticket.booked == true) {
          tickets.push(ticket);
        }
      });

      resConcerts.data.forEach((concert) => {
        for (let i = 0; i < tickets.length; i++) {
          if (concert.id == tickets[i].concertid) {
            concerts.push(concert);
          }
        }
      });

      setUserData(
        tickets.map((item, i) => Object.assign({}, item, concerts[i]))
      );
    };
    loadData();
  }, []);

  if (!auth.loggedIn) {
    return <InfoComponent />;
  } else {
    return (
      <div className="ml">
        <h3>Hello {auth.email} </h3>
        {!userData.length ? (
          <h2>You don't have any booked concerts</h2>
        ) : (
          <section>
            <h1 className="textpink">
              You have {userData.length} booked tickets:
            </h1>
            {userData.map((concert) => {
              return (
                <div className="user-ticket-container" key={concert.id}>
                  <div className="user-ticket-child">
                    <h3 style={{ fontStyle: "italic" }}>{concert.name} </h3>

                    {concert.live ? (
                      <div>
                        <h4>Date: {concert.datum}</h4>
                        <h4>
                          Time: {concert.hour}:{concert.minute}
                        </h4>
                        <h4 className="textpink">
                          This is ticket for online streaming.
                        </h4>
                      </div>
                    ) : (
                      <div>
                        <h4>Location: {concert.venue}</h4>
                        <h4>Date: {concert.datum}</h4>
                        <h4>
                          Gate open: {concert.hour - 1}:{concert.minute}{" "}
                        </h4>
                      </div>
                    )}

                    <p>Ticket holder: {auth.email}</p>
                  </div>

                  <div className="user-ticket-child user-ticket-img center">
                    {concert.live ? (
                      <button
                        onClick={() =>
                          navigate("/streaming/" + concert.id, {
                            state: { concert },
                          })
                        }
                        className="btn-singup"
                      >
                        Watch preview
                      </button>
                    ) : (
                      <img src={barcode} alt="Barcode" />
                    )}

                    <p>Ticket No. {concert.ticketid}</p>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </div>
    );
  }
};
