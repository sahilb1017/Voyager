import React from 'react'
import {ReactComponent as Ducati} from "../assets/Ducati.svg"
import {ReactComponent as BMW} from "../assets/bmw.svg"
import {ReactComponent as Tesla} from "../assets/tesla.svg"
import {ReactComponent as Mercedes} from "../assets/mercedes.svg"
import {ReactComponent as Volkswagon} from "../assets/volk.svg"
import {ReactComponent as Lexus} from "../assets/lexus.svg"


function Brands() {
    return (
      <div className="lg:mr-56 lg:ml-56 lg:mb-24">
        <p className="text-white text-3xl font-bold pb-8">Notable Brands</p>
        <hr className="pb-4"/>
        <div class="flex justify-between h-20">
          <div class="w-1/6 flex justify-center">
            <Lexus  fill='white' class="h-full"/>
          </div>
          <div class="w-1/6 flex justify-center">
            <BMW class="h-full"/>
          </div>
          <div class="w-1/6 flex justify-center">
            <Volkswagon fill='white' class="h-full"/>
          </div>
          <div class="w-1/6 flex justify-center">
            <Tesla fill='white' class="h-full"/>
          </div>
          <div class="w-1/6 flex justify-center">
            <Ducati fill='white' class="h-full"/>
          </div>
          <div class="w-1/6 flex justify-center">
            <Mercedes fill='white' class="h-full"/>
          </div>
        </div>
      </div>
    )
  }

export default Brands


