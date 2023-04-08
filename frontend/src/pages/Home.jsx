import React from 'react'
import LandingNav from '../components/LandingNav'
import HomeInfo from '../components/HomeInfo'
import Brands from '../components/Brands'
import Featured from '../components/Featured'
import Questions from '../components/Questions'
function Home() {
  return (
    <div>
        <LandingNav />
        <HomeInfo />
        <Brands />
        <Featured />
        <Questions />
    </div>
    
  )
}

export default Home