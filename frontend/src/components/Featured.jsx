import React from 'react'
import CarCard from './CarCard'
import CarouselDisplay from './CarouselDisplay'

function Featured() {
  return (
    <div>
        <p class=" text-white text-5xl font-bold text-center pb-12"> 
            Featured  
            <span class="text-main-blue"> Vehicles </span>
        </p>
        <div class="lg:mr-56 lg:ml-56 flex justify-between pb-8">
            <CarouselDisplay />
            
        </div>
        
    </div>
  )
}

export default Featured