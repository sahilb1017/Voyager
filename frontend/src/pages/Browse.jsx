import React from 'react'
import LandingNav from '../components/LandingNav'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";
import CarouselDisplay from '../components/CarouselDisplay';

function Browse() {
  const navigate = useNavigate();

  const [cars,setCars] = useState();
  const [trucks,setTrucks] = useState();
  const [boats,setBoats] = useState();
  const [motorcycles,setMotorcycles] = useState();
  const [jets,setJets] = useState();

  const url1 = "http://localhost:8000/vehicles/browse/get-cars"
  const url2 = "http://localhost:8000/vehicles/browse/get-trucks"
  const url3 = "http://localhost:8000/vehicles/browse/get-boats"
  const url4 = "http://localhost:8000/vehicles/browse/get-motorcycles"
  const url5 = "http://localhost:8000/vehicles/browse/get-jets"
  
  
  
  useEffect(() => {
    try {
      const fetchData = async() => {
        await Axios.get(url1)
        .then((response) => {
          if(response.status == 200){
            setCars(response.data);
          }
        })
        .catch((error)=>{
          console.log(error);
        })

        await Axios.get(url2)
        .then((response) => {
          if(response.status == 200){
            setTrucks(response.data)
          }
        })
        .catch((error)=>{
          console.log(error);
        })

        await Axios.get(url3)
        .then((response) => {
          if(response.status == 200){
            setBoats(response.data)
          }
        })
        .catch((error)=>{
          console.log(error);
        })

        await Axios.get(url4)
        .then((response) => {
          if(response.status == 200){
            setMotorcycles(response.data)
          }
        })
        .catch((error)=>{
          console.log(error);
        })

        await Axios.get(url5)
        .then((response) => {
          if(response.status == 200){
            setJets(response.data)
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
    
  },[])

  

  return (
    <div>
        <LandingNav 
            navigate={navigate}
            type="User"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">Browse</p>
            
            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Cars</p>
              <CarouselDisplay 
                card_type = "Browse"
                vehicle={cars}
              />
            </div>
            
            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Trucks</p>
              <CarouselDisplay
                card_type = "Browse"
                vehicle={trucks}
              />
            </div>

            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Motorcycles</p>
              <CarouselDisplay 
                card_type = "Browse"
                vehicle={motorcycles}
              />
            </div>

            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Boats</p>
              <CarouselDisplay 
                card_type = "Browse"
                vehicle={boats}
              />
            </div>

            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Jets</p>
              <CarouselDisplay 
                card_type = "Browse"
                vehicle={jets}
              />
            </div>
            
        </div>
    
    </div>
  )
}

export default Browse