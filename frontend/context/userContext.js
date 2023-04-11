import { createContext, useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = cookies.getItem('user');
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
    const url = `${process.env.NEXT_PUBLIC_URL}/authentication/logout`;
        Axios.get(url)
        .then((response)=>{
            setUser({});
            localStorage.clear();
            navigate("/");
        })
        .catch((error)=>{
            console.log(error);
        })
  }

  return (
    <AppContext.Provider value={{ user, setUser, isLoading, setIsLoading}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}