import React from 'react'
import LandingNav from '../components/LandingNav'
function Inspect() {
  return (
    <div>
        <LandingNav 
            type="Inspector"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">Vehicles to inspect</p>
        </div>
    
    </div>
  )
}

export default Inspect