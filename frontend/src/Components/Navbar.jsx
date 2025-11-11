import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../Styles/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";


function NavigationBar() {

  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === "home") {
      if (location.pathname !== "/") {
        navigate("/"); // go to homepage
      }
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    } else {
      if (location.pathname !== "/") {
        navigate(`/?scrollTo=${id}`);
      } else {
        const element = document.getElementById(id);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <Navbar
      expand="lg"
      fixed="top" // fixed at top
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-logo fw-bold">
          <span className="text-warning">Sport</span>
          <span className="text-light">Spot</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto nav-links">
            <Nav.Link as={Link} to={"/"}
              className="nav-item"
              onClick={() => scrollToSection("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              className="nav-item"
              onClick={() => scrollToSection("about")}
            >
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/sports" className="nav-item">
              Sports
            </Nav.Link>
            <Nav.Link
              className="nav-item"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Link to="/login" className="custom-btn btn-login me-3">
              Login
            </Link>
            <Link to="/signup" className="custom-btn btn-signup">
              Signup
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
