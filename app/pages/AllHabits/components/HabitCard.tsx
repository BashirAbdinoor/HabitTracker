import React, { useEffect, useState, useRef } from "react";
import { Checkbox, IconButton } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGlobalContextProvider } from '@/app/types/contextAPI';
import { darkModeColor, defaultColor } from '@/colors';
import DropDown from "@/utils/dropDown";
import Portal from "@/utils/portal";
import { HabitType } from "@/app/types/globalType";
import { editHabit } from "@/utils/editHabit";

function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
  const { 
    darkModeObject, 
    allHabitsObject, 
    selectedCurrentDayObject, 
    dropDownObject, 
    dropDownPositionObject,
    clickedHabitIDObject
  } = useGlobalContextProvider();
  
  const { isDarkMode } = darkModeObject;
  const { openDropDown, setOpenDropDown } = dropDownObject;
  const { setDropDownPosition } = dropDownPositionObject;
  const { setAllHabits, allHabits } = allHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { clickedHabitID, setClickedHabitID } = clickedHabitIDObject;

  const [checked, setChecked] = useState(
    singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
  );

  const moreVertRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setChecked(singleHabit.completedDays.some((day) => day.date === selectedCurrentDate));
  }, [selectedCurrentDate, singleHabit.completedDays]);

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);

    // Update the completedDays for the specific habit
    const updatedHabits = allHabits.map(habit => {
        if (habit._id === singleHabit._id) {
            const updatedHabit = {
                ...habit,
                completedDays: isChecked
                    ? [...habit.completedDays, { _id: habit._id, date: selectedCurrentDate }]
                    : habit.completedDays.filter(day => day.date !== selectedCurrentDate),
            };
            return updatedHabit;
        }
        return habit;
    });

    // Find the updated habit
    const updatedHabit = updatedHabits.find(habit => habit._id === singleHabit._id);

    if (updatedHabit) {
        // Call the editHabit function to update the database and state
        await editHabit(allHabits, setAllHabits, updatedHabit);
    }
    
    setAllHabits(updatedHabits);
  };

  const handleOptionsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (moreVertRef.current) {
      const rect = moreVertRef.current.getBoundingClientRect();
      setDropDownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }

    // Toggle dropdown state
    if (clickedHabitID === singleHabit._id) {
      setOpenDropDown(!openDropDown);
    } else {
      setClickedHabitID(singleHabit._id);
      setOpenDropDown(true);
    }
    
    
  };

  return (
    <div className="flex p-3 items-center justify-between">
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={checked}
        onChange={handleCheckboxChange}
        sx={{
          color: defaultColor.default,
          '&.Mui-checked': { color: defaultColor.default },
        }}
      />
      
      <div
        style={{ backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate }}
        className="flex justify-between gap-2 w-full p-3 py-4 rounded-md relative"
      >
        <div className="w-full">
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                className="p-3 rounded-full w-4 h-4 bg-primary text-white"
                icon={singleHabit.icon}
              />
              <span>{singleHabit.name}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-3">
            {singleHabit.tags?.map((tag, idx) => (
              <div
                key={idx}
                style={{
                  color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                  backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
                }}
                className="p-1 text-[12px] rounded-md px-2"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="w-10 flex items-center justify-center">
          <IconButton 
            ref={moreVertRef} 
            onClick={handleOptionsClick}
            data-testid="habit-options-button"
          >
            <MoreVertIcon sx={{ color: isDarkMode ? "white" : "grey" }} />
          </IconButton>
        </div>
      </div>

      {clickedHabitID === singleHabit._id && openDropDown && (
        <Portal>
          <DropDown singleHabit={singleHabit} />
        </Portal>
      )}
    </div>
  );
}

export default HabitCard;

