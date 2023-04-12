import React from 'react'
import LandingNav from '../components/LandingNav'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";
import CarouselDisplay from '../components/CarouselDisplay';


function Inspect() {

  const navigate = useNavigate();

  const [cars,setCars] = useState([]);
  const [trucks,setTrucks] = useState([]);
  const [boats,setBoats] = useState([]);
  const [motorcycles,setMotorcycles] = useState([]);
  const [jets,setJets] = useState([]);
  const [newArr, setNewArr] = useState([]);

  const url1 = "http://localhost:8000/inspection/get-cars"
  const url2 = "http://localhost:8000/inspection/get-trucks"
  const url3 = "http://localhost:8000/inspection/get-boats"
  const url4 = "http://localhost:8000/inspection/get-motorcycles"
  const url5 = "http://localhost:8000/inspection/get-jets"
  
  useEffect(() => {
    try {
      const fetchData = async() => {
        const [carsResponse, trucksResponse, boatsResponse, motorcyclesResponse, jetsResponse] = await Promise.all([
          Axios.get(url1),
          Axios.get(url2),
          Axios.get(url3),
          Axios.get(url4),
          Axios.get(url5)
        ]);
  
        if (carsResponse.status === 200) {
          setCars(carsResponse.data);
        }
        if (trucksResponse.status === 200) {
          setTrucks(trucksResponse.data);
        }
        if (boatsResponse.status === 200) {
          setBoats(boatsResponse.data);
        }
        if (motorcyclesResponse.status === 200) {
          setMotorcycles(motorcyclesResponse.data);
        }
        if (jetsResponse.status === 200) {
          setJets(jetsResponse.data);
        }
      }
  
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  
  useEffect(() => {
    setNewArr(cars.concat(trucks, boats, motorcycles, jets));
  }, [cars, trucks, boats, motorcycles, jets]);

  return (
    <div>
        <LandingNav 
            navigate={navigate}
            type="Inspector"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">Browse</p>
      
            <div className="mb-12">
              <p className="text-white text-2xl font-bold pb-8">Vehicles to Inspect</p>
              <CarouselDisplay 
                card_type = "Inspect"
                vehicle={newArr}
              />
            </div>  
        </div>
    </div>
  )
}

export default Inspect