import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";

function DarkMode() {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode, setDarkMode } = darkModeObject;

  // Handle clicking to toggle dark mode
    const handleToggleDarkMode = () => {
      setDarkMode(!isDarkMode);  // Toggle the dark mode state
    };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
      }}
      className="bg-slate-100 w-[45px] relative rounded-3xl flex"
    >
      {/* Only one icon (faMoon) used for both states */}
      <div
        onClick={handleToggleDarkMode} // Toggle dark mode
        className="h-full w-[45px] z-40 flex justify-center items-center cursor-pointer"
      >
        <FontAwesomeIcon
          className={`cursor-pointer ${isDarkMode ? "text-primary" : "text-grey-300"}`}
          icon={faMoon}  // Always use faMoon for the toggle
          width={20}
          height={20}
        />
      </div>

      {/* Sliding Circle with same size as container ${
          isDarkMode ? "translate-x-[45px]" : "translate-x-0"} */}
      <div
        className={`w-[45px] h-[45px] absolute  transform transition-all rounded-full bg-white `}
      ></div>
    </div>
  );
}

export default DarkMode;
