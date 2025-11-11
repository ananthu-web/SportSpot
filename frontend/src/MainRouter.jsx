import React from 'react'
import Homepage from './Pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import NavigationBar from './Components/Navbar.jsx'
import SportsPage from './Pages/SportsPage.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'


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

    </Routes>
    
    </>
  )
}

export default MainRouter