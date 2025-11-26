import React, { useContext, useState } from "react";
import API from "../API";
import { UserContext } from "../UserContext";
import "../Styles/Auth.css"; // reuse auth styles
import "../Styles/CourtForm.css"; // custom styles

function OwnerPage() {
  const { user } = useContext(UserContext);

  const [court, setCourt] = useState({
    name: "", sportType: "", location: "", latitude: "", longitude: "", map: "",
    size: "", playerCount: "", courtType: "", bookingCharge: "", lighting: "",
    photos: [], amenities: [], equipmentAvailable: [], slots: [], maxBookingHours: 2
  });

  const [slotTime, setSlotTime] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setCourt({ ...court, [e.target.name]: e.target.value });

  const handleMultiSelect = (field, value) => {
    const arr = court[field];
    if (arr.includes(value)) {
      setCourt({ ...court, [field]: arr.filter((item) => item !== value) });
    } else {
      setCourt({ ...court, [field]: [...arr, value] });
    }
  };

  const addSlot = () => {
    if (slotTime) {
      setCourt({ ...court, slots: [...court.slots, { time: slotTime, isBooked: false }] });
      setSlotTime("");
    }
  };

  const removeSlot = (index) => setCourt({ ...court, slots: court.slots.filter((_, i) => i !== index) });

  const addPhoto = () => {
    if (photoURL) {
      setCourt({ ...court, photos: [...court.photos, photoURL] });
      setPhotoURL("");
    }
  };

  const removePhoto = (index) => setCourt({ ...court, photos: court.photos.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...court, owner: { name: user.name, email: user.email, phone: user.phone } };
      await API.post("/api/courts", payload);
      alert("Court added successfully!");
      setCourt({
        name: "", sportType: "", location: "", latitude: "", longitude: "", map: "",
        size: "", playerCount: "", courtType: "", bookingCharge: "", lighting: "",
        photos: [], amenities: [], equipmentAvailable: [], slots: [], maxBookingHours: 2
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card horizontal-layout">
<h2 className="auth-title">
  <span className="text-warning">Add</span> <span className="court-text">Court</span>
</h2>
        <form onSubmit={handleSubmit}>
          {/* Court Info Inputs */}
          <div className="grid-container">
            {["name","sportType","location","latitude","longitude","map","size","playerCount","courtType","bookingCharge","lighting","maxBookingHours"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g," $1")}
                value={court[field]}
                onChange={handleChange}
              />
            ))}
          </div>

          {/* Amenities */}
          <p className="section-title">Amenities:</p>
          <div className="tag-grid">
            {["Changing Rooms", "Parking", "Seating"].map((item) => (
              <div
                key={item}
                className={`tag-card ${court.amenities.includes(item) ? "selected" : ""}`}
                onClick={() => handleMultiSelect("amenities", item)}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Equipment */}
          <p className="section-title">Equipment:</p>
          <div className="tag-grid">
            {["Football", "Goals", "Corner Flags"].map((item) => (
              <div
                key={item}
                className={`tag-card ${court.equipmentAvailable.includes(item) ? "selected" : ""}`}
                onClick={() => handleMultiSelect("equipmentAvailable", item)}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Booking Slots */}
          <p className="section-title">Booking Slots:</p>
          <div className="horizontal-input">
            <input placeholder="06:00-07:00" value={slotTime} onChange={(e) => setSlotTime(e.target.value)} />
            <button type="button" onClick={addSlot} className="add-btn">Add</button>
          </div>
          <div className="horizontal-scroll">
            {court.slots.map((slot, idx) => (
              <div key={idx} className="slot-card">
                {slot.time} <span className="remove-btn" onClick={() => removeSlot(idx)}>×</span>
              </div>
            ))}
          </div>

          {/* Photos */}
          <p className="section-title">Photos:</p>
          <div className="horizontal-input">
            <input placeholder="Photo URL" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
            <button type="button" onClick={addPhoto} className="add-btn">Add</button>
          </div>
          <div className="horizontal-scroll">
            {court.photos.map((photo, idx) => (
              <div key={idx} className="photo-card-wrapper">
                <img src={photo} alt={`court-${idx}`} className="photo-card" />
                <span className="remove-btn" onClick={() => removePhoto(idx)}>×</span>
              </div>
            ))}
          </div>

          <button type="submit" className="add-btn">Add Court</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default OwnerPage;