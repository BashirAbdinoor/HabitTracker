//dropDown menu is all over the board.
//if you touch edit and change your mind.
//once you edit a habit & add a new habit.
//fix the month difference pecularities (i.e if you chose 1 august you can go back month and just 1 july without a problem.)

"use client"

import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { darkModeColor, defaultColor } from "@/colors";
import { faChevronDown, faClose, faStairs, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useEffect, useState, useRef } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { addNewHabit } from "@/utils/allHabitsUtils/addNewHabit";
import toast from "react-hot-toast";
import { daysOption, HabitType } from "@/app/types/globalType";
import { textToIcon } from "./IconsWindow/IconData";

    // Helper function to format date strings
    const formatDateString = (dateStr: string) => {
    if (!dateStr) return "";
    
    const parts = dateStr.split(' ');
    const monthMap = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
        Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const day = parts[2].padStart(2, '0');
    const month = monthMap[parts[1] as keyof typeof monthMap];
    const year = parts[3];

    return `${year}-${month}-${day}`;
    };
    
    // Helper function to display formatted date
    const displayDate = (dateStr: string) => {
    if (!dateStr) return "Choose date";
    
    const [year, month, day] = dateStr.split('-');
    const monthNames = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
        '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    };
    
    return `${monthNames[month as keyof typeof monthNames]} ${parseInt(day)}, ${year}`;
    };

// Default days configuration
const defaultDays: daysOption = [
  { id: 0, name: 'S', isSelected: true },
  { id: 1, name: 'M', isSelected: true },
  { id: 2, name: 'T', isSelected: true },
  { id: 3, name: 'W', isSelected: true },
  { id: 4, name: 'T', isSelected: true },
  { id: 5, name: 'F', isSelected: true },
  { id: 6, name: 'S', isSelected: true },
];

