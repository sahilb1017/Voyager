import { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && Object.keys(storedUser).length > 0) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setIsLoading(false);
  }, [user]);

  const logout = () => {
    setUser({});
    localStorage.clear();
    //navigate("/");    
  }

  const logIn = (loginInfo) => {
    const url = "localhost:8000/account/login";
    Axios.post(url, loginInfo)
    .then((response)=>{
        setUser(response);
        return (response.acc_type);
        // if(response.acc_type === "User"){
        //     //navigate("/Browse");
        // }
        // if(response.acc_type === "Company"){
        //     //navigate("/MyVehicles");
        // }
        // if(response.acc_type === "Inspector"){
        //     //navigate("/Inspect");
        // }   
    })
    .catch((error)=>{
        //navigate("/");  
        console.log(error);
        return (null);
    })
  }

  const register = (registerInfo) => {
    const url = "localhost:8000/account/register";
    Axios.post(url, registerInfo)
    .then((response)=>{
        setUser(response);
        //navigate('/type');   
    })
    .catch((error)=>{
        //navigate("/");  
        console.log(error);
    })
  }

  const registerInfo = (registerInfo, type) => {
    const url = "localhost:8000/account/update";
    Axios.post(url, registerInfo)
    .then((response)=>{
        setUser(response);
        //navigate('/type');
        if(response.acc_type === "User"){
            //navigate("/Browse",{state: {"userType": "User"}});
        }
        if(response.acc_type === "Company"){
            //navigate("/MyVehicles",{state: {"userType": "Company"}});
        }
        if(response.acc_type === "Inspector"){
            //navigate("/Inspect",{state: {"userType": "Inspector"}});
        }   
    })
    .catch((error)=>{
        //navigate("/");  
        console.log(error);
    })
  }

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading, logout, register, registerInfo, logIn}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}