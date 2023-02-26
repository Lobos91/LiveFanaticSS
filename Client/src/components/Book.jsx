import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import BookBtn from "./BookBtn";
import { InfoComponent } from "./InfoComponent";

export const Book = () => {
  const [tickets, setTickets] = useState([]);
  const { state } = useLocation();
  let concert;
  if (state) {
    concert = state.concert;
  }

  const { auth } = useContext(GlobalContext);

  const [count, setCount] = useState(0);
  const [postArray, setPostArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let ticketsTemp = [];
    const loadTickets = async () => {
      const response = await axios.get("/data/tickets");

      if (concert) {
        response.data.forEach((ticket) => {
          if (concert.id == ticket.concertid && ticket.booked == 0) {
            ticketsTemp.push(ticket);
          }
        });
      }

      setTickets(ticketsTemp);
    };
    loadTickets();
  }, []);

  // Adding and subtracking amount of tickets selected by user to new OnPost array
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

  if (!auth.loggedIn) {
    return <InfoComponent />;
  } else {
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
                    : "Available tickets: " + tickets.length}
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
                  <h4>Price: Free!</h4>
                </div>

                {count > 0 ? (
                  <button onClick={() => onPostFunc()} className="btn-singup">
                    Buy tickets
                  </button>
                ) : (
                  <BookBtn color="gray" text="No ticket selected" />
                )}
              </div>
              <div className="flex-child ">
                <h2>Event Info</h2>
                {!concert.live ? (
                  <div>
                    <h4>Location: {concert.venue}</h4>
                    <h4>When: {concert.datum}</h4>
                    <h4>Time: {concert.time}</h4>
                    <h4>
                      Gates open: {concert.hour - 1}:{concert.minute}
                    </h4>
                  </div>
                ) : (
                  <div>
                    <h3>
                      This is online concert. After purchasing the ticket, the
                      concert will be available in user panel.
                    </h3>
                    <h4>
                      You can stream preview of this concert directly after
                      purchasing the ticket.
                    </h4>
                  </div>
                )}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
};
