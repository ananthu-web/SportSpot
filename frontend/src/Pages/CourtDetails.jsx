import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../Styles/CourtDetails.module.css";
import { FaUser, FaRulerCombined, FaBasketballBall, FaLightbulb, FaMoneyBillWave, FaStar } from "react-icons/fa";

function CourtDetails() {
  const location = useLocation();
  const { court, sport } = location.state || {};
  if (!court) return <p>No court selected!</p>;

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
          <div className={styles.infoCard}><FaRulerCombined /> {court.size}</div>
          <div className={styles.infoCard}><FaUser /> {court.playerCount} Players</div>
          <div className={styles.infoCard}><FaBasketballBall /> {court.courtType}</div>
          <div className={styles.infoCard}><FaMoneyBillWave /> ₹{court.bookingCharge}</div>
          <div className={styles.infoCard}><FaLightbulb /> {court.lighting}</div>
          {court.rating && <div className={styles.infoCard}><FaStar /> {court.rating}</div>}
        </div>
      </div>

      {/* Slots */}
      {court.slots?.length > 0 && (
        <div className={styles.courtSection}>
          <h2>Available Slots</h2>
          <div className={styles.horizontalScroll}>
            {court.slots.map((slot, idx) => (
              <div
                key={idx}
                className={`${styles.slotCard} ${slot.isBooked ? styles.booked : styles.available}`}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities & Equipment */}
      <div className={styles.flexSection}>
        {court.amenities?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Amenities</h2>
            <div className={styles.tagGrid}>
              {court.amenities.map((item, idx) => (
                <div key={idx} className={styles.tag}>{item}</div>
              ))}
            </div>
          </div>
        )}
        {court.equipmentAvailable?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Equipment</h2>
            <div className={styles.tagGrid}>
              {court.equipmentAvailable.map((item, idx) => (
                <div key={idx} className={styles.tag}>{item}</div>
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
              <img key={idx} src={photo} alt={`court-${idx}`} className={styles.photoCard}/>
            ))}
          </div>
        </div>
      )}

      {/* Owner & Reviews */}
      <div className={styles.flexSection}>
        {court.owner && (
          <div className={styles.courtSection}>
            <h2>Owner</h2>
            <p><strong>{court.owner.name}</strong></p>
            <p>{court.owner.phone}</p>
            <p>{court.owner.email}</p>
          </div>
        )}
        {court.reviews?.length > 0 && (
          <div className={styles.courtSection}>
            <h2>Reviews</h2>
            <div className={styles.reviewGrid}>
              {court.reviews.map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>"{review}"</div>
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