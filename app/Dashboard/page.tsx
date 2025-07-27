"use client"
import React, { useState, useEffect } from "react";
import Sidebar from "../Components/sideBar/sidebar";
import { useGlobalContextProvider } from "../types/contextAPI";
import { menuItemType } from "../types/globalType";
import AllHabits from "../pages/AllHabits/Allhabits";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { defaultColor, darkModeColor } from "@/colors";
import StatisticTopBar from "../pages/Stats/components.tsx/stats";

function Dashboard() {
  // Access context values for state management
  const { menuItemsObject, darkModeObject, allHabitsObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;
  const { isDarkMode } = darkModeObject;
  const { allHabits } = allHabitsObject;

  useEffect(() => {
    console.log("Updated Habits State:", allHabits);
  }, [isDarkMode]);

  // State to manage the selected menu item
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);

  useEffect(() => {
    const selected = menuItems.find((item) => item.isSelected);
    console.log(selected, "Dashboard");
    console.log(isDarkMode);
    setSelectedMenu(selected || null);
  }, [menuItems, isDarkMode]);

  let selectComponent = null;

  switch (selectedMenu?.name) {
    case "All Habits":
      selectComponent = <AllHabits />;
      break;
    case "Statistics":
      selectComponent = <StatisticTopBar />;
      break;
    default:
      selectComponent = <AllHabits />;
  }

  const { openSideBarObject } = useGlobalContextProvider();
  const { openSideBar } = openSideBarObject;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
        display: "flex",
        flexDirection: "row",
        transition: "all 0.3s ease",
      }}
      className="h-full w-full"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Sidebar */}
        <Sidebar />
        {/* Main content area */}
        <div
          style={{
            flex: openSideBar ? "0 0 80%" : "1", // Adjust size when sidebar is open
            transition: "flex 0.3s ease",
            padding: "16px",
            backgroundColor: isDarkMode ? darkModeColor.background : "white",
            height: "100vh",
            overflowY: "auto",
          }}
          className="flex-1"
        >
          {selectComponent}
        </div>
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
