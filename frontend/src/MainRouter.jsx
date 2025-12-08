import React from "react";
import Homepage from "./Pages/Homepage.jsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import NavigationBar from "./Components/Navbar.jsx";
import SportsPage from "./Pages/SportsPage.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import BookingPage from "./Pages/BookingPage.jsx";
import CourtDetails from "./Pages/CourtDetails.jsx";
import AddCourt from "./Pages/AddCourt.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import EditCourt from "./Pages/EditCourt.jsx";

function MainRouter() {
  return (
    <>
      <NavigationBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sports" element={<SportsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/booking/:sportId" element={<BookingPage />} />
        <Route path="/courtdetails/:sportId" element={<CourtDetails />} />
        <Route
          path="/addcourt"
          element={
            <AdminRoute>
              <AddCourt />
            </AdminRoute>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/edit-court/:courtId"
          element={
              <EditCourt />
          }
        />
      </Routes>
    </>
  );
}

export default MainRouter;
