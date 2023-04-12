import React from 'react'
import LandingNav from '../components/LandingNav'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";
import CarouselDisplay from '../components/CarouselDisplay';
import { useAppContext } from '../../context/userContext'

function MyRentals() {
  const navigate = useNavigate();
  const [rentals,setRentals] = useState();
  
  const url1 = "http://localhost:8000/booking/get-booked";
  const {user, setUser} = useAppContext();
  
  useEffect(() => {
    try {
      const fetchData = async() => {
        await Axios.post(url1, {email: user.data.email})
        .then((response) => {
          if(response.status == 200){
            setRentals(response.data);
          }
        })
        .catch((error)=>{
          console.log(error);
        })

      }
      fetchData();
    } catch (error) {
      console.log(error)
    } 
  },[user])
  
  return (
    <div>
        <LandingNav 
            type="User"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">My Rentals</p>
            <div className="mb-12">
              <CarouselDisplay 
                vehicle={rentals}
              />
            </div>
        </div>
    
    </div>
  )
}

export default MyRentals