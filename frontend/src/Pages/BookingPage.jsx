import React, { useState, useEffect } from "react";
import "../Styles/BookingPage.css";
import { useLocation } from "react-router-dom";

function BookingPage() {
  const [locationAllowed, setLocationAllowed] = useState(null);
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const location = useLocation()
  const { sport } = location.state || {}

  // Request location
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      () => setLocationAllowed(true),
      () => setLocationAllowed(false)
    );
  };

  // Load nearby courts after allowing location
  useEffect(() => {
    if (locationAllowed) {
      setTimeout(() => {
        setCourts([
          // { id: 1, name: "City Sports Arena", distance: "2.3 km", map: "https://maps.google.com?q=City+Sports+Arena&output=embed" },
          // { id: 2, name: "Elite Turf Ground", distance: "4.8 km", map: "https://maps.google.com?q=Elite+Turf+Ground&output=embed" },
          // { id: 3, name: "Golden Field Court", distance: "7.1 km", map: "https://maps.google.com?q=Golden+Field+Court&output=embed" },
          { id: 1, name: "City Sports Arena", distance: "2.3 km", map: "https://maps.google.com?q=City+Sports+Arena&output=embed" },
          { id: 2, name: "Elite Turf Ground", distance: "4.8 km", map: "https://maps.google.com?q=Elite+Turf+Ground&output=embed" },
          { id: 3, name: "Golden Field Court", distance: "7.1 km", map: "https://maps.google.com?q=Golden+Field+Court&output=embed" },
          { id: 4, name: "Sunshine Sports Complex", distance: "3.2 km", map: "https://maps.google.com?q=Sunshine+Sports+Complex&output=embed" },
          { id: 5, name: "Downtown Stadium", distance: "5.6 km", map: "https://maps.google.com?q=Downtown+Stadium&output=embed" },
        ]);
      }, 1000);
    }
  }, [locationAllowed]);

  // Load slots when a court is selected
  useEffect(() => {
    if (selectedCourt) {
      setSlots([
        { time: "5:00 AM - 6:00 AM", booked: false },
        { time: "6:00 AM - 7:00 AM", booked: false },
        { time: "7:00 AM - 8:00 AM", booked: true },
        { time: "8:00 AM - 9:00 AM", booked: true },
        { time: "9:00 AM - 10:00 AM", booked: false },
        { time: "10:00 AM - 11:00 AM", booked: false },
        { time: "11:00 AM - 12:00 PM", booked: false },
        { time: "4:00 PM - 5:00 PM", booked: false },
        { time: "5:00 PM - 6:00 PM", booked: true },
        { time: "6:00 PM - 7:00 PM", booked: false },
        { time: "7:00 PM - 8:00 PM", booked: true },
        { time: "8:00 PM - 9:00 PM", booked: false },
        { time: "9:00 PM - 10:00 PM", booked: false },
        { time: "10:00 PM - 11:00 PM", booked: true },
        { time: "11:00 PM - 12:00 AM", booked: false },


      ]);
    }
  }, [selectedCourt]);

  const handleCourtSelect = (court) => {
    setSelectedCourt(court);
  };

  const confirmBooking = () => {
    alert(`You booked ${selectedSlot} at ${selectedCourt.name}`);
  };

  return (
    <div className="booking-page" style={{
      backgroundImage: sport ? `url(${sport.image})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <div className="booking-container">
        {/* Request Location */}
        {!locationAllowed && !selectedCourt && (
          <>
            <h2 className="booking-title">Find Nearby Courts</h2>
            <p className="booking-subtitle">
              We need access to your location to show courts near you.
            </p>
            <button className="booking-btn" onClick={requestLocation}>
              Allow Location Access
            </button>
            {locationAllowed === false && (
              <p className="error-text">
                ❌ Location access denied. Please enable it in your browser settings.
              </p>
            )}
          </>
        )}

        {/* Show Courts */}
        {locationAllowed && !selectedCourt && (
          <>
            <h2 className="booking-title">Choose a Nearby Court</h2>
            {courts.length === 0 ? (
              <p className="loading-text">Loading nearby courts...</p>
            ) : (
              <div className="map-and-courts">
                {courts.map((court) => (
                  <div key={court.id} className="court-card">
                    <iframe
                      src={court.map}
                      title={court.name}
                      className="court-map"
                    ></iframe>
                    <h4>{court.name}</h4>
                    <p>{court.distance} away</p>
                    <button
                      className="select-btn"
                      onClick={() => handleCourtSelect(court)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Show Slots */}
        {selectedCourt && (
          <>
            <h2 className="booking-title">Available Slots at {selectedCourt.name}</h2>
            <div className="slots-grid">
              {slots.map((slot, idx) => (
                <div
                  key={idx}
                  className={`slot-card ${slot.booked ? "booked" : "available"} ${selectedSlot === slot.time ? "selected" : ""
                    }`}
                  onClick={() => !slot.booked && setSelectedSlot(slot.time)}
                >
                  {slot.time}
                </div>
              ))}
            </div>
            {selectedSlot && (
              <button className="booking-btn confirm" onClick={confirmBooking}>
                Confirm Booking for {selectedSlot}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BookingPage;