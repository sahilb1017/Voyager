import React, { useEffect, useState } from 'react'
import BookingNav from '../components/BookingNav'
import Car from "/Test.png"
import Calandar from "/calandar.png"
import Human from "/human.png"
import Colour from "/colour.png"
import Mileage from "/mileage.png"
import Clean from "/clean.png"
import Damage from "/damage.png"
import Review from "/review.png"
import Price from "/price.png"
import Gaval from  "/gaval.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select"
import LandingNav from '../components/LandingNav'






export default function InspectionReport() {

    const [report,setReport] = useState({clean:"",damage:"",review:"",decision:-1})
    const[information,setInformation] = useState({date:"",copacity:"",color:"",mileage:"",price:0})
    console.log(report)
    const cleanOptions=[
        {
            name: "1 - Unacceptable Cleanliness",
            val:"1 - Unacceptable Cleanliness"
        },
        {
            name: "2 - Poor Cleanliness",
            val:"2 - Poor Cleanliness"
        },
        {
            name: "3 - Satisfactory Cleanliness",
            val:"3 - Satisfactory Cleanliness"
        },
        {
            name: "4 - Great Cleanliness",
            val:"4 - Great Cleanliness"
        },
        {
            name: "5 - Excellent Cleanliness",
            val: "5 - Excellent Cleanliness"
        },
        
      ]



      const damageOptions=[
        {
            name: "1 - Unacceptable Damage",
            val: "1 - Unacceptable Damage",
        },
        {
            name: "2 - Significant Damage",
            val: "2 - Significant Damage",
            
        },
        {
            name: "3 - Moderate Damage",
            val: "3 - Moderate Damage",
        },
        {
            name: "4 - Minor Damage",
            val: "4 - Minor Damage",
        },
        {
            name: "5 - No Damage",
            val: "5 - No Damage",
        },
      ]
      
      const reviewOptions=[
        {
            name: "Unacceptable Overall Condition",
            val: "Unacceptable Overall Condition"
        },
        {
            name: "Poor Overall Condition",
            val: "Poor Overall Condition"
        },
        {
            name: "Good Overall Condition",
            val: "Good Overall Condition"
        },
        {
            name: "Great Overall Condition",
            val: "Great Overall Condition"
        },
        {
            name: "Excellent Overall Condition",
            val: "Excellent Overall Condition"
        },
      ]  

      const decisionOptions=[
        {
            name: "Accept",
            val: 1
        },
        {
            name: "Reject",
            val: 0
        },
      ]  

    useEffect(() => {
      
      setInformation({
        date:"Feb 20,2023",
        capacity:"5",
        color:"White",
        mileage:"272",
        price:69
      })
      
    },[]);
    

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

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#000000',
          border: state.isFocused ? '3px solid #87A1FF' : '2px solid #87A1FF',
          borderRadius: '0.5rem',
          boxSizing: 'border-box',
          boxShadow: state.isFocused ? '0 0 5px grey' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '#87A1FF' : '#87A1FF'
          },
          width: 300,
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
          boxSizing: 'border-box',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: 0,
            height: 0
          },

        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '1.5rem',
          boxSizing: 'border-box',
        }),
        option: (provided, state) => ({
          ...provided,
          padding: '2px 10px 0px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          backgroundColor: state.isFocused ? 'grey' : '#000000',
          color: state.isSelected ? '#FFFFFF' : '#FFFFFF',
          '&:active': {
            backgroundColor: '#000000'
          },
        height:"32px"
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: '#FFFFFF',
          boxSizing: 'border-box',
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#FFFFFF',
          boxSizing: 'border-box',
        }),
      };

      function submitHandler(){
        if(!report.clean||!report.damage||report.decision ===-1||!report.review){
            emptyFieldToast()
        }
        else{

        }
      }

    return (
        <div className="h-full w-full">
            <LandingNav 
            type="User"
            />
            <div className = "flex flex-col items-center justify-center"> 
                <div className = "w-[80%]">
                    <div className = "flex flex-row ml-[3.5rem] mt-16">
                        <h1 className ='text-3xl text-white font-bold'>
                            Tesla Model 3 2021
                        </h1>
                    </div>
                    <div className="flex flex-row items-center justify-center pt-10">
                        <div className = "flex flex-row items-center gap-x-32 h-[350px]">
                            <img className = "w-[400px] h-full "src={Car}/>
                            <div className = "flex flex-col justify-start items-start h-full gap-y-4">
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Calandar} className="w-[25px] h-[25px]"></img>
                                    <h2 className="text-white text-lg"> Feb 20,2023</h2>
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Human} className="w-[25px] h-[25px]"></img>
                                    <h2 className="text-white text-lg"> 5 Adults</h2>
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Colour} className="w-[25px] h-[25px]"></img>
                                    <h2 className="text-white text-lg"> White</h2>
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Mileage} className="w-[23px] h-[23px]"></img>
                                    <h2 className="text-white text-lg">272 Miles</h2>
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3 ml-[0.3rem]">
                                    <img src ={Price} className="w-[12px] mr-[0.45rem]"></img>
                                    <h2 className="text-white text-lg">$69/day</h2>
                                </div>
                                
                            </div>
                            <div className = "flex flex-col justify-start items-start h-full gap-y-4 box-border">
                                <div className = "flex flex-row justify-center items-center gap-x-3 ">
                                    <img src ={Clean} className="w-[20px]"></img>
                                    <Select
                                        boxShadow = "border-box"
                                        styles = {customStyles}    
                                        options={cleanOptions}
                                        isSearchable={false}

                                        getOptionLabel={(options) => {
                                            return options["val"];
                                        }}
                                        onChange={(newValue) => {
                                            setReport(prevReport=>({
                                                ...prevReport,
                                                clean:newValue.val
                                              }))
                                        }}
                                        />  
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Damage} className="w-[20px]"></img>
                                    <Select
                                    boxShadow = "border-box"
                                    styles = {customStyles}    
                                    options={damageOptions}
                                    isSearchable={false}

                                    getOptionLabel={(options) => {
                                        return options["val"];
                                    }}
                                    onChange={(newValue) => {
                                        setReport(prevReport=>({
                                            ...prevReport,
                                            damage:newValue.val
                                          }))
                                    }}
                                    />  
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Review} className="w-[20px]"></img>
                                    <Select
                                    boxShadow = "border-box"
                                    styles = {customStyles}    
                                    options={reviewOptions}
                                    isSearchable={false}

                                    getOptionLabel={(options) => {
                                        return options["val"];
                                    }}
                                    onChange={(newValue) => {
                                        setReport(prevReport=>({
                                            ...prevReport,
                                            review:newValue.val
                                          }))
                                    }}
                                    />  
                                </div>
                                <div className = "flex flex-row justify-center items-center gap-x-3">
                                    <img src ={Gaval} className="w-[20px]"></img>
                                    <Select
                                    boxShadow = "border-box"
                                    styles = {customStyles}    
                                    options={decisionOptions}
                                    isSearchable={false}
                                    getOptionLabel={(options) => {
                                        return options["name"];
                                    }}
                                    onChange={(newValue) => {
                                        setReport(prevReport=>({
                                            ...prevReport,
                                            decision:newValue.val
                                          }))
                                    }}
                                    />  
                                </div>
                                <div> 
                                <button onClick = {submitHandler}className="bg-main-blue text-white rounded-xl w-36 h-8 mt-20 ml-40 hover:bg-[#5f82ff]">
                                    Submit
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
                        </div>

                    </div>
                               
            </div>
            </div>
        </div>
    )
}