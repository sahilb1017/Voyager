import LandingNav from "./components/LandingNav"
import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <BrowserRouter>
        <LandingNav />
      </BrowserRouter>
    </div>
  )
}

