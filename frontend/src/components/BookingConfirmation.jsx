import Car from "/Test.png"
import Calandar from "/calandar.png"
import Location from "/location.png"
import moment from "moment"
import { useState } from "react"
import Select from "react-select"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function BookingConfirmation({form,information,pick,drop,open}) {

    const[coupon,setCoupon] = useState("")
    const[couponVal,setCouponVal] = useState(0)
    const[insurance,setInsurance] = useState({name:"",price:0})
    const[price,SetPrice] = useState(0.00.toFixed(2))
    console.log(insurance)
    useEffect(() => {
      
        const date1 = new Date(form.start)
        const date2 = new Date(form.end)
        SetPrice((Math.ceil(Math.abs(date2 - date1)/ (1000 * 60 * 60 * 24))*information.price+insurance.price)-couponVal)
        setCoupon("")
        
      },[open,insurance]);

    const invalidCouponToast = () => {
        toast.error('Invalid coupon', {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "invalid coupon",
            style: {
                backgroundColor: '#353535',
                color: '#87A1FF'
              },
        });
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setCoupon(v);
      };


    const insuranceOptions=[
        {
            name: "No Insurance",
            price: 0
        },
        {
            name: "Voyage Insurance",
            price:200

        },
        {
            name: "Odyssey",
            price:400
        },
      ]

      function couponHandler(){
        setCouponVal(5)
      }

    
      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: '#000000',
          border: state.isFocused ? '3px solid #87A1FF' : '2px solid #87A1FF',
          borderRadius: '0.5rem',
          boxShadow: state.isFocused ? '0 0 5px grey' : 'none',
          '&:hover': {
            borderColor: state.isFocused ? '#87A1FF' : '#87A1FF'
          },
          height: '32px',
          minHeight:"32px",
          padding :"-3px"
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
          },
          '& > div': {
            padding: '5px', // Set the padding of the option elements
            fontSize: '14px', // Set the font size of the option elements
            lineHeight: '1.5', // Set the line height of the option elements
          },
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: '1.5rem',
        }),
        option: (provided, state) => ({
          ...provided,
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: state.isFocused ? 'grey' : '#000000',
          color: state.isSelected ? '#FFFFFF' : '#FFFFFF',
          '&:active': {
            backgroundColor: '#000000'
          },
        height:"32px"
        }),
        singleValue: (provided, state) => ({
          ...provided,
          color: '#FFFFFF'
        }),
        placeholder: (provided, state) => ({
          ...provided,
          color: '#FFFFFF'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '32px',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            marginLeft:"2px",
            display:"block"
        
          }),
      
      };

  return (
        <div onClick={(event) => event.stopPropagation()} className="h-full w-full bg-black border-2 border-main-blue"
        style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            width: '80%',
            height: '80%',
          }}>   <div className = "flex flex-row mt-16 ml-[7.5rem]">
                    <h1 className ='text-3xl text-white font-bold'>
                        Tesla Model 3 2021
                    </h1>
                </div>
                <div className = "flex flex-col items-center justify-center"> 
                        <div className="flex flex-row items-center justify-center pt-8">
                            <div className = "flex flex-row justify-center items-center gap-x-12 h-[350px]">
                                <img className = "w-[400px] h-full "src={Car}/>
                                <div className = "flex flex-col justify-start items-start h-full gap-y-8">
                                        <div className = "flex flex-row gap-x-4">
                                            <div className = "flex flex-col justify-start items-start h-full gap-y-4">
                                                <div className = "-mt-2">
                                                    <h1 className = "text-white text-base mb-1">
                                                        Start Date
                                                    </h1>
                                                    <div className = "h-8 w-56 flex flex-row items-center gap-x-2 rounded-lg border-2 border-main-blue">
                                                        <img src ={Calandar} className="w-[20px] ml-1"></img>
                                                        <h2 className="text-white text-base"> {moment(new Date(form.start)).format("MMMM D, YYYY")}</h2>
                                                    </div> 
                                                </div> 
                                                <div className = "-mt-1">
                                                    <h1 className = "text-white text-base mb-1 ">
                                                            Pick Up
                                                    </h1>
                                                    <div className = "h-8 w-56 flex flex-row items-center gap-x-2 rounded-lg border-2 border-main-blue" >
                                                        <img src ={Location} className="w-[20px] h-[20px] ml-1"></img>
                                                        <h2 className="text-white text-base"> {drop.street}</h2>
                                                    </div>     
                                                </div>                             
                                            </div>
                                            <div className = "flex flex-col justify-start items-start h-full gap-y-4">
                                                <div className = "-mt-2">
                                                    <h1 className = "text-white text-base mb-1">
                                                        End Date
                                                    </h1>
                                                    <div className = " h-8 w-56 flex flex-row  items-center gap-x-2 rounded-lg border-2 border-main-blue">
                                                        <img src ={Calandar} className="w-[20px] ml-1"></img>
                                                        <h2 className="text-white text-base"> {moment(new Date(form.end)).format("MMMM D, YYYY")}</h2>
                                                    </div> 
                                                </div>
                                                <div className = "-mt-1">
                                                    <h1 className = " text-white text-base mb-1 ">
                                                            Drop Off
                                                    </h1>
                                                    <div className = "h-8 w-56 flex flex-row items-center gap-x-2 rounded-lg border-2 border-main-blue">
                                                        <img src ={Location} className="w-[20px] h-[20px] ml-1"></img>
                                                        <h2 className="text-white text-base"> {drop.street}</h2>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "w-full">
                                            <h1 className = "text-white text-2xl mb-1">
                                                Coupon
                                            </h1>
                                            <div className="flex flex-row justify-start items-center gap-x-8">
                                                <input type="text" name="coupon" value = {coupon} onChange = {handleInputChange} placeholder="Coupon" className=" px-4 h-8 w-3/4 bg-black text-white rounded-lg  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue"/>      
                                                <button onClick={couponHandler} className="bg-main-blue text-white rounded-lg w-20 h-8 hover:bg-[#5f82ff]">
                                                    Apply 
                                                </button>                                      
                                            </div>
                                        </div>
                                        <div className = "w-full -mt-4">
                                        <h1 className = "text-white text-2xl mb-1">
                                                Insurance
                                        </h1>
                                            <Select
                                                styles = {customStyles}    
                                                options={insuranceOptions}
                                                isSearchable={false}
                                                getOptionLabel={(options) => {
                                                    return options["name"];
                                                }}
                                                onChange={(newValue) => {
                                                    setInsurance(newValue)
                                                }}
                                                
                                                />  
                                        </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className = "flex flex-row justify-end pr-20 gap-x-10 items-center">
                        <h1 className = "text-white text-2xl">
                            ${price}
                        </h1>
                        <button className="bg-main-blue text-white rounded-3xl w-48 h-12 hover:bg-[#5f82ff]">
                            Confrim Booking 
                        </button>
                    </div>
        </div>
  );
}