import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { HabitType } from "@/app/types/globalType";

interface dropMenuItem {
  name: string;
  icon: IconProp;
}


function DropDown({ singleHabit }: { singleHabit: HabitType }) {
  const { darkModeObject, dropDownPositionObject, openEditWindowObject, 
    openConfirmationWindowObject, singleHabitItemObject, dropDownObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { dropDownPosition } = dropDownPositionObject;
  const { setOpenEditWindow } = openEditWindowObject;
  const { setOpenConfirmationWindow } = openConfirmationWindowObject;
  const { singleHabitItem, setSingleHabitItem } = singleHabitItemObject;
  const {setOpenDropDown} = dropDownObject;
//   console.log(allHabits)
    console.log(singleHabitItem, "single")

  const dropDownMenuItems: dropMenuItem[] = [
    { name: "Edit", icon: faPencil },
    { name: "Remove", icon: faTrashCan },
  ];

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : defaultColor.background,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,  // Add text color change
        top: `${dropDownPosition.top}px`,
        left: `${dropDownPosition.left}px`,
        zIndex: 1,
      }}
      className="dropdown p-3 w-40 absolute shadow-md flex rounded-lg flex-col gap-3 text-[11px]"
    >
      {dropDownMenuItems.map((MenuItem, index) => (
        <div
          key={index}
          className="flex gap-2 items-center rounded-md p-2 select-none cursor-pointer transition-all hover:bg-primary hover:text-white"
          onClick={() => {
            if (index === 0) {
              setSingleHabitItem(singleHabit);
              setOpenEditWindow(true);
              setOpenDropDown(false)
              
            } else if (index === 1) {
              setOpenConfirmationWindow(true);
              setOpenDropDown(false)
            }
          }}
        >
          <FontAwesomeIcon className="size-4" icon={MenuItem.icon} />
          <div>{MenuItem.name}</div>
        </div>
      ))}
    </div>
  );
}

export default DropDown;