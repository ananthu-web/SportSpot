import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/OrderPage.css";
import { FaCheckCircle, FaMapMarkerAlt, FaClock, FaRupeeSign, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import QRCode from "react-qr-code";

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state

  const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
console.log("helooo:",order);

  

  return (
    <div className="page">
      <div className="ticket">
        {/* Header */}
        <div className="header">
          <FaCheckCircle className="successIcon" />
          <h1>Booking Confirmed</h1>
          <p>Your slot has been successfully booked</p>
        </div>

        {/* Top Row: Court & Amount */}
        <div className="top-row">
          <div className="court-info">
            <h2>{order.courtName}</h2>
            <p><FaMapMarkerAlt className="icon" /> {order.location}</p>
            <p>Type: {order.courtType}</p>
            <p>Max Players: {order.maxPlayers}</p>


          </div>
          <div className="amount-info">
            <p><FaRupeeSign className="icon" /> Amount: ₹{order.amount}</p>
            <p>Payment: {order.paymentMethod}</p>
            <p>Booking ID: {order._id}</p>
            <p>Slot: {order.slots.join(", ")}</p>
            <p>Date: {formatDate(order.date)}</p>
          </div>
        </div>

        {/* Details Row: User Info */}
        <div className="details-row">
          <div className="detail-card">
            <h3><FaUser className="icon" /> Name</h3>
            <p>{order.userName}</p>
          </div>
          <div className="detail-card">
            <h3><FaEnvelope className="icon" /> Email</h3>
            <p>{order.userEmail}</p>
          </div>
          <div className="detail-card">
            <h3><FaPhone className="icon" /> Phone</h3>
            <p>{order.userPhone}</p>
          </div>
          <div className="detail-card">
            <h3>Duration</h3>
            {order.duration} hr{order.duration > 1 ? "s" : ""}
          </div>
        </div>

        {/* Bottom Row: Instructions & QR */}
        <div className="bottom-row">
          <div className="instructions">
            <h3>Instructions</h3>
            <p>{order.instructions}</p>
          </div>
          <div className="qr-section">
            <QRCode value={order._id} size={100} />
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;