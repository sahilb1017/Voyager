import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SelectUser from "./pages/SelectUser";
import RegisterUser from "./pages/RegisterUser";
import RegisterCompany from "./pages/RegisterCompany";
import Booking from "./pages/Booking";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login"element = {<Login/>}/>
          <Route path="/SignUp"element = {<SignUp/>}/>
          <Route path="/SelectUser"element = {<SelectUser/>}/>
          <Route path="/RegisterUser"element = {<RegisterUser/>}/>
          <Route path="/RegisterCompany" element = {<RegisterCompany/>}/>
          <Route path="/Booking"element = {<Booking/>}/>
        </Routes>
      </Router>
    </div>
  )
}

