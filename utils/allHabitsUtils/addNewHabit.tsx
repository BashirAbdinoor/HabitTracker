import { HabitType } from "@/app/types/globalType";
import toast from "react-hot-toast";
import {iconToText} from "@/app/pages/AllHabits/components/IconsWindow/IconData"

export async function addNewHabit({
    allHabits,
    setAllHabits,
    newHabit,
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    newHabit: Omit<HabitType, "_id">;
}) {
    const { icon } = newHabit;
    const HabitIconToText = iconToText(icon);
    const updatedHabit = { ...newHabit, icon: HabitIconToText };
    

    try {
        const response = await fetch("/api/habits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedHabit),
        });
        console.log(response)
        

        const data = await response.json();
        

        if (!response.ok) {
            throw new Error(data.error || "Failed to add habit");
        }

        // Now using lowercase 'habit' to match server response
        if (!data?.habit?._id) {
            throw new Error("Invalid habit data received");
        }

        setAllHabits([...allHabits, { ...newHabit, _id: data.habit._id }]);
        toast.success("Habit successfully added");
    } catch (error: any) {
        console.error("Add habit error:", error);
        toast.error(error.message || "Something went wrong");
    }
}
