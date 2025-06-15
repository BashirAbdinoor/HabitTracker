import React from "react";
import AllHabitsTopBar from "./components/AllHabitsTopBar";
import RightSideBar from "./components/RightSideBar";
import HabitsContainer from "./components/HabitsContainer";
import HabitWindow from "./components/HabitWindow";
import {Toaster} from "react-hot-toast";
import { ConfirmationWindow } from "@/utils/confirmationWindow";
import DropDown from "@/utils/dropDown";
import EditWindow from "@/utils/editWindow";


function AllHabits(){
    return (
             <div className="max-lg:flex-col w-full flex flex-row gap-0 relative">
            <ConfirmationWindow/>
            <EditWindow/>
            {/* <DropDown/> */}
            <Toaster/>
             <HabitWindow/>
        <div className="flex-col flex-grow m-3 ">
            
            <AllHabitsTopBar/>
            <HabitsContainer/>
        </div>
        <RightSideBar/>
    </div>

   
)
}

export default AllHabits;


