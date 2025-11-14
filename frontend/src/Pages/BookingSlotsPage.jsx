import React, { useState } from "react";
import "../Styles/BookingSlotsPage.css";

export default function BookingSlotsPage() {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = [
    "7:00 AM - 8:00 AM",
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
    "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM",
  ];

  // Example of booked slots
  const bookedSlots = ["8:00 AM - 9:00 AM", "6:00 PM - 7:00 PM"];

  const handleSlotClick = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
    }
  };

  const handleConfirm = () => {
    alert(`✅ You booked the ${selectedSlot} slot successfully!`);
  };

  return (
    <div className="booking-slots-page">
      <div className="slots-container">
        <h1 className="slots-title">Choose Your Time Slot</h1>
        <p className="slots-subtitle">Select your preferred time for the match ⚽</p>

        <div className="slots-grid">
          {timeSlots.map((slot, i) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedSlot === slot;

            return (
              <div
                key={i}
                className={`slot-card 
                  ${isBooked ? "booked" : ""}
                  ${isSelected ? "selected" : ""}`}
                onClick={() => handleSlotClick(slot)}
              >
                <span>{slot}</span>
                {isBooked && <i className="fas fa-lock lock-icon"></i>}
              </div>
            );
          })}
        </div>

        {selectedSlot && (
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}