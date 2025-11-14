import React from "react";
import "../Styles/SportsPage.css";
import SportsData from "../Data/SportsData";
import { Link } from "react-router-dom";


function SportsPage() {
  return (
    <section className="sports-page">
      <div className="sports-header">
        <h1>Our Sports</h1>
        <p>Choose your favorite sport and book your courts easily!</p>
      </div>

      <div className="sports-cards">
        {SportsData.map((sport, index) => (
          <div key={index} className="sport-card">
            <div className="sport-image">
              <img src={sport.image} alt={sport.name} />
            </div>
            <div className="sport-info">
              <h2>{sport.name}</h2>
              <p>{sport.description}</p>

               <Link to={`/booking/${sport.id}`} className="book-link">
                <button className="book-btn">Book Now</button>
              </Link>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SportsPage;