"use client"

import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";
import { faChevronDown, faClose, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState, useRef } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import TimePicker from "../TimePicker";
import { addNewHabit } from "@/utils/allHabitsUtils/addNewHabit";
import toast from "react-hot-toast";



// Define types for RepeatOption and DayOption
type RepeatOption = {
    name: string;
    isSelected: boolean;
};

type DayOption = {
    id: number;
    name: string;
    isSelected: boolean;
};

// Types for habit
type HabitType = {
    _id: string;
    name: string;
    icon: IconProp;
    frequency: DayOption[];
    // notification: string;
};

function HabitWindow() {
    const { habitWindowObject, darkModeObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;

    

    // const [reminderTime, setReminderTime] = useState<string>("none"); // Initial reminder time

    const days: DayOption[] = [
        { id: 1, name: "Monday", isSelected: true },
        { id: 2, name: "Tuesday", isSelected: true },
        { id: 3, name: "Wednesday", isSelected: true },
        { id: 4, name: "Thursday", isSelected: true },
        { id: 5, name: "Friday", isSelected: true },
        { id: 6, name: "Saturday", isSelected: true },
        { id: 7, name: "Sunday", isSelected: true },
    ];

    // Using useState hook to store the habit item (name and id)
    const [habitItem, setHabitItem] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faStairs,
        frequency: days,
        // notification: "none"
    });

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

   

    const [allDays, setAllDays] = useState<DayOption[]>(days);

    // Function to handle updates in the habit name
    const onUpdateHabitName = (inputText: string) => {
        setHabitItem((prevState) => ({
            ...prevState,
            name: inputText,
        }));
    };
    

    // Update habit icon when the iconSelected changes
    useEffect(() => {
        setHabitItem((prevHabitItem) => ({
            ...prevHabitItem,
            icon: iconSelected,
            // notification: reminderTime
        }));
    }, [iconSelected]); //reminderTime

    // Function to handle repeat options change
    function changeRepeatOption(repeatOptions: RepeatOption[]) {
        const filterIsSelected = repeatOptions.filter(
            (singleOption) => singleOption.isSelected
        );
        // const nameOfSelectedOption = filterIsSelected[0].name;
        const copyHabitItem = { ...habitItem };

        // if (nameOfSelectedOption === "Every Day") {
        //     // If "Daily" is selected, select all days automatically
        //     const updatedDays = allDays.map((day) => ({
        //         ...day,
        //         isSelected: true,
        //     }));
        //     setAllDays(updatedDays);  // This will update the days to selected
        //     // copyHabitItem.frequency[0].days = updatedDays.map(day => day.name);
        // } else {
        //     // If "Weekly" is selected, let the user select specific days
        //     copyHabitItem.frequency[0].type = "Some Days";
        // }

        // copyHabitItem.frequency[0].type = nameOfSelectedOption;
        setHabitItem(copyHabitItem);
    }

    function changeDaysOption(allDays: DayOption[]) {
        // const selectedDays = allDays
        //     .filter((singleDay) => singleDay.isSelected)
        //     .map((day) => day.name);

        const copyHabitItem = { ...habitItem };
        // copyHabitItem.frequency[0].days = selectedDays;
        setHabitItem(copyHabitItem);
    }

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
            }}
            className={`absolute left-[40%] transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md mt-6 ${openHabitWindow ? "block" : "hidden"}`}
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
                HabitName={habitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <Repeat 
                onChangeOption={changeRepeatOption}
                onchangeDaysOption={changeDaysOption} 
                allDays={allDays} // Pass allDays to Repeat component
                setAllDays={setAllDays} // Pass setAllDays to manage days
                // habitType={habitItem.frequency[0].type} // Pass current habit type (Daily or Weekly)
            />
            {/* <Reminder reminderTime={reminderTime}/> */}
            <SaveButton Habit={habitItem} /> 
            {/* //reminderTime={reminderTime} */}
            {/* <TimePicker reminderTime={reminderTime} setReminderTime={setReminderTime} /> */}
            </div>
    );
}

export default HabitWindow;

