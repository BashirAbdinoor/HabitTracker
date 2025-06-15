import { useEffect } from "react";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import toast from "react-hot-toast";

// Fixed: Renamed to useGetAllHabits (starts with "use")
export function useGetAllHabits() {
  const { allHabitsObject } = useGlobalContextProvider();
  const { setAllHabits } = allHabitsObject;
  console.log("we are in getallHabit")

  useEffect(() => {
    async function fetchHabits() {
      try {
        const response = await fetch("/api/habits", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get habits");
        }

        setAllHabits(data.habits);
        toast.success("Habits successfully fetched");
      } catch (error: any) {
        console.error("Fetch habits error:", error);
        toast.error(error.message || "Something went wrong");
      }
    }

    fetchHabits();
  }, [setAllHabits]); 
}