import React from 'react'
import Car from "../../public/lambo.png"

function HomeInfo() {
  return (
    <div class="flex justify-between  ">
        <div class="flex justify-between items-center  w-1/3  lg:ml-56 ">
            <div class="flex flex-col">
                <p class="text-white text-5xl font-bold ">
                    Voyager’s 
                    <span class="text-main-blue"> extensive fleet </span>    
                    will help you
                    <span class="text-main-blue"> travel </span>  
                    anywhere you
                    <span class="text-main-blue"> desire </span> 
                </p>
                <div class="mt-12">
                    <button class="bg-main-blue hover:black text-white font-bold py-2 px-4 border border-main-blue rounded  mr-8">
                        Find your voyage
                    </button>
                    <button class="bg-transparent hover:bg-main-blue text-main-blue font-bold hover:text-white py-2 px-4 border border-main-blue hover:border-transparent rounded">
                        Rent your vehicle
                    </button>
                </div>
            </div>
        </div>
        <div class="w-1/3  inline-block  lg:mr-52 ">
            <img src={Car} class="float-right" width="420" height="" ></img>
        </div>
    </div>
  )
}

export default HomeInfo