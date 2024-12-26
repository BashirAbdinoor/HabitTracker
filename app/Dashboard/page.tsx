"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../Components/sideBar/sidebar";
import { useGlobalContextProvider } from "../types/contextAPI";
import { menuItemType } from "../types/menuItemType";
import AllHabits from "../pages/AllHabits/Allhabits";
import Stats from "../pages/Stats/Stats";
import Areas from "../pages/Areas/Areas";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultColor, darkModeColor } from "@/colors";

function Dashboard() {
  // Access context values for state management
  const { menuItemsObject, darkModeObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;
  const { isDarkMode } = darkModeObject;

  // Debugging log to check darkMode state
  // console.log(isDarkMode, "Dashboard");

  // State to manage the selected menu item
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);

  // Effect hook to update the selected menu when the menu items change
  useEffect(() => {
    const selected = menuItems.find((item) => item.isSelected);
    console.log(selected, "Dashboard")
    console.log(isDarkMode)
    setSelectedMenu(selected || null); // Only update if we found a selected item
  }, [menuItems, isDarkMode]);  // Re-run the effect when menuItems change

  // Default selected component (fallback)
  let selectComponent = null;

  switch (selectedMenu?.name) {
    case "All Habits":
      selectComponent = <AllHabits />;
      break;
    case "Statistics":
      selectComponent = <Stats />;
      break;
    case "Areas":
      selectComponent = <Areas />;
      break;
    default:
      selectComponent = <AllHabits />;
  }

  // Render the dashboard with conditional styles and components based on dark mode
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
      }}
      className="flex"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Sidebar />
        {selectComponent}
        <BlackSoftLayer />
      </LocalizationProvider>
    </div>
  );
}
export default Dashboard;

// BlackSoftLayer component to show an overlay when sidebar is open
function BlackSoftLayer() {
  const { openSideBarObject } = useGlobalContextProvider();
  const { openSideBar } = openSideBarObject;

  return (
    <div
      className={`w-full h-full bg-black fixed top-0 left-0 opacity-20 z-40 ${openSideBar ? "" : "hidden"}`}
    ></div>
  );
}
