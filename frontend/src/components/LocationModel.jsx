import Select from "react-select"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LocationModel({location,setLocation,open,setOpen,heading}) {

    const[temp,setTemp] = useState({street:"",city:"",postal:"",province:""})


    const provinceOptions=[
        {
            name: "Alberta",
            isoCode: 'AB',
        },
        {
            name: "British Columbia",
            isoCode: 'BC',
        },
        {
            name: "Manitoba",
            isoCode: 'MB',
        },
        {
            name: "New Brunswick",
            isoCode: 'NB',
        },
        {
            name: "Newfoundland and Labrador",
            isoCode: 'NL',
        },
        {
            name: "Northwest Territories",
            isoCode: 'NT',
        },
        {
            name: "Nova Scotia",
            isoCode: 'NS',
        },
        {
            name: "Nunavut",
            isoCode: 'NU',
        },
        {
            name: "Ontario",
            isoCode: 'ON',
        },
        {
            name: "Prince Edward Island",
            isoCode: 'PE',
        },
        {
            name: "Quebec",
            isoCode: 'QC',
        },
        {
            name: "New Brunswick",
            isoCode: 'NB',
        },
        {
            name: "Saskatchewan",
            isoCode: 'SK',
        },
        {
            name: "Yukon",
            isoCode: 'YT',
        },
      ]

    function inputHandler(event){
            setTemp(prevTemp =>{
                return{
                ...prevTemp,
                [event.target.name]:event.target.value
            }
            })}
    function confrimHandler(){
        if(!temp.street||!temp.city||!temp.postal||!temp.province){
            emptyFieldToast()
        }
        else{
            setLocation({
                street:temp.street,
                city:temp.city,
                postal:temp.postal,
                province:temp.province
            })
            setOpen(!open)
        }
    }
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

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#353535',
            border: state.isFocused ? '3px solid #87A1FF' : '2px solid #87A1FF',
            borderRadius: '0.75rem',
            boxShadow: state.isFocused ? '0 0 5px grey' : 'none',
            '&:hover': {
            borderColor: state.isFocused ? '#87A1FF' : '#87A1FF'
            },
            minHeight: '3rem',
            minWidth :'9rem'
        }),
        menuList: (provided, state) => ({
            ...provided,
            borderRadius: '0.75rem',
            backgroundColor: '#353535',
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
            backgroundColor:state.isFocused ? 'grey' : '#353535',
            color: state.isSelected ? '#FFFFFF' : '#FFFFFF',
            '&:active': {
            backgroundColor: '#575757'
            },
    
    
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#FFFFFF'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#FFFFFF'
        }),
      
        };
  return (
        <div onClick={(event) => event.stopPropagation()} className="h-full w-full bg-black border-2 border-main-blue flex flex-col justify-center items-center"
        style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            width: '60%',
            height: '80%',
          }}> 
            <div className = "flex flex-col justify-center items-center">
                <h1 className = "text-white text-3xl mb-4">
                    {heading}
                </h1>
                <div className = "flex flex-col mt-5 gap-y-1">
                    <h2 className = "text-white text-xl">
                        Street
                    </h2>
                    <input type="text" value = {temp.street} onChange = {inputHandler} name="street" className="px-4 h-12 w-96 bg-main-grey text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue"/>

                </div>
                <div className = "flex flex-col mt-5 gap-y-1">
                    <h2 className = "text-white text-xl">
                        City
                    </h2>
                    <input type="text" value = {temp.city} onChange = {inputHandler} name="city" className="px-4 h-12 w-96 bg-main-grey text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue"/>
                </div>
                <div className = "flex flex-row justify-start items-start w-96 gap-x-12">
                    <div className = "flex flex-col mt-5 gap-y-1">
                        <h2 className = "text-white text-xl">
                            Postal
                        </h2>
                        <input type="text"  value = {temp.postal} onChange = {inputHandler} name="postal" className="px-4 h-12 w-48 bg-main-grey text-white rounded-xl  border-2 border-main-blue outline-none hover:border-[3px] hover:border-main-blue focus:border-[3px] focus:border-main-blue"/>
                    </div>

                    <div className = "flex flex-col mt-5 gap-y-1">
                        <h2 className = "text-white text-xl">
                            Province
                        </h2>
                        <Select
                            styles = {customStyles}    
                            options={provinceOptions}
                            getOptionLabel={(options) => {
                                return options["isoCode"];
                            }}
                            getOptionValue={(options) => {
                                return options["name"];
                            }}
                            onChange={(newValue) => {
                                setTemp(prevLocation=>({
                                    ...prevLocation,
                                    province:newValue.name
                                  }))
                            }}
                            />   
                    </div>
                </div>
                <button onClick = {confrimHandler} className="bg-main-blue text-white rounded-3xl w-48 h-12 mt-16 hover:bg-[#5f82ff]">
                    Confirm
                </button>
                
            </div>
        </div>
  );
}