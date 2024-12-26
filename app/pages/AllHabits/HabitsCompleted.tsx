import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { green } from "@mui/material/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";

function HabitsCompleted(){
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    return (
        <div 
        style={{
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
            backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
        }}
        className=" mt-7 p-8 rounded-md">
            <span className="font-bold text-1g mb-2 "> Habits Completed</span>
            <div className="mt-7 opacity-50">
                <HabitCard/>
                <HabitCard/>
            </div>
        </div>
    )
}
export default HabitsCompleted

function HabitCard() {

    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    return (
      <div className="flex p-3 items-center justify-between">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          sx={{
            color: defaultColor.default,
            "&.Mui-checked": {
              color: defaultColor,
            },
          }}
        />
        <div  
        style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
    }}
    className="flex justify-between gap-2 w-full p-3 py-4 rounded-md ">
          <div className=" w-full">
            <div className="flex gap-2 justify-between ">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="p-3 rounded-full w-4 h-4 bg-primary text-white"
                  height={20}
                  width={20}
                  icon={faCode}
                />
                <span>Coding</span>
              </div>
            </div>
  
            {/* divs for the areas */}
            <div className="flex gap-2 mt-3">
              <div 
    style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
    }}
    className="p-1 text-white text-[12px] rounded-md px-2">
                <span>Aria 1</span>
              </div>
              <div 
    style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
    }}
    className="p-1 text-white text-[12px] rounded-md px-2">
                <span>Aria 2</span>
              </div>
            </div>
          </div>
  
          {/* Div for three dots */}
          <div className="w-10 flex items-center justify-center">
          <IconButton>
            <MoreVertIcon sx={{color: isDarkMode ? "white": "grey" }} />
            </IconButton>
          </div>
        </div>
      </div>
    )}