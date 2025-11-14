import React from 'react'
import Homepage from './Pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import NavigationBar from './Components/Navbar.jsx'
import SportsPage from './Pages/SportsPage.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
import BookingPage from './Pages/BookingPage.jsx'
import BookingSlotsPage from './Pages/BookingSlotsPage.jsx'


function MainRouter() {
  return (
    <>
    <NavigationBar/>
    <ScrollToTop/>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/sports' element={<SportsPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='signup' element={<SignupPage/>}/>
        <Route path="/booking/:sportId" element={<BookingPage />} />
        <Route path="/booking-slots" element={<BookingSlotsPage/>}/>

    </Routes>
    
    </>
  )
}

export default MainRouter