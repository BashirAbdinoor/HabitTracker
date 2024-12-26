import React from "react";
import { useGlobalContextProvider } from "@/app/types/contextAPI";
import { menuItemType } from "@/app/types/menuItemType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component for the entire menu selection
function MenuSelection() {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;

  return (
    <div className="mt-[180px]">
      {menuItems.map((menuItem: menuItemType, menuitemIndex: number) => (
        <div key={menuitemIndex}>
          <SingleMenuItem menuItemProp={menuItem} />
        </div>
      ))}
    </div>
  );
}

// Component for a single menu item
function SingleMenuItem({ menuItemProp }: { menuItemProp: menuItemType }) {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems, setMenuItems } = menuItemsObject;

  function handleClickedItem() {
    // Corrected the comparison with '===' instead of '='
    const copyMenuItems = menuItems.map((menuItem) => {
      if (menuItemProp.name === menuItem.name) {
        return { ...menuItem, isSelected: true };
      }
      return { ...menuItem, isSelected: false };
    });
    setMenuItems(copyMenuItems);
  }

  return (
    <div
      onClick={handleClickedItem}
      className={`flex gap-2 items-center p-2 mb-3 ml-8 cursor-pointer rounded-md w-36 select-none ${
        menuItemProp.isSelected
          ? "bg-primary transition-all text-white"
          : "hover:text-primary"
      }`}
    >
      <FontAwesomeIcon icon={menuItemProp.icon} width={20} height={20} />
      <div>{menuItemProp.name}</div>
    </div>
  );
}

export default MenuSelection;
