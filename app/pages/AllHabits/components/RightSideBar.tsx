//get username from database. or ask what is their name & use that.
import React from "react";
import UserProfile from "./RightSideBar/userProfile";
import MainStats from "./RightSideBar/MainStats";
import Calendar from "./RightSideBar/calendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { defaultColor, darkModeColor } from "@/colors";

function RightSideBar(){
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;

    return (
        <div 
        style={{
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
            backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
        }}
        className=" flex flex-col items-center-center m-3 rounded-lg p-2">
            {/* <UserProfile/> */}
            <MainStats/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Calendar/>
            </LocalizationProvider>
            
        </div>
    )
}
export default RightSideBar;