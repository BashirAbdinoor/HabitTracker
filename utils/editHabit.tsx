// import { iconToText } from "@/app/pages/AllHabits/components/IconsWindow/IconData";
// import { HabitType } from "@/app/types/globalType";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { Dispatch, SetStateAction } from "react";
// import toast from "react-hot-toast"




// export default function convertIconstoTextofHabits(habit:HabitType) {
//     const {icon} = habit

//     const HabitIconToText = iconToText(icon as IconProp)
    
//     const updatedHabit = {... habit, icon: HabitIconToText}
//     return updatedHabit

// }

// export async function editHabit({allHabits, setAllHabits, selectedItems, habit}: {
//     allHabits: HabitType[],
//     setAllHabits: Dispatch<SetStateAction<<HabitType[]>>,
//     selectedItems: HabitType | null,
//     habit: HabitType
// }) {
//     try{
//         const currentHabitSelected = selectedItems as HabitType;
//         const findTheHabit = allHabits.findIndex(
//             (singleHabit) => singleHabit._id === currentHabitSelected._id
//         );
//         const copyAllHabits = [...allHabits]

//         copyAllHabits[findTheHabit] = habit;
//         const updatedHabit = convertIconstoTextofHabits(habit)
//     }
    
// }

import { HabitType } from "@/app/types/globalType";
import toast from "react-hot-toast";
import {iconToText} from "@/app/pages/AllHabits/components/IconsWindow/IconData"

export async function editHabit({
    allHabits,
    setAllHabits,
    habit,
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    habit: HabitType
}) {
    const { icon } = habit;
    const HabitIconToText = iconToText(icon);
    const updatedHabit = { ...habit, icon: HabitIconToText };
    

    try {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name: habit.name, 
                  icon: updatedHabit.icon, 
                  frequency: habit.frequency, 
                  completedDays: habit.completedDays,
                  activeDropDown: habit.activeDropDown,
                 }),
            });
        const data = await response.json();
        

        if (!response.ok) {
            throw new Error(data.error || "Failed to edit habit");
        }

        // Now using lowercase 'habit' to match server response
        if (!data?.habit?._id) {
            throw new Error("Invalid habit data received");
        }

        setAllHabits([...allHabits, { ...habit, _id: data.habit._id }]);
        toast.success("Habit successfully edited");
    } catch (error: any) {
        console.error("Edit habit error:", error);
        toast.error(error.message || "Something went wrong");
    }
}
