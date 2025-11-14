import React, { useState, useEffect } from "react";
import "../Styles/NearbyCourts.css";

export default function NearbyCourts({ onSelectCourt }) {
  const [location, setLocation] = useState(null);
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          console.log(err);
          alert("Please enable location access to find nearby courts.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // Simulate fetching nearby courts (replace with API later)
  useEffect(() => {
    if (location) {
      setTimeout(() => {
        setCourts([
          {
            id: 1,
            name: "Green Turf Stadium",
            distance: "0.8 km",
            image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
          },
          {
            id: 2,
            name: "Elite Sports Arena",
            distance: "1.5 km",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
          },
          {
            id: 3,
            name: "Blue Grass Court",
            distance: "2.1 km",
            image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
          },
        ]);
        setLoading(false);
      }, 1200);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="nearby-loader">
        <p>🔍 Detecting nearby courts...</p>
      </div>
    );
  }

  return (
    <div className="nearby-page">
      <h2 className="nearby-title">🏟️ Nearby Sports Courts</h2>
      <p className="nearby-subtitle">
        Choose a court near you to check available time slots.
      </p>

      <div className="courts-grid">
        {courts.map((court) => (
          <div key={court.id} className="court-card">
            <img src={court.image} alt={court.name} className="court-img" />
            <h4>{court.name}</h4>
            <p>{court.distance} away</p>
            <button
              className="select-btn"
              onClick={() => onSelectCourt(court)}
            >
              Select Court
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}