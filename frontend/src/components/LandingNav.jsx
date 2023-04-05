import Logo from "/voyager-logo.png"
import { Link } from "react-router-dom"
import { useState } from "react";

export default function LandingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav class="flex items-center justify-between flex-wrap bg-black p-6">
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
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
          </Link>
          <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
            FAQ
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
          </Link>
          <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
            Login
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
          </Link>
          <Link to="/" class="group transition duration-300 block mt-4 lg:inline-block lg:mt-0 text-main-blue mr-12">
            Signup
            <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}