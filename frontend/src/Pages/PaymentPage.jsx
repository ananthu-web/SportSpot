import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/Payment.css"; // optional for extra styling

export default function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: 50000, // ₹500 in paise
      currency: "INR",
      name: "SportSpot",
      description: "Slot Booking Payment",
      handler: function (response) {
        navigate(`/booking-confirmation/${bookingId}`);
      },
      theme: { color: "#ffc107" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-page d-flex align-items-center justify-content-center">
      <Container className="text-center">
        <Card className="payment-card shadow-lg p-4">
          <h2 className="text-warning mb-3">Complete Your Payment</h2>
          <p className="lead mb-4">
            Booking ID: <span className="text-light">{bookingId}</span>
          </p>
          <p className="mb-4 text-light">
            Pay securely to confirm your sport slot. You can use UPI, net banking, cards or wallets.
          </p>
          <Button
            variant="warning"
            className="pay-btn"
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </Card>
      </Container>
    </div>
  );
}