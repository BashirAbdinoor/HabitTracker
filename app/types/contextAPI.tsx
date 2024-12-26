"use client";

import { ReactNode, createContext, useState, useContext } from "react";
import { GlobalContextType } from "./GlobalContextType";
import { menuItemType } from "./menuItemType";
import { faRectangleList, faChartSimple, faLayerGroup, } from "@fortawesome/free-solid-svg-icons";

// Define the context with default values
const GlobalContext = createContext<GlobalContextType>({
  menuItemsObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: false,  // Initially, the sidebar should be closed
    setOpenSideBar: () => {},
  },
  darkModeObject: {
    isDarkMode: false,
    setDarkMode: () => {},
  },
  habitWindowObject : {
    openHabitWindow: false,
    setOpenHabitWindow: () => {},
  },
});

// GlobalContextProvider that manages the state
function GlobalContextProvider({ children }: { children: ReactNode }) {
  // State for menu items (e.g., navigation links)
  const [menuItems, setMenuItems] = useState<menuItemType[]>([
    { name: "All Habits", isSelected: true, icon: faRectangleList },
    { name: "Statistics", isSelected: false, icon: faChartSimple },
    { name: "Areas", isSelected: false, icon: faLayerGroup },
  ]);

  

  // State for the sidebar (whether it's open or closed)
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  // State for dark mode (true for dark mode, false for light mode)
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{
        menuItemsObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        darkModeObject: { 
          isDarkMode,
          setDarkMode,
        },
        habitWindowObject: {openHabitWindow, setOpenHabitWindow},

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Custom hook to access context value
export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  return context;
}

export default GlobalContextProvider;
