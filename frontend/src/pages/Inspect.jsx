import React from 'react'
import LandingNav from '../components/LandingNav'
function Inspect() {
  return (
    <div>
        <LandingNav 
            type="Inspector"
        />
        <p className="text-white text-3xl font-bold pb-8">Vehicles to inspect</p>
    
    </div>
  )
}

export default Inspect