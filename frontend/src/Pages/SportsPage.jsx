import "../Styles/SportsPage.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";


function SportsPage() {

  const {user}=useContext(UserContext)
  const Navigate=useNavigate()
  const [SportsData,setSportsData]=useState([])

  useEffect(()=>{
    const loadsports=async()=>{
      try{
        const res = await axios.get("http://localhost:3000/api/data/sports")
        setSportsData(res.data)
      }catch(error){
        console.log("error fetching sportsdata",error);
      }
    }
    loadsports()
  },[])

  return (
    <section className="sports-page">
      <div className="sports-header">
        <h1>Our Sports</h1>
        <p>Choose your favorite sport and book your courts easily!</p>
      </div>

      <div className="sports-cards">
        {SportsData.map((sport, index) => (
          <div key={index} className="sport-card">
            <div className="sport-image">
              <img src={sport.image} alt={sport.name} />
            </div>
            <div className="sport-info">
              <h2>{sport.name}</h2>
              <p>{sport.description}</p>

                <button className="book-btn"
                onClick={()=>{
                  if(user){
                    Navigate(`/booking/${sport._id}`,{state:{sport}} )
                  }else{
                    alert("You need to login first !!")
                    Navigate("/login")
                  }
                }}
                >Book Now</button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SportsPage;