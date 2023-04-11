import React from 'react'
import LandingNav from '../components/LandingNav'

function MyVehicles() {
  return (
    <div>
        <LandingNav 
            type="User"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">My Vehicles</p>
        </div>
    
    </div>
  )
}

export default MyVehicles