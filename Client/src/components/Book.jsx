import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import BookBtn from "./BookBtn";

export const Book = () => {
  const [tickets, setTickets] = useState([]);
  const { state } = useLocation();
  const { auth } = useContext(GlobalContext);
  const concert = state.concert;
  const [count, setCount] = useState(0);
  const [postArray, setPostArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let ticketsTemp = [];
    const loadTickets = async () => {
      const response = await axios.get("/data/tickets");

      response.data.forEach((ticket) => {
        if (concert.id == ticket.concertid && ticket.booked == 0) {
          ticketsTemp.push(ticket); //zamiast ticketsTemp
        }
      });
      setTickets(ticketsTemp); //zamiast ticketsTemp
    };
    loadTickets();
  }, []);

  // Adding amount of tickets selected by user to new OnPost array
  const add = () => {
    setCount(count + 1);

    for (let i = 0; i < count + 1; i++) {
      if (!postArray[i]) {
        postArray.push(tickets[i]);
        setPostArray(postArray);
      }
    }
  };

  const sub = () => {
    setCount(count - 1);

    for (let i = 0; i < count + 1; i++) {
      if (!postArray[i]) {
        postArray.pop(tickets[i]);
        setPostArray(postArray);
      }
    }
  };

  // const postArray = [
  //   {ticketid: 1, userid: null, concertid: 1, booked: 0},
  //   {ticketid: 3, userid: null, concertid: 1, booked: 0},

  const onPostFunc = () => {
    for (let i = 0; i < postArray.length; i++) {
      postArray[i].booked = 1;
      postArray[i].userid = auth.id;
    }

    axios
      .put("data/tickets", postArray, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      });

    navigate("/user");
  };

  return (
    <div>
      <div className="flex-container  ">
        <div className="flex-child flex-item center">
          <img
            src={concert?.image ? concert.image : defaultpicture}
            alt="Band-Image"
            className="imgBooking "
          />
        </div>

        <div className="flex-child center flex1">
          <h1 className="textpink">{concert.name}</h1>
          <hr />

          <div className="flex-container">
            <div className="flex-child ">
              <p>
                {!tickets.length
                  ? "Out of stock"
                  : "Available Tickets: " + tickets.length}
              </p>
              <div>
                {/* Counter plus  */}
                <button
                  disabled={count >= tickets.length}
                  className="btn"
                  onClick={() => add()}
                >
                  &#65291;
                </button>

                <button
                  disabled={count === 0}
                  className="btn"
                  onClick={() => sub()}
                >
                  &#65293;
                </button>
                <h4>Selected: {count}</h4>
              </div>

              {count > 0 ? (
                <button onClick={() => onPostFunc()} className="btn-singup">
                  Buy tickets
                </button>
              ) : (
                <BookBtn color="gray" text="Chose number of tickets" />
              )}
            </div>
            <div className="flex-child ">
              <h2>Event Info</h2>
              <h4>Location: {concert.venue}</h4>
              <h4>When: {concert.datum}</h4>
              <h4>Time: {concert.time}</h4>
              <h4>
                Gates open: {concert.hour - 1}:{concert.minute}
              </h4>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
