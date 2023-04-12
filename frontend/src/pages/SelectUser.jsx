import React, { useState } from 'react'
import User_Logo from "/User_logo.png"
import Company_Logo from "/Company_logo.png"
import Inspector_Logo from "/Inspector_logo.png"
import { Link } from "react-router-dom"
import {motion} from 'framer-motion'
import LogoNav from '../components/LogoNav'




export default function SelectUser() {
    const[usertype,setUserType] = useState("");
    
    function handler1(){
      setUserType("U")
    }

    function handler2(){
        setUserType("I")
      }
    
      function handler3(){
        setUserType("C")
      }
      
    
      
      
    


    return (
        <div className = "w-full h-full ">
                  <LogoNav/>
            <div className='flex flex-col justify-start items-center w-full h-full'>
                <h1 className = "text-white text-5xl pt-32">
                    Which of these best describe you?
                </h1>
                <div className='flex flex-row justify-center items-center gap-x-36 pt-32'>
                    <motion.div
                    whileHover={{scale:1.2}}>
                        <div className='flex flex-col justify-center items-center'>
                            <button className="w-48 h-48" ><img src={User_Logo} onClick={handler1} /></button>
                            <h2 className = "text-white text-xl">User</h2>
                        </div>
                    </motion.div>
                    <motion.div
                    whileHover={{scale:1.2}}>
                        <div className='flex flex-col justify-center items-center'>
                            <button className="w-48 h-48" ><img src={Company_Logo} onClick={handler2} /></button>
                            <h2 className = "text-white text-xl">Company</h2>
                        </div>
                    </motion.div>
                    <motion.div
                    whileHover={{scale:1.2}}>
                        <div className='flex flex-col justify-center items-center'>
                            <button className="w-48 h-48" ><img src={Inspector_Logo} onClick={handler3} /></button>
                            <h2 className = "text-white text-xl">Inspector</h2>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}