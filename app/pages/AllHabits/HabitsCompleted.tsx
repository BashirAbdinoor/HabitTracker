import React from "react";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";
import { HabitType } from "@/app/types/globalType";  // Assuming you have a HabitType defined
import Archery from "@/assets/archery";
import toast from "react-hot-toast";
import { iconToText } from "./components/IconsWindow/IconData";

interface HabitsCompletedProps {
  completedHabits: HabitType[];  // Ensure this is an array of habit objects
  setAllHabits: (habits: HabitType[]) => void;  // Prop for updating allHabits in global state
  selectedCurrentDate: string;
}

function HabitsCompleted({ completedHabits, setAllHabits, selectedCurrentDate }: HabitsCompletedProps) {
  const { darkModeObject, allHabitsObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const {allHabits} = allHabitsObject;

  const handleUncheck = async (habitToUncheck: HabitType) => {
    // Remove the completed day from the habit that was unchecked
    const updatedHabit = {
      ...habitToUncheck,
      completedDays: habitToUncheck.completedDays.filter(
        (day) => day.date !== selectedCurrentDate // Remove the unchecked day's date
      ),
    };
  
    // Find the habit in the allHabits list and update it
    const updatedHabits = allHabits.map((habit) => {
      if (habit._id === habitToUncheck._id) {
        return updatedHabit; // Replace the unchecked habit with the updated one
      }
      return habit; // Keep the rest of the habits intact
    });
  
    // Update the global state with the modified habits
    setAllHabits(updatedHabits);
    try {
    const response = await fetch(`/api/habits?habitId=${updatedHabit._id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: updatedHabit.name,
        icon: iconToText(updatedHabit.icon),
        frequency: updatedHabit.frequency,
        completedDays: updatedHabit.completedDays, // Send directly (correct structure)
      }), // Removed activeDropDown
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Failed to update habit");
    }

    toast.success("Habit updated successfully!");
  } catch (error: any) {
    console.error("Update failed:", error);
    // Revert UI state on error
    setAllHabits(allHabits);
    toast.error(error.message || "Failed to update habit");
  }
  };
  

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
      }}
      className="mt-7 p-8 rounded-md"
    >
      <span className="font-bold text-lg mb-2">Habits Completed</span>
      <div className="mt-7 opacity-50">
        {completedHabits.length > 0 ? (
          completedHabits.map((singleHabit, index) => (
            <div key={index}>
              <div
                style={{
                  backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
                }}
                className="flex justify-between gap-2 w-full p-3 py-4 rounded-md"
              >
                {/* Uncheck Checkbox on the left side */}
                <div className="flex items-center">
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    checked
                    onChange={() => handleUncheck(singleHabit)}
                    sx={{
                      color: defaultColor.default,
                      "&.Mui-checked": {
                        color: defaultColor.default,
                      },
                    }}
                  />
                </div>

                {/* Habit Name and Icon */}
                <div className="w-full">
                  <div className="flex gap-2 justify-between">
                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        className="p-3 rounded-full w-4 h-4 bg-primary text-white"
                        height={20}
                        width={20}
                        icon={singleHabit.icon || "faCode"} // Default to faCode if no icon provided
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
                        className="p-1 text-white text-[12px] rounded-md px-2"
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

        
              </div>
            </div>
          ))
        ) : (
          <Archery/>
        )}
      </div>
    </div>
  );
}

export default HabitsCompleted;
