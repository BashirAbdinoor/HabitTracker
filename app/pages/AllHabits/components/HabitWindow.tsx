
"use client"

import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";
import { faClose, faQuestion, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState, useRef } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


//Types for habit
type HabitType = {
    _id: string;
    name: string;
    icon: IconProp
}


function HabitWindow() {
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    // Using useState hook to store the habit item (name and id)
    const [habitItem, setHabitItem] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faStairs,
    });

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon)
    // Function to handle updates in the habit name
    const onUpdateHabitName = (inputText: string) => {
        setHabitItem(prevState => ({
            ...prevState,
            name: inputText
        }));
    }

    return (
            <div
        style={{
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
            backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background
        }}
        className={`absolute left-[40%] transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md 
            ${openHabitWindow ? "block" : "hidden"} mt-6`}  // Adding mt-12 to give margin from the top
    >
        <IconsWindow
        openIconWindow={openIconWindow}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected ={iconSelected}
        setIconSelected = {setIconSelected}
            />
        <Header />
        <InputNameAndIconButton
            onUpdateHabitName={onUpdateHabitName}
            HabitName={habitItem.name}
            setOpenIconWindow={setOpenIconWindow}
            iconSelected = {iconSelected}
        />
        <SaveButton Habit={habitItem} />
    </div>
    );
}

export default HabitWindow;

function Header() {
    const { habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl "> Add New Habit</span>
            <FontAwesomeIcon
                onClick={() => setOpenHabitWindow(false)}
                className="text-grey-400 cursor-pointer"
                icon={faClose}
            />
        </div>
    )
}

function InputNameAndIconButton({
    onUpdateHabitName,
    HabitName,
    setOpenIconWindow,
    iconSelected,

}: {
    onUpdateHabitName: (inputText: string) => void;
    HabitName: string;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    iconSelected: IconProp
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    // Updates habit name from input field
    function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
        onUpdateHabitName(event.target.value);
    }

    // Focus on input when the component is rendered, and clear the input when closed
    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName(""); // Clear input field when the window is closed
        }
    }, [openHabitWindow]);

    // Clear habit name input
    const clearInput = () => {
        onUpdateHabitName("");
    };

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="opacity-80 font-semibold"> Habit Name </span>
            <div className="flex gap-4 justify-between items-center">
                <input
                    style={{
                        backgroundColor: isDarkMode ? darkModeColor.background : "white",
                    }}
                    ref={inputRef}
                    value={HabitName}
                    onChange={updateInputHabit}
                    className="border w-full border-grey-200 outline-none p-4 rounded-md text-[13px]"
                    placeholder="Type the name of the habit ..."
                />
                <FontAwesomeIcon
                    onClick={() => {setOpenIconWindow(true)}}
                    className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-primary"
                    icon={iconSelected}
                    height={16}
                    width={20}
                />
            </div>
        </div>
    );
}

function SaveButton({ Habit }: { Habit: HabitType }) {
    return (
        <div className="w-full flex justify-center mt-9">
            <button
            onClick={()=> {console.log(Habit)}}
            className="bg-primary p-4 w-[98%] rounded-md text-white "
            >
                Add a Habit
            </button>
        </div>
    )
}
