import React from 'react'
import test from "../assets/test.jpg"

function CarCard() {
    return (
      <div className=" rounded-lg shadow bg-card-grey border-card-grey overflow-hidden w-[275px] h-[380px] pb-6">
        <div className="h-3/5">
            <img className="overflow-hidden w-full object-cover h-full" src={test} alt="" />
        </div>
        
        <div className="p-5">
          <h5 className="mb-4 text-2xl font-extrabold tracking-tight text-white text-center">
            Toyota Camry
          </h5>
          <p className="mb-2 text-sm text-white text-center">
            Model 3 2021
          </p>
          <p className="mb-3 text-sm text-white text-center">
            Sedan
          </p>
          <div className="bg-main-blue text-sm rounded-full px-3 py-[2px] text-white font-bold group w-1/3 text-center mx-auto">
            <p>$69/day</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default CarCard;