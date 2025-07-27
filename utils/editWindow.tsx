//dropDown menu is all over the board. done
//if you touch edit and change your mind. done
//Day options has to be same as the old version.
//make sure no other changes are made

"use client"

import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";
import { faChevronDown, faClose, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState, useRef } from "react";
import IconsWindow from "@/app/pages/AllHabits/components/IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";
import { daysOption, HabitType } from "@/app/types/globalType";
import { editHabit } from "./editHabit";





function EditWindow() {
    const { openEditWindowObject, darkModeObject, singleHabitItemObject } = useGlobalContextProvider();
    const { openEditWindow } = openEditWindowObject;
    const { isDarkMode } = darkModeObject;
    const {singleHabitItem, setSingleHabitItem} = singleHabitItemObject;

   

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(faStairs);

    const [allDays, setAllDays] = useState<daysOption>([]);

    const onUpdateHabitName = (inputText: string) => {
        setSingleHabitItem((prevState) => ({
            ...prevState,
            name: inputText,
        }));
    };
    useEffect(() => {
        if (openEditWindow && singleHabitItem) {
            setIconSelected(singleHabitItem.icon);
            setAllDays(singleHabitItem.frequency);
        }
    }, [openEditWindow]);
    


    useEffect(() => {
        setSingleHabitItem((prevHabitItem) => ({
            ...prevHabitItem,
            icon: iconSelected
        }));
    }, [iconSelected, openEditWindow]);

    function changeDaysOption(allDays: daysOption) {
        setSingleHabitItem((prevState) => ({ 
            ...prevState,
            frequency: allDays,
        }))
    }

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
            }}
            className={`absolute left-[40%] transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md mt-6 ${openEditWindow ? "block" : "hidden"}`}
        >
            <IconsWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
                setIconSelected={setIconSelected}
            />
            <Header />
            <InputNameAndIconButton
                onUpdateHabitName={onUpdateHabitName}
                HabitName={singleHabitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <Repeat 
                onchangeDaysOption={changeDaysOption} 
                allDays={allDays}
                setAllDays={setAllDays} 
            />
            <SaveButton Habit={singleHabitItem} /> 
        </div>
    );
}

export default EditWindow;

const Header = () => {
    const { openEditWindowObject } = useGlobalContextProvider();
    const { setOpenEditWindow } = openEditWindowObject;

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">Edit a Habit</span>
            <FontAwesomeIcon
                onClick={() => setOpenEditWindow(false)}
                className="text-grey-400 cursor-pointer"
                icon={faClose}
            />
        </div>
    );
};

const InputNameAndIconButton = memo(
    ({
        onUpdateHabitName,
        HabitName,
        setOpenIconWindow,
        iconSelected,
    }: {
        onUpdateHabitName: (inputText: string) => void;
        HabitName: string;
        setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
        iconSelected: IconProp;
    }) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const { openEditWindowObject, darkModeObject, singleHabitItemObject } = useGlobalContextProvider();
        const { openEditWindow } = openEditWindowObject;
        const { isDarkMode } = darkModeObject;
        const {singleHabitItem} = singleHabitItemObject;

        function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
            onUpdateHabitName(event.target.value);
        }

        useEffect(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);

            if (!openEditWindow) {
                onUpdateHabitName(singleHabitItem.name); // Clear input field when the window is closed
            }
        }, [openEditWindow]);

        return (
            <div className="flex flex-col gap-2 mt-10 px-3">
                <span className="opacity-80 font-semibold">Habit Name</span>
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
                        onClick={() => {
                            setOpenIconWindow(true);
                        }}
                        className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-primary"
                        icon={iconSelected}
                        height={16}
                        width={20}
                    />
                </div>
            </div>
        );
    }
);

const Repeat = memo(
    ({
        onchangeDaysOption,
        allDays,
        setAllDays,
    }: {
        onchangeDaysOption: (allDays: daysOption) => void;
        allDays: daysOption;
        setAllDays: React.Dispatch<React.SetStateAction<daysOption>>;
    }) => {
        const { darkModeObject } = useGlobalContextProvider();
        const { isDarkMode } = darkModeObject;

        useEffect(() => {
            onchangeDaysOption(allDays);
        }, [allDays]);
        
        return (
            <div className="flex flex-col gap-2 mt-10 px-3">
                <span className="font-semibold text-[17px]">Repeat</span>
                {<DailyOptions allDays={allDays} setAllDays={setAllDays} />}
            </div>
        );
    }
);

const DailyOptions = memo(
    ({ allDays, setAllDays }: { allDays: daysOption; setAllDays: React.Dispatch<React.SetStateAction<daysOption>> }) => {
        const { darkModeObject } = useGlobalContextProvider();
        const { isDarkMode } = darkModeObject;

        function selectedDays(singleDayIndex: number) {
            const selectedCount: number = allDays.filter((singleDay) => singleDay.isSelected).length;

            // Prevent deselecting the last selected day
            if (selectedCount === 1 && allDays[singleDayIndex].isSelected) {
                return;
            }

            // Update the selected status of the clicked day
            const updatedDays = allDays.map((singleDay, index) =>
                index === singleDayIndex
                    ? { ...singleDay, isSelected: !singleDay.isSelected }
                    : singleDay
            );

            // Update the state
            setAllDays(updatedDays); 
        }

        return (
            <div className="flex gap-2 mt-4">
                {allDays.map((day, index) => (
                    <button
                        key={day.id}
                        onClick={() => selectedDays(index)}
                        style={{
                            backgroundColor: day.isSelected
                                ? defaultColor.default
                                : isDarkMode
                                ? darkModeColor.background
                                : "white",
                            color: day.isSelected
                                ? "white"
                                : isDarkMode
                                ? darkModeColor.textColor
                                : defaultColor.textColor,
                        }}
                        className="p-2 px-3 rounded-md text-sm cursor-pointer"
                    >
                        {day.name}
                    </button>
                ))}
            </div>
        );
    }
);

const SaveButton = memo(({ Habit }: { Habit: HabitType }) => { 
    const { allHabitsObject, openEditWindowObject, singleHabitItemObject, clickedHabitIDObject } = useGlobalContextProvider();
    const { setOpenEditWindow } = openEditWindowObject;
    const { allHabits, setAllHabits } = allHabitsObject;
    const {singleHabitItem, setSingleHabitItem} = singleHabitItemObject;
    const {clickedHabitID} = clickedHabitIDObject;
    

    function checkNewHabitobject() {
        const updatedHabits = allHabits.filter(habit => (habit._id != clickedHabitID));
        
        
        
        if (Habit.name.trim() === "") {
            return toast.error("The name field is still empty");
        }
        const habitExist = updatedHabits.some((singleHabit) => singleHabit.name === Habit.name);
        if (!habitExist) {
            // Perform any side effects with the updated state
            editHabit({ allHabits: updatedHabits, setAllHabits, habit: Habit});

            setOpenEditWindow(false);
            
        } else {
            return toast.error("Habit Already Exists");
        }
    }

    return (
        <div className="w-full flex justify-center mt-9">
            <button
                onClick={checkNewHabitobject}
                className="bg-primary p-4 w-[98%] rounded-md text-white"
            >
                Edit a Habit
            </button>
        </div>
    );
});
