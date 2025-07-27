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
        openSideBar ? "fixed" : "hidden"
      } xl:relative xl:flex xl:flex-shrink-0 h-full z-50 p-6 flex-col w-64 border-r transition-all`}
      >
      <LogoAnName/>
      <MenuSelection/>
      {/* <LogOutSection/> */}
    </div>
  )
}

export default Sidebar