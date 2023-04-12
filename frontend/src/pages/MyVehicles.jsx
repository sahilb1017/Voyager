import React from 'react'
import LandingNav from '../components/LandingNav'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";
import CarouselDisplay from '../components/CarouselDisplay';
import { useAppContext } from '../../context/userContext'


function MyVehicles() {
  const navigate = useNavigate();
  const [pending,setPending] = useState();
  const [approved,setApproved] = useState();
  const url1 = "http://localhost:8000/inspection/get-pending"
  const url2 = "http://localhost:8000/inspection/get-approved"
  const {user, setUser} = useAppContext();
  
  useEffect(() => {
    try {
      const fetchData = async() => {
        await Axios.post(url1, {email: user.data.email})
        .then((response) => {
          if(response.status == 200){
            setPending(response.data);
          }
        })
        .catch((error)=>{
          console.log(error);
        })

        await Axios.post(url2, {email: user.data.email})
        .then((response) => {
          if(response.status == 200){
            setApproved(response.data);
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
            type={user.data.acc_type}
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">My Vehicles</p>
            
            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Pending Vehicles</p>
              <CarouselDisplay
                card_type="MyVehicle"
                vehicle={pending}
              />
            </div>

            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Approved Vehicles</p>
              <CarouselDisplay 
                card_type="MyVehicle"
                vehicle={approved}
              />
            </div>
            
        </div>
    
    </div>
  )
}

export default MyVehicles