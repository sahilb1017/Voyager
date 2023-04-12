import React from 'react'
import Voyager_Logo from "/voyager-logo.png"
import Google_Logo from "/google_logo.png"
import Facebook_Logo from "/Facebook_logo.png"
import Linkdein_Logo from "/Linkedin_logo.png"
import {motion} from 'framer-motion'
import { Link } from "react-router-dom"
import { useAppContext } from '../../context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";


export default function Login() {
    const navigate = useNavigate();
    const[form,setForm] = useState({email:"", password:""})
    const {logIn, setUser, user} = useAppContext();

    function handler(event){
        setForm(Form =>{
            return{
            ...Form,
            [event.target.name]:event.target.value
        }
        })}
    

    const emptyFieldToast = () => {
        toast.error('Please fill out all required fields', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "EmptyField",
            style: {
                backgroundColor: '#353535',
                color: '#87A1FF'
              },
        });
    };



    async function LoginHandler(){
        if(!form.email||!form.email){
            emptyFieldToast()
        }
        try {
            const url = "http://localhost:8000/account/login";
            await Axios.post(url, form)
            .then((response)=>{
                setUser(response);
                const userType = response.data.acc_type;
                if(userType == "User"){
                    navigate("/Browse");
                }
                if(userType == "Company"){
                    navigate("/Browse");
                }
                if(userType == "Inspector"){
                    navigate("/Inspect");
                } 
            })
            .catch((error)=>{
                navigate("/");
            })
             
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='mt-16 flex flex-col items-center justify-center'>
            <img src={Voyager_Logo} class="fill-current " width="400" viewBox="0 0 283 74"></img>
            <h1 className ='text-3xl text-white text-center mt-10 font-bold'>
                Login
            </h1>
            <div class = "flex flex-col justify-center items-center gap-y-6 mt-8">
                <input type="email" name="email" placeholder="email" onChange = {handler} className="px-4 h-12 w-96 bg-main-grey text-white rounded-3xl outline-white outline-2 focus:outline focus:outline-white hover:outline hover:outline-[#464646]"/>
                <input type="password" name="password" placeholder="password" onChange = {handler} className="px-4 h-12 w-96 bg-main-grey text-white rounded-3xl outline-white outline-2 focus:outline focus:outline-white hover:outline hover:outline-[#464646]"/>
                <button onClick = {LoginHandler} className="bg-main-blue text-white rounded-3xl w-48 h-12 mt-2 hover:bg-[#5f82ff]">
                    Login
                </button>
                <ToastContainer hideProgressBar={true}/>
                                    <style>
                                    {
                                    `.Toastify__toast--error .Toastify__toast-icon svg path {
                                        fill: #87A1FF;
                                    }`}
                                    </style>
                <div class="inline-flex items-center justify-center w-full mt-10">
                    <hr class="w-full h-0.5  bg-gray-200 border-0"></hr>
                    <span class="absolute px-3 bg-white dark:text-white dark:bg-black font-bold">OR</span>
                </div>
                <div class="inline-flex items-center justify-center w-full gap-x-10 ">
                <motion.div
                whileHover={{scale:1.2}}>
                    <button class="w-10 h-10" ><img src={Google_Logo} alt="my image"  /></button>
                </motion.div>
                <motion.div
                whileHover={{scale:1.2}}>
                    <button class="w-10 h-10"><img src={Facebook_Logo} alt="my image"  /></button>
                </motion.div>
                <motion.div
                whileHover={{scale:1.2}}>
                <button class="w-10 h-10"><img src={Linkdein_Logo} alt="my image" /></button>
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

