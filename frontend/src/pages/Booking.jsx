import React, { useState } from 'react'
import User_Logo from "/User_logo.png"
import LogoNav from '../components/LogoNav'




export default function SelectUser() {


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
                            <button className="w-48 h-48" ><img src={User_Logo}onClick={handler('U')} /></button>
                            <h2 className = "text-white text-xl">User</h2>
                        </div>
                    </motion.div>
                    <motion.div
                    whileHover={{scale:1.2}}>
                        <div className='flex flex-col justify-center items-center'>
                            <button className="w-48 h-48" ><img src={Company_Logo} onClick={handler('C')} /></button>
                            <h2 className = "text-white text-xl">Company</h2>
                        </div>
                    </motion.div>
                    <motion.div
                    whileHover={{scale:1.2}}>
                        <div className='flex flex-col justify-center items-center'>
                            <button className="w-48 h-48" ><img src={Inspector_Logo} onClick={handler('I')} /></button>
                            <h2 className = "text-white text-xl">Inspector</h2>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}