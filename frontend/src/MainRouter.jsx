import React from 'react'
import Homepage from './Pages/Homepage'
import { Route, Router, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import NavigationBar from './Components/Navbar.jsx'
import SportsPage from './Pages/SportsPage.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
import BookingPage from './Pages/BookingPage.jsx'
import CourtDetails from './Pages/CourtDetails.jsx'
import OwnerPage from './Pages/OwnerPage.jsx'


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
        <Route path='/courtdetails/:sportId' element={<CourtDetails/>}/>
        <Route path='/ownerpage' element={<OwnerPage/>}/>

    </Routes>
    
    </>
  )
}

export default MainRouter