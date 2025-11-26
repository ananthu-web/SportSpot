import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../Styles/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";

function NavigationBar() {
  const { user, logout } = useContext(UserContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

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
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
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
            <Nav.Link
              as={Link}
              to={"/"}
              className="nav-item"
              onClick={() => {
                scrollToSection("home");
                setExpanded(false);
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              className="nav-item"
              onClick={() => {
                scrollToSection("about"); // your existing scroll function
                setExpanded(false); // closes the hamburger menu
              }}
            >
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/sports" className="nav-item">
              Sports
            </Nav.Link>

            {user?.isAdmin ? (
              // If admin → show Court Details
              <Nav.Link as={Link} to="/ownerpage" className="nav-item">
                Court Details
              </Nav.Link>
            ) : (
              // If normal user → show Contact
              <Nav.Link
                className="nav-item"
                onClick={() => {
                  scrollToSection("contact");
                  setExpanded(false);
                }}
              >
                Contact
              </Nav.Link>
            )}
          </Nav>

          {/* RIGHT SIDE BUTTONS */}
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <>
                {/* User Icon + Welcome */}
                <div className="d-flex align-items-center">
                  <i className="bi bi-person-circle text-light fs-4 me-2"></i>
                  <span className="text-light fw-semibold">
                    Hi, {user.name}
                  </span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className=" custom-btn btn-logout me-3 ms-3"
                >
                  Logout
                </button>

                {/* Dropdown Menu */}
                <NavDropdown
                  title="⋮"
                  id="user-dropdown"
                  align="end"
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item as={Link} to="/help">
                    Help & Support
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              // If not logged in → Show Signin button
              <Link
                to="/login"
                onClick={() => setExpanded(false)}
                className="custom-btn btn-login me-3"
              >
                Signin
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
