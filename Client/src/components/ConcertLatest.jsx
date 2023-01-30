import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const ConcertLatest = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    const loadConcerts = async () => {
      const response = await axios.get("/data/concerts");
      const rawData = response.data;
      const filteredData = rawData.filter((concert) => {
        //let date = new Date(concert.datum);
        // let newestDate = new Date("2022-09-29");
        return concert.datum >= "2022-09-30";
      });

      const slicedConcerts = filteredData.slice(0, 20);
      //console.log(result);
      setConcerts(slicedConcerts);
    };

    loadConcerts();
  }, []);

  if (!concerts.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="cardHeader">Newest concerts </h1>

      {concerts.map((concert) => {
        return (
          <section className="cards-container">
            <div className="card">
              <h1>{concert.name}</h1>
              <img src={concert.image} />
              <p className="label">
                {concert.datum} at {concert.venue}
              </p>
              <a href="#">Book a ticket</a>
            </div>
          </section>
        );
      })}
    </div>
  );
};
