import Logo from "/voyager-logo.png"
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../../context/userContext'

export default function LandingNav(props) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogOut = () => {
    logout();
  }

  //HOME PAGE NAV BAR
  if(props.type === "Home"){
    return (
      <nav class="flex items-center justify-between flex-wrap bg-black pt-10">
        <div class="flex items-center flex-shrink-0 text-white lg:ml-56">
          <img src={Logo} class="fill-current " width="283" height="74" viewBox="0 0 283 74"></img>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-main-blue border-main-blue" onClick={toggleMenu}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class={`w-full ${isMenuOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto flex-grow-row-reverse lg:mr-56 font-bold`}>
          <div class="text-lg lg:flex-grow ">
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Featured
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              FAQ
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/Login" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Login
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue" ></span>
            </Link>
            <Link to="/SignUp" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue">
              Signup
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  //LOGGED IN USER NAV BAR
  else if (props.type === "User"){
    return (
      <nav class="flex items-center justify-between flex-wrap bg-black pt-10">
        <div class="flex items-center flex-shrink-0 text-white lg:ml-56">
          <img src={Logo} class="fill-current " width="283" height="74" viewBox="0 0 283 74"></img>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-main-blue border-main-blue" onClick={toggleMenu}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class={`w-full ${isMenuOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto flex-grow-row-reverse lg:mr-56 font-bold`}>
          <div class="text-lg lg:flex-grow ">
          <Link to="/Post" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Add
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/Browse" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Browse
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/MyRentals" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              My Rentals
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/MyVehicles" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              My Vehicles
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue" onClick={handleLogOut}>
              Log Out
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  //LOGGED IN USER NAV BAR
  else if (props.type === "Company"){
    return (
      <nav class="flex items-center justify-between flex-wrap bg-black pt-10">
        <div class="flex items-center flex-shrink-0 text-white lg:ml-56">
          <img src={Logo} class="fill-current " width="283" height="74" viewBox="0 0 283 74"></img>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-main-blue border-main-blue" onClick={toggleMenu}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class={`w-full ${isMenuOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto flex-grow-row-reverse lg:mr-56 font-bold`}>
          <div class="text-lg lg:flex-grow ">
          <Link to="/Post" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Add
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/MyVehicles" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              My Vehicles
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue" onClick={handleLogOut}>
              Log Out
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  //INSPECTOR NAV BAR
  else if (props.type === "Inspector"){
    return (
      <nav class="flex items-center justify-between flex-wrap bg-black pt-10">
        <div class="flex items-center flex-shrink-0 text-white lg:ml-56">
          <img src={Logo} class="fill-current " width="283" height="74" viewBox="0 0 283 74"></img>
        </div>
        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-main-blue border-main-blue" onClick={toggleMenu}>
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div class={`w-full ${isMenuOpen ? '' : 'hidden'} lg:flex lg:items-center lg:w-auto flex-grow-row-reverse lg:mr-56 font-bold`}>
          <div class="text-lg lg:flex-grow ">
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
              Vehicles to inspect
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
            <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12" onClick={handleLogOut}>
              Log Out
              <span class="block max-w-0 group-hover:max-w-full transition-all duration-400 h-0.5 bg-main-blue"></span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
