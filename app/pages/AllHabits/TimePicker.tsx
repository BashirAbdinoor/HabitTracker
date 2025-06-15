import React, { useState } from "react";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type TimePickerProps = {
    reminderTime: string;
    setReminderTime: React.Dispatch<React.SetStateAction<string>>;
};

function TimePicker({ reminderTime, setReminderTime }: TimePickerProps) {
    const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openTimePickerWindow, setOpenTimePickerWindow } = openTimePickerObject;

    // Local state for hour, minute, and AM/PM
    const [hour, setHour] = useState<string>("8"); // User selected hour
    const [minute, setMinute] = useState<string>("00"); // User selected minute
    const [amPm, setAmPm] = useState<"AM" | "PM">("PM"); // AM or PM selection

    // Styles for dark mode and light mode to avoid repetition
    const inputStyles = {
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
    };

    // Custom style for the dropdown options with smaller font size
    const dropdownStyles = {
        fontSize: "16px", // Reduced font size for better clarity
        padding: "5px", // Add some padding for spacing
    };

    // Handle Hour Change (1-12) from dropdown
    const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHour(e.target.value);
    };

    // Handle Minute Change (00-59) from dropdown
    const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMinute(e.target.value);
    };

    // Toggle AM/PM
    const toggleAmPm = () => {
        setAmPm((prevAmPm) => (prevAmPm === "AM" ? "PM" : "AM"));
    };

    // Handle Save
    const handleSave = () => {
        // Format the time and log it or use it
        const formattedTime = `${hour}:${minute} ${amPm}`;
        setReminderTime(formattedTime); // Update reminder time in HabitWindow
        setOpenTimePickerWindow(false); // Close the time picker
    };

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
            }}
            className={`bg-white w-[350px] top-[89px] left-1/2 transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${openTimePickerWindow ? "absolute" : "hidden"}`}
        >
            <span className="font-bold flex justify-between items-center">
                <span>Select Time</span>

                <FontAwesomeIcon
                    height={20}
                    width={20}
                    className="top-8 right-4 text-gray-300 cursor-pointer"
                    onClick={() => setOpenTimePickerWindow(false)}
                    icon={faClose}
                />
            </span>

            <div className="flex gap-8 mt-9">
                {/* Hour Dropdown */}
                <div className="flex gap-2 justify-center items-center">
                    <select
                        style={{ ...inputStyles, fontSize: "16px" }} // Reduced font size
                        className="w-[50px] p-2 rounded-md text-center outline-none"
                        value={hour}
                        onChange={handleHourChange}
                    >
                        <option value="8">8</option>
                        {/* Hour options from 1 to 12 */}
                        {[...Array(12)].map((_, index) => (
                            <option key={index} value={index + 1} style={dropdownStyles}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                    <span className="text-2xl font-bold">:</span>
                    {/* Minute Dropdown */}
                    <select
                        style={{ ...inputStyles, fontSize: "16px" }} // Reduced font size
                        className="w-[50px] p-2 rounded-md text-center outline-none"
                        value={minute}
                        onChange={handleMinuteChange}
                    >
                        <option value="00">00</option>
                        {/* Minute options from 00 to 59 */}
                        {[...Array(60)].map((_, index) => (
                            <option key={index} value={index < 10 ? `0${index}` : `${index}`} style={dropdownStyles}>
                                {index < 10 ? `0${index}` : `${index}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* AM/PM Selection */}
                <div className="flex flex-col gap-3">
                    <span
                        style={inputStyles}
                        className="text-xl flex justify-center items-center w-[104px] h-[45px] rounded-md cursor-pointer"
                        onClick={toggleAmPm}
                    >
                        {amPm}
                    </span>
                </div>
            </div>

            {/* Save Button */}
            <button
                className="bg-primary p-3 text-white w-full rounded-md mt-10 mb-1"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
}

export default TimePicker;
