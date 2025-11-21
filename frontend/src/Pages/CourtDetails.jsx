import React from "react";
import "../Styles/CourtDetails.css";

function CourtDetails() {
  return (
    <div className="court-details-page">
      <div className="court-details-container">

        <h1 className="court-details-title">Downtown Basketball Court</h1>
        <p className="court-details-subtitle">
          Basketball • Downtown, City Center
        </p>

        {/* INFO GRID */}
        <div className="court-section">
          <h2>Court Information</h2>
          <div className="court-info-grid">
            <div>Size: 28x15 m</div>
            <div>Players: 10</div>
            <div>Court Type: Indoor, Hardwood</div>
            <div>Booking Charge: ₹500</div>
            <div>Lighting: Floodlights</div>
            <div>Max Booking Hours: 2</div>
          </div>
        </div>

        {/* AMENITIES */}
        <div className="court-section">
          <h2>Amenities</h2>
          <ul>
            <li>Changing Rooms</li>
            <li>Parking</li>
            <li>Seating</li>
          </ul>
        </div>

        {/* EQUIPMENT */}
        <div className="court-section">
          <h2>Equipment Available</h2>
          <ul>
            <li>Basketballs</li>
            <li>Scoreboard</li>
          </ul>
        </div>

        {/* PHOTOS */}
        <div className="court-section">
          <h2>Photos</h2>
          <div className="court-photos-grid">
            <img src="https://example.com/photos/basketball1.jpg" alt="court1"/>
            <img src="https://example.com/photos/basketball2.jpg" alt="court2"/>
            <img src="https://example.com/photos/basketball3.jpg" alt="court3"/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourtDetails;