"use client";

import { ReactNode, createContext, useState, useContext, useEffect } from "react";
import { GlobalContextType } from "./GlobalContextType";
import { daysOption, HabitType, menuItemType } from "./globalType";
import { faRectangleList, faChartSimple, faLayerGroup, faUsers, faGraduationCap, faCode, faStairs, faL, } from "@fortawesome/free-solid-svg-icons";
import { getDateString } from "@/utils/allHabitsUtils/dateFunctions";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

function textToIcon(iconName: string): IconProp {
  switch (iconName) {
    case 'faStairs':
      return faStairs;
    default:
      return faStairs; // Default icon if no match is found
  }
}

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
  openTimePickerObject: {
    openTimePickerWindow: false,
    setOpenTimePickerWindow: () => {},
  },
  allHabitsObject :{
    allHabits: [],
    setAllHabits: () => {},
  },
  selectedCurrentDayObject: {
    selectedCurrentDate: "",
    setSelectedCurrentDate: () => {},
  },
  offsetDayObject: {
    offsetDay: 0,
    setOffsetDay: () => {},
  },
  dropDownObject: {
    openDropDown: false,
    setOpenDropDown: () => {},
  },
  dropDownPositionObject : {
    dropDownPosition: {
      top:0,
      left: 0,
    },
    setDropDownPosition: () => {},
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  singleHabitItemObject: {
    singleHabitItem: {
      _id: "0",
      name: "",
      icon: textToIcon("faStairs") as IconProp, 
      frequency: [
        { id: 1, name: "Monday", isSelected: true },
        { id: 2, name: "Tuesday", isSelected: true },
        { id: 3, name: "Wednesday", isSelected: true },
        { id: 4, name: "Thursday", isSelected: true },
        { id: 5, name: "Friday", isSelected: true },
        { id: 6, name: "Saturday", isSelected: true },
        { id: 7, name: "Sunday", isSelected: true },
      ],
      completedDays: [],
      activeDropDown: false,
  },
    setSingleHabitItem: () => {},
  },
  clickedHabitIDObject : {
    clickedHabitID : null,
    setClickedHabitID : () => {},
  },
  openEditWindowObject:{
    openEditWindow: false,
    setOpenEditWindow: () => {},
  }
});




// GlobalContextProvider that manages the state
function GlobalContextProvider({ children }: { children: ReactNode }) {

  

  // State for menu items (e.g., navigation links)
  const [menuItems, setMenuItems] = useState<menuItemType[]>([
    { name: "All Habits", isSelected: true, icon: faRectangleList },
    { name: "Statistics", isSelected: false, icon: faChartSimple },
  ]);

  const [allHabits, setAllHabits] = useState<HabitType[]>([])

  useEffect(() => {
    const storedHabits = localStorage.getItem("allHabits");
    if (storedHabits) {
      setAllHabits(JSON.parse(storedHabits)); // Load from localStorage
    }
  }, []);
  
  useEffect(() => {
    if (allHabits.length > 0) {
      localStorage.setItem("allHabits", JSON.stringify(allHabits)); // Save to localStorage
    }
  }, [allHabits]);

  // State for habit item (name and id)
  const [singleHabitItem, setSingleHabitItem] = useState<HabitType>({
    _id: "0",
    name: "",
    icon: textToIcon("faStairs") as IconProp, 
    frequency: [
      { id: 1, name: "Monday", isSelected: true },
      { id: 2, name: "Tuesday", isSelected: true },
      { id: 3, name: "Wednesday", isSelected: true },
      { id: 4, name: "Thursday", isSelected: true },
      { id: 5, name: "Friday", isSelected: true },
      { id: 6, name: "Saturday", isSelected: true },
      { id: 7, name: "Sunday", isSelected: true },
    ],
    completedDays: [],
    activeDropDown: false,
});

  // State for the sidebar (whether it's open or closed)
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);

  const [clickedHabitID, setClickedHabitID] = useState<string | null>(null);

  // State for dark mode (true for dark mode, false for light mode)
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false)
  const [openEditWindow, setOpenEditWindow] = useState<boolean>(false)
  const [openTimePickerWindow, setOpenTimePickerWindow] = useState<boolean>(false)

  const [selectedCurrentDate, setSelectedCurrentDate] = useState(() => getDateString(new Date()));
  const [offsetDay, setOffsetDay] = useState(0)

  const [openDropDown, setOpenDropDown] = useState(false)

  const [dropDownPosition, setDropDownPosition] = useState({
    top:0,
    left:0,
  });

  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false)
 



  return (
    <GlobalContext.Provider
      value={{
        menuItemsObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        darkModeObject: { isDarkMode, setDarkMode},
        habitWindowObject: {openHabitWindow, setOpenHabitWindow},
        openTimePickerObject: {openTimePickerWindow, setOpenTimePickerWindow},
        allHabitsObject: {allHabits, setAllHabits},
        offsetDayObject: {offsetDay, setOffsetDay},
        selectedCurrentDayObject : {selectedCurrentDate, setSelectedCurrentDate},
        dropDownObject: {openDropDown, setOpenDropDown},
        dropDownPositionObject: {dropDownPosition, setDropDownPosition},
        openConfirmationWindowObject: {openConfirmationWindow, setOpenConfirmationWindow},
        singleHabitItemObject: {singleHabitItem, setSingleHabitItem},
        clickedHabitIDObject: { clickedHabitID, setClickedHabitID },
        openEditWindowObject: {openEditWindow, setOpenEditWindow}
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
