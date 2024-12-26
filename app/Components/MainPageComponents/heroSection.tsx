import React from "react";

function HeroSection(){
    return (
        <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
  <div className="flex items-center gap-1 text-lg"> {/* Added flex to ensure inline text */}
    Build the habits that
    <span className="text-primary ml-1"> Matter!</span> {/* Added margin left for spacing */}
  </div>
  <p className="text-center text-sm sm:w-[430px] w-[370px]">
    Feeling overwhelmed? Our easy to use habit tracker helps you
    take control of your day and achieve your goals.
  </p>
  <button 
    className="block text-sm font-light rounded-lg px-9 py-3 text-white transition bg-primary focus:outline-none"
    type="button"
  >
    Let's get started!
  </button>
</div>

    )
}
export default HeroSection