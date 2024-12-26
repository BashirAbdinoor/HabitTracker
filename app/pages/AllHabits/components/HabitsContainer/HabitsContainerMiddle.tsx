import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";

export default function HabitsContainerMiddle() {

  return (
    <div className=" p-3">
      <HabitCard />
      <HabitCard />
      <HabitCard />
      <HabitCard />
      
    </div>
  );
}

function HabitCard() {

    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
  return (
    <div 
    className="flex p-3 items-center justify-between">
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          color: defaultColor.default,
          "&.Mui-checked": {
            color: defaultColor.default,
          },
        }}
      />
      <div 
        style={{
            backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
        }}
        className="flex justify-between gap-2 w-full p-3 py-4 rounded-md ">
            <div className=" w-full">
          <div className="flex gap-2 justify-between">
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
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
            }}
            className="p-1 text-[12px] rounded-md px-2">
              <span>Aria 1</span>
            </div>
            <div 
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
            }}
            className="p-1 text-[12px] rounded-md px-2">
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
  );
}
