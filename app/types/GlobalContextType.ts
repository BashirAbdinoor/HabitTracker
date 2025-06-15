import { HabitType, menuItemType } from "./globalType";
import { Dispatch, SetStateAction } from "react";

export type GlobalContextType = {
  menuItemsObject: {
    menuItems: menuItemType[];
    setMenuItems: Dispatch<SetStateAction<menuItemType[]>>;  // Added correct typing here
  };
  openSideBarObject:{
    openSideBar : boolean;
    setOpenSideBar: Dispatch<SetStateAction<boolean>>;
  };
  darkModeObject: {
    isDarkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
  };
  habitWindowObject:  {
    openHabitWindow: boolean;
    setOpenHabitWindow: Dispatch<SetStateAction<boolean>>;
  };
  openTimePickerObject: {
    openTimePickerWindow: boolean;
    setOpenTimePickerWindow: Dispatch<SetStateAction<boolean>>;
  };
  allHabitsObject: {
    allHabits:  HabitType[];
    setAllHabits: Dispatch<SetStateAction<HabitType[]>>;
  };
  selectedCurrentDayObject: {
    selectedCurrentDate: string;
    setSelectedCurrentDate: Dispatch<SetStateAction<string>>;
  };
  offsetDayObject: {
    offsetDay: number;
    setOffsetDay: Dispatch<SetStateAction<number>>;
  };
  dropDownObject: {
    openDropDown: boolean;
    setOpenDropDown: Dispatch<SetStateAction<boolean>>;
  };
  dropDownPositionObject : {
    dropDownPosition: {
      top:number,
      left: number,
    };
    setDropDownPosition: Dispatch<SetStateAction<{top: number, left: number}>>;
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: boolean;
    setOpenConfirmationWindow: Dispatch<SetStateAction<boolean>>;
  }, 
  singleHabitItemObject: {
    singleHabitItem: HabitType;
    setSingleHabitItem: Dispatch<SetStateAction<HabitType>>;
  },
  clickedHabitIDObject: {
    clickedHabitID: string | null;
    setClickedHabitID: Dispatch<SetStateAction<string | null>>;
  },
  openEditWindowObject: {
    openEditWindow: boolean;
    setOpenEditWindow: Dispatch<SetStateAction<boolean>>;
  }

};
