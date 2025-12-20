import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/CourtDetails.module.css";
import {
  FaUser,
  FaRulerCombined,
  FaBasketballBall,
  FaLightbulb,
  FaMoneyBillWave,
  FaStar,
} from "react-icons/fa";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import API from "../API";

function CourtDetails() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { court, sport } = location.state || {};
  const [selectedSlots, setSelectedSlots] = useState([]);

  if (!court) return <p>No court selected!</p>;

  // Toggle slot selection
  const handleSlotClick = (slot) => {
    if (slot.isBooked) return;

    if (selectedSlots.some((s) => s.time === slot.time)) {
      // deselect
      setSelectedSlots(selectedSlots.filter((s) => s.time !== slot.time));
    } else {
      // select
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleConfirm = () => {
    if (selectedSlots.length === 0) return;

    const isConfirmed = window.confirm(
      `Do you want to book the slot(s) at ${selectedSlots
        .map((s) => (typeof s.time === "string" ? s.time : s.time.time))
        .join(", ")}?`
    );

    if (isConfirmed) {
      openRazorpayPayment();
    } else {
      console.log("User cancelled the booking");
    }
  };

  // Add this inside CourtDetails.jsx, before openRazorpayPayment
  const normalizeSlotTime = (time) => {
    if (!time) return "";
    // Replace "to" with "-" but keep everything else (including AM/PM)
    return time.replace(/\s*to\s*/i, "-").trim();
  };

  // Razorpay payment
  const openRazorpayPayment = () => {
    if (!user) {
      alert("User not loaded yet");
      return;
    }

    const amount = court.bookingCharge * selectedSlots.length;
    const slotDuration = 1; // 1 hour per slot
    const totalDuration = slotDuration * selectedSlots.length;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "SportSpot",
      description: `Booking slots ${selectedSlots
        .map((s) => s.time)
        .join(", ")}`,

      handler: async function (response) {
        try {
          alert("Payment Successful!");

          // Convert slot times to Date objects
          const bookingDate = new Date();
          bookingDate.setHours(0, 0, 0, 0);

          // const startTimes = selectedSlots.map((slot) => {
          //   const [startHourStr] = slot.time.time.split(" to ");
          //   const startHour = Number(startHourStr);
          //   const d = new Date(bookingDate);
          //   d.setHours(startHour, 0, 0, 0);
          //   return d;
          // });
          const startTimes = selectedSlots.map((slot) => {
            const slotTime =
              typeof slot.time === "string" ? slot.time : slot.time.time || "";
            const normalized = normalizeSlotTime(slotTime);
            const [startStr] = normalized.split("-");
            if (!startStr) return new Date();

            // Parse using AM/PM
            return new Date(`${bookingDate.toDateString()} ${startStr}`);
          });

          const startTime = new Date(Math.min(...startTimes));
          const endTime = new Date(
            startTime.getTime() + selectedSlots.length * 60 * 60 * 1000
          );

          const bookingData = {
            userId: user.id,
            courtId: court._id,
            date: bookingDate,
            slots: selectedSlots.map((s) =>
              typeof s.time === "string" ? s.time : s.time.time
            ),
            startTime,
            endTime,
            amount: amount,
            paymentId: response.razorpay_payment_id,
            status: "paid",
            courtName: court.name,
            location: court.location,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone || "",
            paymentMethod: "Online",
            instructions: "Arrive 10 mins early",
            duration: selectedSlots.length,
            maxPlayers: court.playerCount,
          };

          // POST to backend
          const res = await API.post("/api/user/booking", bookingData, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          // Navigate AFTER successful save
          navigate("/orderpage", {
            state: {
              ...res.data.booking,
            },
          });
        } catch (err) {
          console.error(err);
          alert("Booking failed. Please contact support.");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone || "",
      },
      theme: { color: "#f9a825" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div
      className={styles.courtDetailsPage}
      style={{ backgroundImage: sport?.image ? `url(${sport.image})` : "" }}
    >
      {/* Title */}
      <h1 className={styles.courtDetailsTitle}>{court.name}</h1>
      <p className={styles.courtDetailsSubtitle}>
        {court.sportType} • {court.location} • {court.distance || ""}
      </p>

      {/* Court Info Grid */}
      <div className={styles.courtSection}>
        <h2>Court Info</h2>
        <div className={styles.courtInfoGrid}>
          <div className={styles.infoCard}>
            <FaRulerCombined /> {court.size}
          </div>
          <div className={styles.infoCard}>
            <FaUser /> {court.playerCount} Players
          </div>
          <div className={styles.infoCard}>
            <FaBasketballBall /> {court.courtType}
          </div>
          <div className={styles.infoCard}>
            <FaMoneyBillWave /> ₹{court.bookingCharge}
          </div>
          <div className={styles.infoCard}>
            <FaLightbulb /> {court.lighting}
          </div>
          {court.rating && (
            <div className={styles.infoCard}>
              <FaStar /> {court.rating}
            </div>
          )}
        </div>
      </div>

      {court.slots?.length > 0 && (
        <div className={styles.courtSection}>
          <h2>Available Slots</h2>

          <div className={styles.horizontalScroll}>
            {court.slots.map((slot, idx) => {
              // Determine display text
              // let displayTime = "";
              // if (typeof slot.time === "string") {
              //   displayTime = slot.time;
              // } else if (slot.time && slot.time.time) {
              //   displayTime = slot.time.time; // <-- use nested time
              // } else {
              //   displayTime = "N/A";
              // }
              let displayTime = "";
              if (typeof slot.time === "string") {
                displayTime = normalizeSlotTime(slot.time);
              } else if (slot.time && slot.time.time) {
                displayTime = normalizeSlotTime(slot.time.time);
              } else {
                displayTime = "N/A";
              }

              // Determine booked status safely
              const isBooked =
                slot.isBooked || (slot.time && slot.time.isBooked);

              return (
                <div
                  key={(slot.time && slot.time._id) || `slot-${idx}`}
                  className={`${styles.slotCard} ${
                    isBooked
                      ? styles.booked
                      : selectedSlots.some(
                          (s) =>
                            (typeof s.time === "string"
                              ? s.time
                              : s.time.time) === displayTime
                        )
                      ? styles.selected
                      : styles.available
                  }`}
                  onClick={() => {
                    if (!isBooked) handleSlotClick(slot);
                  }}
                  style={{ cursor: isBooked ? "not-allowed" : "pointer" }}
                >
                  {displayTime}
                </div>
              );
            })}
          </div>

          {/* ⭐ Confirm button appears here, below the scroll */}
          {selectedSlots.length > 0 && (
            <div className={styles.confirmWrapper}>
              <button className={styles.confirmBtn} onClick={handleConfirm}>
                Confirm{" "}
                {selectedSlots
                  .map((s) =>
                    typeof s.time === "string" ? s.time : s.time.time
                  )
                  .join(", ")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Amenities & Equipment */}
      <div className={styles.flexSection}>
        {court.amenities?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Amenities</h2>
            <div className={styles.tagGrid}>
              {court.amenities.map((item, idx) => (
                <div key={idx} className={styles.tag}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
        {court.equipmentAvailable?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Equipment</h2>
            <div className={styles.tagGrid}>
              {court.equipmentAvailable.map((item, idx) => (
                <div key={idx} className={styles.tag}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photos */}
      {court.photos?.length > 0 && (
        <div className={styles.courtSection}>
          <h2>Photos</h2>
          <div className={styles.horizontalScroll}>
            {court.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`court-${idx}`}
                className={styles.photoCard}
              />
            ))}
          </div>
        </div>
      )}

      {/* Owner & Reviews */}
      <div className={styles.flexSection}>
        {court.owner && (
          <div className={styles.courtSection}>
            <h2>Owner</h2>
            <p>
              <strong>{court.owner.name}</strong>
            </p>
            <p>{court.owner.phone}</p>
            <p>{court.owner.email}</p>
          </div>
        )}
        {court.reviews?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Reviews</h2>
            <div className={styles.reviewGrid}>
              {court.reviews.map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  "{review}"
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      {court.map && (
        <div className={styles.courtSection}>
          <h2>Location</h2>
          <iframe
            src={court.map}
            className={styles.mapCard}
            allowFullScreen
            loading="lazy"
            title="Court Location"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default CourtDetails;
