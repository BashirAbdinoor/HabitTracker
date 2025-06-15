"use client";
import React, { useEffect } from "react";
import { faPlus, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { getCurrentDayName, getDateString, getFormattedDate } from "@/utils/allHabitsUtils/dateFunctions";


function HabitsContainerTop() {
  // Access the context for habit window state
  const { habitWindowObject, selectedCurrentDayObject, offsetDayObject, singleHabitItemObject, allHabitsObject } = useGlobalContextProvider();
  const { setOpenHabitWindow } = habitWindowObject;
  const {selectedCurrentDate, setSelectedCurrentDate} = selectedCurrentDayObject;
  const {offsetDay, setOffsetDay} = offsetDayObject;
  const {setSingleHabitItem} = singleHabitItemObject;
  const {allHabits, setAllHabits} = allHabitsObject

  type Option = "next" | "prev";
  
  function updateDate(option: Option){
    if (option === "next") {
      setOffsetDay((prev) => prev + 1)
    }
    if (option === "prev"){
      setOffsetDay((prev) => prev - 1)

    }
  }
  function addHabit(){
    setSingleHabitItem({
      _id: "0",
      name: "",
      icon: faStairs,
      frequency: [
        { id: 1, name: "Monday", isSelected: true },
        { id: 2, name: "Tuesday", isSelected: true },
        { id: 3, name: "Wednesday", isSelected: true },
        { id: 4, name: "Thursday", isSelected: true },
        { id: 5, name: "Friday", isSelected: true },
        { id: 6, name: "Saturday", isSelected: true },
        { id: 7, name: "Sunday", isSelected: true },
      ],
      completedDays: [],
      activeDropDown: false,
  })
  setOpenHabitWindow(true)
  }

  useEffect(() => {

    setSelectedCurrentDate(getDateString(new Date(), offsetDay))
    console.log(allHabits)
  }, [offsetDay, allHabits])

  return (
    <div className="p-3 flex justify-between items-center">
      {/* Date and Navigation */}
      <div className="flex gap-4 items-center">
        <div>
          <h2 className="font-bold text-lg w-28">
            {getCurrentDayName(selectedCurrentDate)}
            </h2> {/* Corrected text size */}
          <span className="font-light text-[12px]">
            {getFormattedDate(selectedCurrentDate)}
            </span>
        </div>
        <div className="flex gap-1 ml-4">
          <div 
          onClick={() => {updateDate("prev")}}
          className="text-primary cursor-pointer">
            <ArrowCircleLeftOutlinedIcon />
          </div>
          <div 
          onClick={() => {updateDate("next")}}          
          className="text-primary cursor-pointer">
            <ArrowCircleRightOutlinedIcon />
          </div>
        </div>
      </div>

      {/* New Habit Button */}
      <button
        className="flex gap-2 items-center bg-primary p-3 text-white rounded-md text-sm"
        onClick={addHabit} // Toggling state
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
