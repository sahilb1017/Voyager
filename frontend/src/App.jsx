import Home from "./pages/Home";
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
          <Route path="/Browse" element={<Browse />} />
          <Route path="/Inspect" element={<Inspect />} />
          <Route path="/MyRentals" element={<MyRentals />} />
          <Route path="/MyVehicles" element={<MyVehicles />} />
        </Routes>
      </Router>
    </div>
  )
}

