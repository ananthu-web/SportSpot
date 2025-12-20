import React, { useEffect, useState, useContext } from "react";
import "../Styles/Mybookings.css";
import { FaCheckCircle } from "react-icons/fa";
import { UserContext } from "../UserContext";
import API from "../API";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await API.get(`/api/user/userbookings/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setBookings(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleView = (booking) => {
    // Navigate to order page with full details
    navigate("/orderpage", { state: booking });
  };

  if (!user)
    return (
      <p className="text-center text-white mt-10">
        Please log in to see your bookings.
      </p>
    );
  if (loading)
    return <p className="text-center text-white mt-10">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (bookings.length === 0)
    return <p className="text-center text-white mt-10">No bookings found.</p>;

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-container">
        <h2 className="my-bookings-title">
          <span className="highlight">My</span> Bookings
        </h2>

        <div className="bookings-scroll">
          {bookings
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // latest first
            .map((booking) => (
              <div className="booking-card" key={booking._id}>
                <div className="booking-header">
                  <FaCheckCircle className="successIcon" />
                  <span>Confirmed</span>
                </div>

                <div className="booking-body">
                  <h4>{booking.courtName}</h4>
                  <p>{booking.location}</p>
                  <p>{booking.slots.join(", ")}</p>
                  <p>
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="price">₹{booking.amount}</p>
                </div>

                <button
                  className="view-btn"
                  onClick={() => handleView(booking)}
                >
                  View
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
