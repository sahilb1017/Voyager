import Logo from "/voyager-logo.png"
import { Link } from "react-router-dom"
import { useState } from "react";

export default function LogoNav() {

  return (
    <nav class="flex items-center justify-between flex-wrap bg-black pt-10 absolute">
      <div class="flex items-center flex-shrink-0 text-white lg:ml-48">
        <img src={Logo} class="fill-current " width="200" height="74" viewBox="0 0 283 74"></img>
      </div>
    </nav>
  );
}