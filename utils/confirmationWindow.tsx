import React, { useEffect } from "react";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { deleteHabit } from "./allHabitsUtils/deleteHabit";
import HabitCard from "@/app/pages/AllHabits/components/HabitCard";


export function ConfirmationWindow(){
    const {openConfirmationWindowObject, allHabitsObject, clickedHabitIDObject} = useGlobalContextProvider();
    const {openConfirmationWindow, setOpenConfirmationWindow} = openConfirmationWindowObject;
    const {allHabits, setAllHabits} = allHabitsObject;
    const {clickedHabitID} = clickedHabitIDObject;

    function Delete(){
        const habitToDelete = allHabits.filter(habit => (habit._id == clickedHabitID));
        deleteHabit(allHabits, setAllHabits, habitToDelete[0])
        const updatedHabits = allHabits.filter(habit => (habit._id != clickedHabitID));
        // Update the state with the modified habits array
        setAllHabits(updatedHabits);
        setOpenConfirmationWindow(false)
    }
    // useEffect(() => {
    //     console.log(allHabits);
    // }, [allHabits]);


    return(
        <div 
        style={{
            left: "0",
            right: "0",
            maxWidth: "500px",
            marginLeft: "auto",
            marginRight: "auto",
            top: "30%",
            transform: "translateY(-50%)",
        }}
        className= {`fixed shadow-md rounded-md md:w-[450px] w-[310px] 
        bg-white py-8 pt-10 p-4 z-50 flex flex-col gap-2 items-center 
        bg-gray-600 bg-opacity-50 backdrop-blur-lg 
        ${openConfirmationWindow ? "fixed": "hidden"}`}
        >
        <span className="font-bold text-xl"> {`Are you sure`} </span>
        <span className="text-center text-[13px] opacity-75">
            Are you sure you want to delete this habit?
            <br/>
            This action cannot be undone.
        </span>

        <div className="flex gap-2 mt-5">
            <button
            onClick={() => setOpenConfirmationWindow(false)}
            className="border text-[13px] w-full px-10 p-3 rounded-md"
            >
                Cancel
            </button>
            <button 
            className="w-full px-10 text-[13px] p-3 text-white rounded-md bg-primary"
            onClick={Delete}
            >
                
                Delete
            </button>
        </div>
        </div>
    )


}