import React, {useRef, useEffect} from "react";
import LogoAnName from "./logoAnName";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import MenuSelection from "./menuSelction";
import { darkModeColor, defaultColor } from "@/colors";
import LogOutSection from "./logOutSection";

function Sidebar(){
  const {openSideBarObject, darkModeObject} = useGlobalContextProvider();
  const {openSideBar, setOpenSideBar} = openSideBarObject;
  const {isDarkMode} = darkModeObject;
  const sideBarRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
      function handleOutsideClicked(event: MouseEvent) {
        if (!sideBarRef.current?.contains(event.target as Node)){
          setOpenSideBar(false);
        }
      }
      document.addEventListener("click", handleOutsideClicked);

      return () => {
        document.removeEventListener("click", handleOutsideClicked);

      }
  }, [openSideBar])

  return (
    <div 
    style={{
      color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
    }}
    ref={sideBarRef}
    className={`${
      !openSideBar ? "max-xl:hidden": "fixed shadow-lg"
    } flex-grow z-50 p-10 flex-col bg-white min-h-screen transition-all`}
    >
      <LogoAnName/>
      <MenuSelection/>
      {/* <LogOutSection/> */}
    </div>
  )
}

export default Sidebar