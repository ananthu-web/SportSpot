import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import "../Styles/Banner.css";
import images from "../Data/BannerData";

export default function Banner() {
  

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="hero-section">
      <div
        className="flip-background"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>

      <div className="overlay"></div>

      <Container className="text-center text-light hero-content">
        <h1 className="fw-bold display-4">
          Book Your <span className="text-warning">Sport Court</span> Anytime,
          Anywhere
        </h1>
        <p className="lead mt-3 mb-4">
          Reserve football, badminton, tennis, cricket and more with just one
          click.
        </p>
        <Button
  className="book-btn"
  style={{
    backgroundColor: "#ffc107", // yellow
    border: "none",
    borderRadius: "50px", // pill shape
    color: "#000",
    fontWeight: "700",
    fontSize: "1.2rem", // slightly bigger text
    padding: "0.5rem 1.5rem", // smaller button
    boxShadow: "0 0 10px rgba(255, 193, 7, 0.6)",
    outline: "none"
  }}
  onMouseDown={(e) => e.preventDefault()} // prevents blue focus ring
>
  Book Now
</Button>
      </Container>
    </div>
  );
}
