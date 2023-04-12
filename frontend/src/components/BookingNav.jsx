import Logo from "/voyager-logo.png"

export default function LogoNav() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-black pt-10">
      <div class="flex items-center flex-shrink-0 text-white lg:ml-40">
        <img src={Logo} class="fill-current " width="200" height="74" viewBox="0 0 200 74"></img>
      </div>
      <div>
        <h1 className="group transition duration-300 block lg:inline-block lg:mt-2 text-main-blue mr-20">
                My Vehicle
        <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
            </h1>
            <h1 className="group transition duration-300 block lg:inline-block lg:mt-0 text-main-blue mr-40">
                Logout
        <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-main-blue"></span>
            </h1>
      </div>
    </nav>
  );
}