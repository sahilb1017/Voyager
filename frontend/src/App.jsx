import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SelectUser from "./pages/SelectUser";
import RegisterUser from "./pages/RegisterUser";
import RegisterCompany from "./pages/RegisterCompany";
import Booking from "./pages/Booking";
import Browse from "./pages/Browse";
import Inspect from "./pages/Inspect";
import MyRentals from "./pages/MyRentals";
import MyVehicles from "./pages/MyVehicles";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <div className="w-screen h-screen bg-black ">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login"element = {<Login/>}/>
          <Route path="/SignUp"element = {<SignUp/>}/>
          <Route path="/SelectUser"element = {<SelectUser/>}/>
          <Route path="/RegisterUser"element = {<RegisterUser/>}/>
          <Route path="/RegisterCompany" element = {<RegisterCompany/>}/>
          <Route path="/Booking"element = {<Booking/>}/>
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Inspect" element={<Inspect />} />
          <Route path="/MyRentals" element={<MyRentals />} />
          <Route path="/MyVehicles" element={<MyVehicles />} />
        </Routes>
      </Router>
    </div>
  )
}

