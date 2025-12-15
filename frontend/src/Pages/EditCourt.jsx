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
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setCourt({ ...court, [e.target.name]: e.target.value });

  // ---------------- FETCH COURT DATA ----------------
  useEffect(() => {
    if (!user) return;

    const fetchCourt = async () => {
      try {
        const response = await API.get(`/api/admin/court/${courtId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCourt(response.data.court);
        setLoading(false);
      } catch (err) {
        setError("Failed to load court");
        setLoading(false);
      }
    };

    fetchCourt();
  }, [courtId, user]);

  // ---------------- HANDLE FORM SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const mapUrl = `https://www.google.com/maps?q=${court.latitude},${court.longitude}&output=embed`;

      const payload = {
        ...court,
        map: mapUrl,
      };

      await API.put(`/api/admin/updatecourt/${courtId}`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setSuccess("Court updated successfully!");
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update court");
      setTimeout(() => setError(""), 5000);
    }
  };

  // ---------------- AMENITIES ----------------
  const handleAmenitySelect = (item) => {
    const arr = court.amenities;
    if (arr.includes(item)) {
      setCourt({ ...court, amenities: arr.filter((i) => i !== item) });
    } else {
      setCourt({ ...court, amenities: [...arr, item] });
    }
  };

  // ---------------- EQUIPMENT ----------------
  const addEquipment = () => {
    if (equipmentInput && !court.equipmentAvailable.includes(equipmentInput)) {
      setCourt({ ...court, equipmentAvailable: [...court.equipmentAvailable, equipmentInput] });
      setEquipmentInput("");
    }
  };

  const removeEquipment = (index) => {
    setCourt({ ...court, equipmentAvailable: court.equipmentAvailable.filter((_, i) => i !== index) });
  };

  // ---------------- SLOTS ----------------
  const addSlot = () => {
    if (slotTime) {
      setCourt({
        ...court,
        slots: [...court.slots, { time: slotTime, isBooked: false }],
      });
      setSlotTime("");
    }
  };

  const removeSlot = (index) => {
    setCourt({ ...court, slots: court.slots.filter((_, i) => i !== index) });
  };

  // ---------------- PHOTOS ----------------
  const addPhoto = () => {
    if (photoURL) {
      setCourt({ ...court, photos: [...court.photos, photoURL] });
      setPhotoURL("");
    }
  };

  const removePhoto = (index) => {
    setCourt({ ...court, photos: court.photos.filter((_, i) => i !== index) });
  };

  if (loading) return <p>Loading court data...</p>;

  return (
    <div className="auth-page">
      <div className="auth-card horizontal-layout">
        <h2 className="auth-title">
          <span className="text-warning">Edit</span>{" "}
          <span className="court-text">Court</span>
        </h2>
        <form onSubmit={handleSubmit}>
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
              <div
                key={item}
                className={`tag-card ${court.amenities.includes(item) ? "selected" : ""}`}
                onClick={() => handleAmenitySelect(item)}
              >
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
            <button type="button" className="add-btn" onClick={addEquipment}>
              Add
            </button>
          </div>
          <div className="horizontal-scroll">
            {court.equipmentAvailable.map((item, idx) => (
              <div key={idx} className="tag-card">
                {item}{" "}
                <span className="remove-btn" onClick={() => removeEquipment(idx)}>
                  ×
                </span>
              </div>
            ))}
          </div>

          <p className="section-title">Booking Slots:</p>
          <div className="horizontal-input">
            <input
              placeholder="06:00-07:00"
              value={slotTime}
              onChange={(e) => setSlotTime(e.target.value)}
            />
            <button type="button" className="add-btn" onClick={addSlot}>
              Add
            </button>
          </div>
          <div className="horizontal-scroll">
            {court.slots.map((slot, idx) => (
              <div key={idx} className="slot-card">
                {slot.time}{" "}
                <span className="remove-btn" onClick={() => removeSlot(idx)}>
                  ×
                </span>
              </div>
            ))}
          </div>

          <p className="section-title">Photos:</p>
          <div className="horizontal-input">
            <input
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <button type="button" className="add-btn" onClick={addPhoto}>
              Add
            </button>
          </div>
          <div className="horizontal-scroll">
            {court.photos.map((photo, idx) => (
              <div key={idx} className="photo-card-wrapper">
                <img src={photo} alt={`court-${idx}`} className="photo-card" />
                <span className="remove-btn" onClick={() => removePhoto(idx)}>×</span>
              </div>
            ))}
          </div>

          <button type="submit" className="add-btn">
            Update Court
          </button>

          {/* Messages */}
          {error && <p className="auth-error fade">{error}</p>}
          {success && <p className="auth-success fade">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditCourt;