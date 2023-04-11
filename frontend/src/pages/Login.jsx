import React from 'react'
import Voyager_Logo from "/voyager-logo.png"
import Google_Logo from "/google_logo.png"
import Facebook_Logo from "/Facebook_logo.png"
import Linkdein_Logo from "/Linkedin_logo.png"
import {motion} from 'framer-motion'
import { Link } from "react-router-dom"
import { useAppContext } from '../../context/userContext'


export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='mt-16 flex flex-col items-center justify-center'>
            <img src={Voyager_Logo} class="fill-current " width="400" viewBox="0 0 283 74"></img>
            <h1 className ='text-3xl text-white text-center mt-10 font-bold'>
                Login
            </h1>
            <div class = "flex flex-col justify-center items-center gap-y-6 mt-8">
                <input type="email" name="email" placeholder="email" className="px-4 h-12 w-96 bg-main-grey text-white rounded-3xl outline-white outline-2 focus:outline focus:outline-white hover:outline hover:outline-[#464646]"/>
                <input type="password" name="password" placeholder="password" className="px-4 h-12 w-96 bg-main-grey text-white rounded-3xl outline-white outline-2 focus:outline focus:outline-white hover:outline hover:outline-[#464646]"/>
                <button className="bg-main-blue text-white rounded-3xl w-48 h-12 mt-2 hover:bg-[#5f82ff]">
                    Login
                </button>
                <div class="inline-flex items-center justify-center w-full mt-10">
                    <hr class="w-full h-0.5  bg-gray-200 border-0"></hr>
                    <span class="absolute px-3 bg-white dark:text-white dark:bg-black font-bold">OR</span>
                </div>
                <div class="inline-flex items-center justify-center w-full gap-x-10 ">
                <motion.div
                whileHover={{scale:1.2}}>
                    <button class="w-10 h-10" ><img src={Google_Logo} alt="my image" onClick={console.log('harshal')} /></button>
                </motion.div>
                <motion.div
                whileHover={{scale:1.2}}>
                    <button class="w-10 h-10"><img src={Facebook_Logo} alt="my image" onClick={console.log('harshal')} /></button>
                </motion.div>
                <motion.div
                whileHover={{scale:1.2}}>
                <button class="w-10 h-10"><img src={Linkdein_Logo} alt="my image" onClick={console.log('harshal')} /></button>
                </motion.div>
                </div>
                <p class="text-white flex">
                    Don't have an account? 
                    <div className='mx-3'>
                        <Link className = "group text-main-blue"to="/SignUp">
                        Sign Up Here!
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-main-blue"></span>
                        </Link>
                    </div>
                </p>
            </div>
        </div>
    </div>
  )
}

