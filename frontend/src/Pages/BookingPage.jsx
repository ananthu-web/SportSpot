import React, { useState, useEffect } from "react";
import "../Styles/BookingPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function BookingPage() {
  const [locationAllowed, setLocationAllowed] = useState(null);
  const [courts, setCourts] = useState([]);
  const location = useLocation()
  const { sport } = location.state || {}
  const Navigate=useNavigate()
  const [userLocation, setUserLocation] = useState(null);



  // Request location
// Get user location
   const requestLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
       console.log("User Real Location:", pos.coords.latitude, pos.coords.longitude);
      setUserLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
      setLocationAllowed(true);
    },
    () => setLocationAllowed(false)
  );
};



//  DISTANCE CALCULATION FUNCTION
  // -------------------------
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); // km
  };



  // Load nearby courts after allowing location
useEffect(() => {
  if (locationAllowed && userLocation) {
    const fetchCourts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/courts/carddetails");
        const data = await res.json();

        const filtered= data.filter(court=>court.sportType===sport.name)
        .map((court) => ({
              ...court,
              distance:
                getDistance(
                  userLocation.lat,
                  userLocation.lon,
                  court.latitude,
                  court.longitude
                ) + " km",
            }));

        setCourts(filtered);
      } catch (err) {
        console.error("Error fetching courts:", err);
      }
    };

    fetchCourts();
  }
}, [locationAllowed]);



 

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
        {!locationAllowed && (
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
        {locationAllowed && (
          <>
            <h2 className="booking-title">Choose a Nearby Court</h2>
            {courts.length === 0 ? (
              <p className="loading-text">Loading nearby courts...</p>
            ) : (
              <div className="map-and-courts">
                {courts.map((court) => (
                  <div key={court._id} className="court-card">
                    <iframe
                      src={court.map}
                      title={court.name}
                      className="court-map"
                    ></iframe>
                    <h4>{court.name}</h4>
                    <p>{court.distance} away</p>
                    <button
                      className="select-btn"
                      // onClick={() => handleCourtSelect(court)}
                      onClick={()=>Navigate(`/courtdetails/${court._id}`,{state:{court,sport}})}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

       
      </div>
    </div>
  );
}

export default BookingPage;