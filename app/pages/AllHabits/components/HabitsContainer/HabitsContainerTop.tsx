"use client";
import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useGlobalContextProvider } from "@/app/types/contextAPI";

function HabitsContainerTop() {
  // Access the context for habit window state
  const { habitWindowObject } = useGlobalContextProvider();
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;

  return (
    <div className="p-3 flex justify-between items-center">
      {/* Date and Navigation */}
      <div className="flex gap-4 items-center">
        <div>
          <h2 className="font-bold text-lg">Sunday</h2> {/* Corrected text size */}
          <span className="font-light text-[12px]">15 Dec 2024</span>
        </div>
        <div className="flex gap-1 ml-4">
          <div className="text-primary cursor-pointer">
            <ArrowCircleLeftOutlinedIcon />
          </div>
          <div className="text-primary cursor-pointer">
            <ArrowCircleRightOutlinedIcon />
          </div>
        </div>
      </div>

      {/* New Habit Button */}
      <button
        className="flex gap-2 items-center bg-primary p-3 text-white rounded-md text-sm"
        onClick={() => setOpenHabitWindow(true)} // Toggling state
      >
        <FontAwesomeIcon
          className="text-grey-400 cursor-pointer"
          icon={faPlus}
        />
        <span>New Habit</span>
      </button>
    </div>
  );
}

export default HabitsContainerTop;
