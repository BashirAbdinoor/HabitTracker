import { HabitType } from "@/app/types/globalType";
import toast from "react-hot-toast";
import {iconToText} from "@/app/pages/AllHabits/components/IconsWindow/IconData"

export async function editHabit({
    allHabits,
    setAllHabits,
    habit
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    habit: HabitType
}) {
    

    try {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
              method: "PUT",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name: habit.name, 
                  icon: iconToText(habit.icon), 
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
        // console.log(data)

        setAllHabits([...allHabits, { ...habit, _id: data.habit._id }]);
        toast.success("Habit successfully edited");
    } catch (error: any) {
        // console.error("Edit habit error:", error);
        toast.error(error.message || "Something went wrong");
        
    }
}