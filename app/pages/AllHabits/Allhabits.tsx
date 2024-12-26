import React from "react";
import AllHabitsTopBar from "./components/AllHabitsTopBar";
import RightSideBar from "./components/RightSideBar";
import HabitsContainer from "./components/HabitsContainer";
import HabitsCompleted from "./HabitsCompleted";
import HabitWindow from "./components/HabitWindow";


function AllHabits(){
    return (
             <div className="max-lg:flex-col w-full flex flex-row gap-0 relative">
             <HabitWindow/>
        <div className="flex-col flex-grow m-3 ">
            
            <AllHabitsTopBar/>
            <HabitsContainer/>
            <HabitsCompleted/>
        </div>
        <RightSideBar/>
    </div>

   
)
}

export default AllHabits;


