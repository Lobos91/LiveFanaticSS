import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const Book = () => {
  const [tickets, setTickets] = useState([]);
  const { state } = useLocation();
  const concert = state.concert;

  useEffect(() => {
    let ticketsTemp = [];
    const loadTickets = async () => {
      const response = await axios.get("/data/tickets");

      response.data.forEach((ticket) => {
        if (concert.id == ticket.concertid && ticket.booked == 0) {
          ticketsTemp.push(ticket);
        }
      });
      setTickets(ticketsTemp);
    };
    loadTickets();
  }, []);

  console.log(concert);
  console.log(tickets);

  return (
    <div>
      Booking page
      <h1>{concert.name}</h1>
      {/* <h2>{state}</h2> */}
    </div>
  );
};
