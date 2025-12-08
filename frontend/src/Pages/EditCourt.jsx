import React, { useContext, useEffect, useState } from "react";
import "../Styles/EditCourt.css";
import API from "../API";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function EditCourt() {
  const { courtId } = useParams();
  const { user } = useContext(UserContext);

  const [court, setCourt] = useState({
    name: "",
    sportType: "",
    location: "",
    latitude: "",
    longitude: "",
    size: "",
    playerCount: "",
    courtType: "",
    bookingCharge: "",
    lighting: "",
    photos: [],
    amenities: [],
    equipmentAvailable: [],
    slots: [],
    maxBookingHours: 2,
  });

  const [slotTime, setSlotTime] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [equipmentInput, setEquipmentInput] = useState("");
  const [admincourt, setAdmincourts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) =>
    setCourt({ ...court, [e.target.name]: e.target.value });

  // ---------------- FETCH COURT DATA HERE ----------------
  useEffect(() => {
    if (!user) return; // wait for user to be loaded

    const fetchCourt = async () => {
              console.log(courtId,user.token);

      try {
        
        const response = await API.get(`api/admin/court/${courtId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourt(response.data.court);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching court:", err);
      }
    };

    fetchCourt();
  }, [courtId, user]);

  if (loading) return <p>Loading court data...</p>;

  return (
    <div className="auth-page">
      <div className="auth-card horizontal-layout">
        <h2 className="auth-title">
          <span className="text-warning">Edit</span>{" "}
          <span className="court-text">Court</span>
        </h2>
        <form>
          <div className="grid-container">
            {[
              "name",
              "sportType",
              "location",
              "latitude",
              "longitude",
              "size",
              "playerCount",
              "courtType",
              "bookingCharge",
              "lighting",
              "maxBookingHours",
            ].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace(/([A-Z])/g, " $1")
                }
                value={court[field]}
                onChange={handleChange}
              />
            ))}
          </div>

          <p className="section-title">Amenities:</p>
          <div className="tag-grid">
            {["Changing Rooms", "Parking", "Seating"].map((item) => (
              <div key={item} className="tag-card">
                {item}
              </div>
            ))}
          </div>

          <p className="section-title">Equipment:</p>
          <div className="horizontal-input">
            <input
              placeholder="Type equipment"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
            />
            <button type="button" className="add-btn">
              Add
            </button>
          </div>

          <div className="horizontal-scroll">
            {court.equipmentAvailable.map((item, idx) => (
              <div key={idx} className="tag-card">
                {item}
              </div>
            ))}
          </div>

          <p className="section-title">Booking Slots:</p>
          <div className="horizontal-input">
            <input placeholder="06:00-07:00" value={slotTime} readOnly />
            <button type="button" className="add-btn">
              Add
            </button>
          </div>

          <div className="horizontal-scroll">
            {court.slots.map((slot, idx) => (
              <div key={idx} className="slot-card">
                {slot.time}
              </div>
            ))}
          </div>

          <p className="section-title">Photos:</p>
          <div className="horizontal-input">
            <input placeholder="Photo URL" value={photoURL} readOnly />
            <button type="button" className="add-btn">
              Add
            </button>
          </div>
          <div className="horizontal-scroll">
            {court.photos.map((photo, idx) => (
              <div key={idx} className="photo-card-wrapper">
                <img src={photo} alt={`court-${idx}`} className="photo-card" />
              </div>
            ))}
          </div>

          <button type="submit" className="add-btn">
            Update Court
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCourt;
