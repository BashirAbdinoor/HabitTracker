import React, { useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { defaultColor, darkModeColor } from "@/colors";
import AllHabitsSearchBar from "./AllHabitsSearchBar";


function AllHabitsTopBar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;

  

  // Function to toggle the sidebar visibility
  function openSideBarFunction() {
    setOpenSideBar(!openSideBar);
  };

  useEffect(() => {
    function handleResize(){
      setOpenSideBar(false)
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])


  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
      }}
      className="bg-white p-5 rounded-md flex justify-between items-center"
    >
      {/* User profile section */}
      <div className="flex gap-4">
        <div className="flex flex-col max-md:hidden">
          <span className="text-xl">
            <span className="font-bold">Hi there</span>
            <span className="font-light">, Ali</span>
          </span>
          <span className="font-light text-[12px] text-grey-400">Welcome Back!</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-between">
        <AllHabitsSearchBar />
        <DarkMode />
        {/* Show the hamburger icon only when the sidebar is hidden */}
     
          <FontAwesomeIcon
            onClick={openSideBarFunction}
            className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
            icon={faBars}
          />
          
  
      </div>
    </div>
  );
}

export default AllHabitsTopBar;
