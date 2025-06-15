import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor } from "@/colors";

function StatisticTopBar(){
    const {openSideBarObject, darkModeObject} = useGlobalContextProvider();
    const {setOpenSideBar} = openSideBarObject;
    const {isDarkMode} = darkModeObject;
    return (
        <div 
        style={{
            backgroundColor: isDarkMode ? darkModeColor.background : "white",
            color: isDarkMode ? darkModeColor.textColor : "black",
        }}
        className="p-6 rounded-md flex justify-between items-center transition-all"
        >
            <span className="text-xl font-bold"> Statistics </span>
           
            <FontAwesomeIcon
                onClick={() => setOpenSideBar(true)}
                className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
                icon={faBars}
                />
        </div>
    )
}
export default StatisticTopBar;