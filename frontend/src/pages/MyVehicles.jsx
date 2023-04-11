import React from 'react'
import LandingNav from '../components/LandingNav'

function MyVehicles() {
  return (
    <div>
        <LandingNav 
            type="User"
        />
        <p className="text-white text-3xl font-bold pb-8">My Vehicles</p>
    
    </div>
  )
}

export default MyVehicles