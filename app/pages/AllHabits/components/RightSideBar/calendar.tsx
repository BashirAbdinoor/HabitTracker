import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { defaultColor, darkModeColor } from "@/colors";
import dayjs, { Dayjs } from "dayjs";

function Calendar() {
  const { darkModeObject, selectedCurrentDayObject, offsetDayObject } = useGlobalContextProvider();    
  const { isDarkMode } = darkModeObject;
  const {selectedCurrentDate, setSelectedCurrentDate} = selectedCurrentDayObject;
  const {offsetDay, setOffsetDay} = offsetDayObject;

  const value: Dayjs | null = selectedCurrentDate ? dayjs(selectedCurrentDate) : null;

  function handleOnchangeDate(newDate: Dayjs){
    const jsDate = newDate.toDate();
    const currentDate = new Date()
    
    const differenceinMS = jsDate.getTime() - currentDate.getTime(); //Difference in millisecond
    const differenceInDays = differenceinMS / (1000 * 3600 * 24) //difference in days

    setOffsetDay(Math.floor(differenceInDays+1))
  }

  return (
    <div 
      style={{
        // color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 bg-slate-50 rounded-xl p-5 pt-7"
    >
      <DateCalendar
        onChange={handleOnchangeDate}
        value={value}
        sx={{
          // Style for the days of the month (each day number)
          "& .MuiPickersDay-root": {
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor, // Toggle text color based on dark mode
            // backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
            "&:hover": {
              backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
              border: "2px solid hsl(var(--primary))", // Border on hover in blue (primary)
            },

            "&.Mui-selected": {
              backgroundColor: "hsl(var(--primary))",  // Set background for selected days to primary color
              color: "white", // Text color of selected day
            //   border: "2px solid hsl(var(--primary))", // Change the border to primary color when selected
            },
          },

          


          // Style for the dropdown button (month/year selector)
          "& .MuiIconButton-root": {
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor, // Change color for dropdown button
            "&:hover": {
              backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate, // Optional hover effect
              color: "hsl(var(--primary))", // Change the icon color on hover to primary
            },
          },

          // Style for the year button in the dropdown
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor, // Toggle text color for year buttons
            backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
            "&.Mui-selected": {
              color: "white", // Selected year text color
              backgroundColor: "hsl(var(--primary))", // Set background for selected year button to primary color
            },
          },

          "& .MuiTypography-root": {
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor, // Toggle color of weekday labels
            fontWeight: "bold", // Make the weekday labels bold for better visibility
          },
          
        }}
      />
    </div>
  );
}

export default Calendar;