function HabitWindow() {
    const { habitWindowObject, darkModeObject, singleHabitItemObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const { singleHabitItem, setSingleHabitItem } = singleHabitItemObject;

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(singleHabitItem.icon || faStairs);
    const [allDays, setAllDays] = useState<daysOption>(singleHabitItem.frequency || defaultDays);
    
    // Calculate dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneYearLater = new Date(today);
    oneYearLater.setFullYear(today.getFullYear() + 1);
    
    const [startDate, setStartDate] = useState<string>(
        singleHabitItem.startDate ? singleHabitItem.startDate : formatDateString(new Date().toString())
    );
    const [endDate, setEndDate] = useState<string>(
        singleHabitItem.endDate ? singleHabitItem.endDate : formatDateString(new Date().toString())
    );
    
    const onUpdateHabitName = (inputText: string) => {
        setSingleHabitItem((prevState) => ({
            ...prevState,
            name: inputText,
        }));
    };

    const generateRandomStrings = () => {
        return [...Array(8)].map(() =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]
        ).join('');
    };
    

    useEffect(() => {
        setSingleHabitItem((prevHabitItem) => ({
            ...prevHabitItem,
            icon: iconSelected,
            _id: generateRandomStrings(),
            startDate: startDate,
            endDate: endDate,
            frequency: allDays
        }));
    }, [allDays, iconSelected, startDate, endDate]);

    function changeDaysOption(allDays: daysOption) {
        setSingleHabitItem((prevState) => ({ 
            ...prevState,
            frequency: allDays,
        }));
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
                HabitName={singleHabitItem.name}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
            />
            <DateSelectionRow 
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <Repeat 
                onchangeDaysOption={changeDaysOption} 
                allDays={allDays}
                setAllDays={setAllDays} 
            />
            <SaveButton /> 
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
        const { habitWindowObject, darkModeObject, singleHabitItemObject } = useGlobalContextProvider();
        const { openHabitWindow } = habitWindowObject;
        const { isDarkMode } = darkModeObject;
        const {singleHabitItem} = singleHabitItemObject;

        function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
            onUpdateHabitName(event.target.value);
        }

        useEffect(() => {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);

            if (!openHabitWindow) {
                onUpdateHabitName(singleHabitItem.name); // Clear input field when the window is closed
            }
        }, [openHabitWindow]);

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
const DateSelectionRow = memo(({
    startDate,
    setStartDate,
    endDate,
    setEndDate
}: {
    startDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    endDate: string;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { darkModeObject, singleHabitItemObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const {singleHabitItem, setSingleHabitItem} = singleHabitItemObject

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    
    const startPickerRef = useRef<HTMLDivElement>(null);
    const endPickerRef = useRef<HTMLDivElement>(null);
    
    // Create normalized today date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = formatDateString(today.toString());
    
    // Handle click outside to close pickers
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startPickerRef.current && !startPickerRef.current.contains(event.target as Node)) {
                setShowStartPicker(false);
            }
            if (endPickerRef.current && !endPickerRef.current.contains(event.target as Node)) {
                setShowEndPicker(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Generate calendar days
    const generateCalendarDays = (date: Date, minDate: Date) => {
        const days = [];
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className="w-7 h-7"></div>);
        }
        
        // Add cells for each day of the month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
            dayDate.setHours(0, 0, 0, 0);
            
            const dayDateString = formatDateString(dayDate.toString());
            const isNotDisabledByMin = dayDate >= minDate;  // true if date is before minDate
            // const isFutureDate = dayDate >= today;       // true if date is after today
            const isNotDisabled = isNotDisabledByMin; 
            const isSelected = 
                (showStartPicker && startDate === dayDateString) ||
                (showEndPicker && endDate === dayDateString);
            
            // Highlight today
            const isToday = dayDateString === todayString;
            
            days.push(
                <div
                    key={`day-${i}`}
                    onClick={() => isNotDisabled && handleDateSelect(dayDate)}
                    className={`w-7 h-7 flex items-center justify-center rounded-full cursor-pointer ${
                        !isNotDisabled ? 'text-gray-400 cursor-not-allowed' : 
                        isSelected ? 'bg-primary text-white' : 
                        isToday ? 'border border-primary' : 
                        'hover:bg-gray-200'
                    }`}
                >
                    {i}
                </div>
            );
        }
        
        return days;
    };
    
    // Handler for setting date
    const handleDateSelect = (date: Date) => {
        const formattedDate = formatDateString(date.toString());
        
        if (showStartPicker) {
            setStartDate(formattedDate);
            setShowStartPicker(false);
            
            // If end date is not set or new start date is after end date
            if (!endDate || date > new Date(endDate)) {
                setEndDate(formattedDate);
            }
        } else if (showEndPicker) {
            setEndDate(formattedDate);
            setShowEndPicker(false);
        }
    };
    
    // Navigation handlers
    const navigateMonth = (months: number, isStartDate: boolean) => {
        const currentDate = isStartDate 
            ? (startDate ? new Date(startDate) : today) 
            : (endDate ? new Date(endDate) : today);
            
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + months);
        
        const formattedDate = formatDateString(newDate.toString());
        
        if (isStartDate) {
            setStartDate(formattedDate);
        } else {
            setEndDate(formattedDate);
        }
    };

    // Helper to display month/year in calendar header
    const getMonthYearDisplay = (dateStr: string, fallback: Date) => {
        const date = dateStr ? new Date(dateStr) : fallback;
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="flex flex-col gap-2 mt-6 px-3">
            <span className="opacity-80 font-semibold">Date Range</span>
            <div className="flex gap-4">
                {/* Start Date Picker */}
                <div className="flex-1 relative" ref={startPickerRef}>
                    <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
                    <div 
                        onClick={() => {
                            setShowStartPicker(!showStartPicker);
                            setShowEndPicker(false);
                        }}
                        style={{
                            backgroundColor: isDarkMode ? darkModeColor.background : "white",
                            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        }}
                        className="border border-grey-200 p-3 rounded-md text-[13px] cursor-pointer flex items-center justify-between"
                    >
                        {singleHabitItem.startDate ? (
                            <span>{displayDate(startDate)}</span>
                        ) : (
                            <span className="text-gray-400">Choose start date</span>
                        )}
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    
                    {showStartPicker && (
                        <div 
                            style={{
                                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                                borderColor: isDarkMode ? darkModeColor.borderColor : defaultColor.borderColor,
                            }}
                            className="absolute top-full left-0 mt-2 w-64 p-4 border rounded-md shadow-lg z-10"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <button 
                                    onClick={() => navigateMonth(-1, true)}
                                    className="p-1 rounded hover:bg-gray-200"
                                >
                                    &lt;
                                </button>
                                <span className="font-medium">
                                    {getMonthYearDisplay(startDate, today)}
                                </span>
                                <button 
                                    onClick={() => navigateMonth(1, true)}
                                    className="p-1 rounded hover:bg-gray-200"
                                >
                                    &gt;
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center">
                                <div className="text-xs text-gray-500">Sun</div>
                                <div className="text-xs text-gray-500">Mon</div>
                                <div className="text-xs text-gray-500">Tue</div>
                                <div className="text-xs text-gray-500">Wed</div>
                                <div className="text-xs text-gray-500">Thu</div>
                                <div className="text-xs text-gray-500">Fri</div>
                                <div className="text-xs text-gray-500">Sat</div>
                                {generateCalendarDays(startDate ? new Date(startDate) : today, today)}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* End Date Picker */}
                <div className="flex-1 relative" ref={endPickerRef}>
                    <label className="text-xs text-gray-500 mb-1 block">End Date</label>
                    <div 
                        onClick={() => {
                            setShowEndPicker(!showEndPicker);
                            setShowStartPicker(false);
                        }}
                        style={{
                            backgroundColor: isDarkMode ? darkModeColor.background : "white",
                            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                        }}
                        className="border border-grey-200 p-3 rounded-md text-[13px] cursor-pointer flex items-center justify-between"
                    >
                        {singleHabitItem.endDate ? (
                            <span>{displayDate(endDate)}</span>
                        ) : (
                            <span className="text-gray-400">Choose end date</span>
                        )}
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    
                    {showEndPicker && (
                        <div 
                            style={{
                                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                                borderColor: isDarkMode ? darkModeColor.borderColor : defaultColor.borderColor,
                            }}
                            className="absolute top-full left-0 mt-2 w-64 p-4 border rounded-md shadow-lg z-10"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <button 
                                    onClick={() => navigateMonth(-1, false)}
                                    className="p-1 rounded hover:bg-gray-200"
                                >
                                    &lt;
                                </button>
                                <span className="font-medium">
                                    {getMonthYearDisplay(endDate, startDate ? new Date(startDate) : today)}
                                </span>
                                <button 
                                    onClick={() => navigateMonth(1, false)}
                                    className="p-1 rounded hover:bg-gray-200"
                                >
                                    &gt;
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center">
                                <div className="text-xs text-gray-500">Sun</div>
                                <div className="text-xs text-gray-500">Mon</div>
                                <div className="text-xs text-gray-500">Tue</div>
                                <div className="text-xs text-gray-500">Wed</div>
                                <div className="text-xs text-gray-500">Thu</div>
                                <div className="text-xs text-gray-500">Fri</div>
                                <div className="text-xs text-gray-500">Sat</div>
                                {generateCalendarDays(
                                    endDate ? new Date(endDate) : startDate ? new Date(startDate) : today, 
                                    startDate ? new Date(startDate) : today
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

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
                <DailyOptions allDays={allDays} setAllDays={setAllDays} />
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

const SaveButton = memo(()=> { 
    const { allHabitsObject, habitWindowObject, singleHabitItemObject } = useGlobalContextProvider();
    const { setOpenHabitWindow } = habitWindowObject;
    const { allHabits, setAllHabits } = allHabitsObject;
    const {singleHabitItem, setSingleHabitItem} = singleHabitItemObject;

    const Habit = singleHabitItem;
    

    function checkNewHabitobject() {

        if (Habit.name.trim() === "") {
            return toast.error("The name field is still empty");
        }
        // Validate dates
        if (!singleHabitItem.startDate) {
            toast.error("Start date is missing");
            return;
        }
        if (!singleHabitItem.endDate) {
            toast.error("End date is missing");
            return;
        }
        
        const habitExist = allHabits.some((singleHabit) => singleHabit.name === Habit.name);
        if (!habitExist) {
            addNewHabit({ allHabits, setAllHabits, newHabit: Habit });
            setOpenHabitWindow(false);
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
                Add a Habit
            </button>
        </div>
    );
});
