import React from 'react'
import LandingNav from '../components/LandingNav'

function MyRentals() {
  return (
    <div>
        <LandingNav 
            type="User"
        />
        <div className="lg:mr-56 lg:ml-56 lg:mb-20 pt-12">
            <p className="text-white text-3xl font-bold pb-8">My Rentals</p>
        </div>
    </div>
  )
}

export default MyRentals