const Header = () => {
    const { habitWindowObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">Add New Habit</span>
            <FontAwesomeIcon
                onClick={() => setOpenHabitWindow(false)}
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
        onChangeOption,
        onchangeDaysOption,
        allDays,
        setAllDays,
        // habitType,
    }: {
        onChangeOption: (repeatOptions: RepeatOption[]) => void;
        onchangeDaysOption: (allDays: DayOption[]) => void;
        allDays: DayOption[];
        setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
        // habitType: string;
    }) => {
        // const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
        //     { name: "Every Day", isSelected: habitType === "Every Day" },
        //     { name: "Some Days", isSelected: habitType === "Some Days" },
        // ]);

        const { darkModeObject } = useGlobalContextProvider();
        const { isDarkMode } = darkModeObject;

        // function changeOption(indexClicked: number) {
        //     const updatedRepeatOptions = repeatOptions.map((singleOption, index) => {
        //         if (index === indexClicked) {
        //             return { ...singleOption, isSelected: true };
        //         }
        //         return { ...singleOption, isSelected: false };
        //     });
        //     setRepeatOptions(updatedRepeatOptions);
        //     onChangeOption(updatedRepeatOptions);
        // }

        useEffect(() => {
            onchangeDaysOption(allDays);
        }, [allDays]);

        return (
            <div className="flex flex-col gap-2 mt-10 px-3">
                <span className="font-semibold text-[17px]">Repeat</span>
                {/* <div className="flex gap-4 mt-2 items-center">
                    {repeatOptions.map((singleOption, index) => (
                        <button
                            key={index}
                            onClick={() => changeOption(index)}
                            style={{
                                color: !singleOption.isSelected
                                    ? !isDarkMode
                                        ? defaultColor.default
                                        : darkModeColor.textColor
                                    : "",
                                backgroundColor: singleOption.isSelected
                                    ? defaultColor.default
                                    : !isDarkMode
                                    ? "white"
                                    : defaultColor[100],
                            }}
                            className="p-2 px-3 rounded-md text-white cursor-pointer"
                        >
                            {singleOption.name}
                        </button>
                    ))}
                </div> */}
                {<DailyOptions allDays={allDays} setAllDays={setAllDays} />}
            </div>
        );
    }
);

const DailyOptions = memo(
    ({ allDays, setAllDays }: { allDays: DayOption[]; setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>> }) => {
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
                index === singleDayIndex ? { ...singleDay, isSelected: !singleDay.isSelected } : singleDay
            );
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

// function Reminder({ reminderTime }: { reminderTime: string }) {
//     const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
//     const { isDarkMode } = darkModeObject;
//     const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;  // This is coming from context
//     const [isOn, setIsOn] = useState(false);

//     // Toggle the reminder on/off
//     function updateToggle() {
//         setIsOn(!isOn);
//     }
   

   

//     return (
//         <div className="flex flex-col gap-2 mt-10 px-3">
//             <div className="flex justify-between">
//                 <span className="font-semibold text-[17px]">Daily Notification</span>
//                 <div
//                     className={`${
//                         isOn ? "bg-primary" : "bg-slate-400"
//                     } w-16 h-[30px] relative rounded-lg flex cursor-pointer`}
//                     onClick={updateToggle}
//                 >
//                     {/* Toggle Circle */}
//                     <div
//                         className={`bg-white h-6 w-6 rounded-full absolute top-[3px] transition-all duration-300 ${
//                             isOn ? "right-[3px]" : "left-[3px]"
//                         }`}
//                     />
//                 </div>
//             </div>

//             {/* Show "Select Time" when the toggle is ON */}
//             {isOn && (
//                 <div
//                     style={{
//                         color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
//                         backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
//                     }}
//                     className="flex justify-between p-4 m-2 mt-8 rounded-md"
//                 >
//                     <span>Select Time</span>
//                     <div
                        
//                         onClick={() => setOpenTimePickerWindow(true)}  // Click to open time picker
//                         className="flex gap-2 items-center justify-center cursor-pointer select-none"
//                     >
//                         <span>{reminderTime}</span>
//                         <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }





const SaveButton = memo(({ Habit }: { Habit: HabitType }) => { //, reminderTime: string
    const {allHabitsObject, habitWindowObject} = useGlobalContextProvider();
    const { setOpenHabitWindow} = habitWindowObject;
    const {allHabits, setAllHabits} = allHabitsObject;

    function checkNewHabitobject(){
        if (Habit.name.trim() === "") {
            return toast.error("The name field is still empty");
        } 
        const habitExist = allHabits.some(
            (singleHabit) => singleHabit.name === Habit.name
        )
        if (!habitExist) {
            addNewHabit({allHabits, setAllHabits, newHabit : Habit});
            console.log(allHabits, Habit)
            setOpenHabitWindow(false)
        } else {
            return toast.error("Habit Already Exists")
        }
    }
    return (
        <div className="w-full flex justify-center mt-9">
            <button
                onClick={checkNewHabitobject}
                className="bg-primary p-4 w-[98%] rounded-md text-white"
            >
                Add a Habit
            </button>
        </div>
    );
});
