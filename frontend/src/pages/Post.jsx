import React, { useEffect, useState } from 'react'
import BookingNav from '../components/BookingNav'
import Calandar from "/calandar.png"
import Human from "/human.png"
import Colour from "/colour.png"
import Mileage from "/mileage.png"
import Clean from "/clean.png"
import Damage from "/damage.png"
import Review from "/review.png"
import Price from "/price.png"
import Gaval from  "/gaval.png"
import Maker from "/Company_logo.png"
import Model from "/model.png"
import Registration from "/registration.png"
import License from "/license.png"
import Car from "/car.png"
import Truck from "/truck.png"
import Motorcycle from "/motorcycle.png"
import Boat from "/boat.png"
import Jet from "/jet.png"
import File from "/file.png"
import Extra from "/information.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select"
import LandingNav from '../components/LandingNav'






export default function InspectionReport() {

    const[information,setInformation] = useState({type:"",brand:"",model:"",registration:"", license:"",passenger:-1,colour:"",mileage:"",units:"",price:"",extra:""})
    const[image,setImage] = useState()
    const[placeholder,setPlaceholder] = useState("-------------------------")
    console.log(information)
    const mileageOptions=[
        {
            name: "mpg",
            val:  "mpg"
        },
        {
            name: "kpl",
            val:  "kpl"
        }, 
      ]
    
    const vehicleOptions=[
        {
            name: "Car",
            val:  "Car"
        },
        {
            name: "Truck",
            val:  "Truck"
        },
        {
            name: "Motorcycle",
            val:  "Motorcycle"
        },
        {
            name: "Boat",
            val:  "Boat"
        },
        {
            name: "Jet",
            val:  "Jet"
        }, 
      ]

      function handler(event){
       setInformation(prevForm =>{
            return{
            ...prevForm,
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
    }

    const invalidPassengerToast = () => {
        toast.error('Please fill in a valid number for the Passenger field', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "invalidPass",
            style: {
                backgroundColor: '#353535',
                color: '#87A1FF'
              },
        });
    }

    
    const invalidPriceToast = () => {
        toast.error('Please fill in a valid number for the Price field', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "invalidPrice",
            style: {
                backgroundColor: '#353535',
                color: '#87A1FF'
              },
        });
    }


    

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#000000',
            border: state.isFocused ? '3px solid #87A1FF' : '2px solid #87A1FF',
            borderRadius: '0.75rem',
            boxShadow: state.isFocused ? '0 0 5px grey' : 'none',
            '&:hover': {
            borderColor: state.isFocused ? '#87A1FF' : '#87A1FF'
            },
            minHeight: '3rem',
            minWidth :'7rem'
        }),
        menuList: (provided, state) => ({
            ...provided,
            borderRadius: '0.75rem',
            backgroundColor: '#000000',
            border: '2px solid #87A1FF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            padding: 0,
            listStyle: 'none',
            maxHeight: '200px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
            width: 0,
            height: 0
            }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '1.5rem',
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '10px',
            cursor: 'pointer',
            backgroundColor:state.isFocused ? '#353535' : '#000000',
            color: state.isSelected ? '#FFFFFF' : '#FFFFFF',
            '&:active': {
            backgroundColor: '#000000'
            },
    
    
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#FFFFFF'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#A9A9A9'
        }),
    }
    const customStyles2 = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#000000',
            border: state.isFocused ? '3px solid #87A1FF' : '2px solid #87A1FF',
            borderRadius: '0.75rem',
            boxShadow: state.isFocused ? '0 0 5px grey' : 'none',
            '&:hover': {
            borderColor: state.isFocused ? '#87A1FF' : '#87A1FF'
            },
            minHeight: '3rem',
            minWidth :'18rem',
        }),
        menuList: (provided, state) => ({
            ...provided,
            borderRadius: '0.75rem',
            backgroundColor: '#000000',
            border: '2px solid #87A1FF',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            padding: 0,
            listStyle: 'none',
            maxHeight: '300px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
            width: 0,
            height: 0
            }
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '1.5rem',
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '10px',
            cursor: 'pointer',
            backgroundColor:state.isFocused ? '#353535' : '#000000',
            color: state.isSelected ? '#FFFFFF' : '#FFFFFF',
            '&:active': {
            backgroundColor: '#000000'
            },
    
    
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#FFFFFF'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#A9A9A9'
        }),
    }

      function submitHandler(){
        if(!information.type||!information.brand||!information.model||!information.registration||!information.license||information.passenger==-1||!information.colour||!information.mileage||
            !information.units||!information.price||!information.extra){
            emptyFieldToast()
        }
        else if (information.passenger<0){
            invalidPassengerToast()
        }

        else if (information.price<0){
            invalidPriceToast()
        }
        else{
            var mileage = information.mileage+information.units
        }
      }

    return (
        <div className="h-full w-full">
            <LandingNav 
            type="User"
            />
            <div className = "flex flex-col items-center justify-center"> 
                <div className = "w-[80%]">
                    <div className="flex flex-row items-center justify-center pt-20">
                        <div className = "flex flex-row items-center gap-x-20 h-[400px]">
                            <div className = "w-[400px] h-full border-2 border-main-blue">
                                <div className=' w-[90%] h-[90%] flex flex-col justify-center items-center m-auto'>
                                    {image!=undefined&&
                                        <img src = {image} style={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            objectFit: 'cover' 
                                            }}  />}
                                    {image==undefined&&
                                        <img src = {File} style={{ 
                                            width: '20%', 
                                            height: '20%', 
                                            objectFit: 'cover' 
                                            }}  />}
                                        
                                </div>
                            </div>
                            <div className = "flex flex-col justify-center items-start h-full gap-y-10">
                            <Select
                                        boxShadow = "border-box"
                                        styles = {customStyles2}    
                                        options={vehicleOptions}
                                        isSearchable={false}
                                        placeholder = "Vehicle Type"
                                        getOptionLabel={(options) => {
                                            return options["val"];
                                        }}
                                        onChange={(newValue) => {
                                            if(newValue.val === "Car")
                                                {
                                                    setImage(Car)
                                                    setPlaceholder("Type")
                                                }
                                            else if(newValue.val === "Truck")
                                                 {
                                                    setImage(Truck)
                                                    setPlaceholder("Tonnage")
                                                }
                                            else if(newValue.val === "Motorcycle")
                                                {
                                                    setImage(Motorcycle)
                                                    setPlaceholder("CC")
                                                }
                                            else if(newValue.val === "Boat")
                                                {
                                                    setImage(Boat)
                                                    setPlaceholder("Knots")
                                                }  
                                            
                                            else if(newValue.val === "Jet")
                                                {
                                                    setImage(Jet)
                                                    setPlaceholder("TBO")
                                                }  
                                            setInformation(prevInfo=>({
                                                ...prevInfo,
                                                type:newValue.val
                                              }))
                                        }}
                                        />  
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Maker} className="w-[25px] h-[25px]"></img>
                                        <input type="text" name="brand" placeholder="Make Brand" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Model} className="w-[25px] h-[25px]"></img>
                                        <input type="text" name="model" placeholder="Model" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Registration} className="w-[25px] h-[25px]"></img>
                                        <input type="text" name="registration" placeholder="Registration Number" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={License} className="w-[25px] h-[25px]"></img>
                                        <input type="text" name="license" placeholder="License Plate" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className = "flex flex-col justify-center items-start h-full gap-y-10">
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Human} className="w-[25px] h-[25px]"></img>
                                        <input type="number" name="passenger" placeholder="# of passengers" onChange = {handler} min = "0" className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Colour} className="w-[25px] h-[25px]"></img>
                                        <input type="text" name="colour" placeholder="Colour" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className = "flex flex-row gap-x-4">
                                    <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                        <div className = "flex flex-row justify-center items-center w-full h-full">
                                            <img src ={Mileage} className="w-[25px] h-[25px]"></img>
                                            <input type="text" name="mileage" placeholder="Mileage" onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                        </div>
                                    </div>
                                    <Select
                                        boxShadow = "border-box"
                                        styles = {customStyles}    
                                        options={mileageOptions}
                                        isSearchable={false}
                                        placeholder = "units"
                                        getOptionLabel={(options) => {
                                            return options["val"];
                                        }}
                                        onChange={(newValue) => {
                                            setInformation(prevInfo=>({
                                                ...prevInfo,
                                                units:newValue.val
                                              }))
                                        }}
                                        />  
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Extra} className="w-[25px] h-[20px]"></img>
                                        <input type="text" name="extra" placeholder={placeholder} onChange = {handler} className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>
                                <div className="px-4 h-12 w-72 bg-black text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue">
                                    <div className = "flex flex-row justify-center items-center w-full h-full">
                                        <img src ={Price} className="w-[10px] ml-[.5rem] mr-[0.4rem]"></img>
                                        <input type="number" name="price"  onChange = {handler} placeholder="Price / Day" className="px-4 h-full w-full bg-black text-white rounded-xl outline-none "/>
                                    </div>
                                </div>                        
                            </div>
                            </div>
                        </div>         
                    </div>
                               
            </div>
            <div className = "flex flex-row justify-center items-center w-full">
                <button  className="bg-main-blue text-white text-xl rounded-3xl w-32 h-12  mt-16 hover:bg-[#5f82ff]">
                    Post
                </button>  
                <ToastContainer hideProgressBar={true}/>
                                    <style>
                                    {
                                    `.Toastify__toast--error .Toastify__toast-icon svg path {
                                        fill: #87A1FF;
                                    }`}
                                    </style>
            </div>
        </div>

    )
}