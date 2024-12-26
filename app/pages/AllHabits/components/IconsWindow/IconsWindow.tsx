"use client"

import React, {useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { iconsData } from "./IconData"
import { useGlobalContextProvider } from "@/app/types/contextAPI"
import { darkModeColor, defaultColor } from "@/colors"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

function IconsWindow({ 
    openIconWindow,
    setOpenIconWindow,
    iconSelected,
    setIconSelected,
}: {
openIconWindow: boolean;
setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
iconSelected: IconProp;
setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}){
    const [allIcons, setAllIcons] = useState(iconsData);
    const {darkModeObject} = useGlobalContextProvider();
    const {isDarkMode} = darkModeObject;
    console.log(openIconWindow)

    return (
        <div 
        style={{
            color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
            backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
          }}
        className={`z-50 w-[80%] left-[40%] transform -translate-x-1/2 p-10 rounded-md shadow-md mt-6 
            border flex flex-col gap-6 ${openIconWindow ? "absolute": "hidden"}`}
        >
            <FontAwesomeIcon
            onClick={() => {setOpenIconWindow(false)}}
            height={20}
            width={20}
            className="absolute top-8 right-4 text-grey-300 cursor-pointer"
            icon={faClose}
            />
            <span className="font-bold text-lg bg-transparent mt-3" > 
                Choose Your Icon
            </span>
            <div 
            className="border border-grey-200 p-5 flex flex-wrap gap-4 items-center rounded-md mb-5"
            >
            {allIcons.map((icon, iconIndex) =>(
                <FontAwesomeIcon

                color="hsl(var(--primary))"
                key={iconIndex}
                className="border p-2 border-grey-300 rounded-md text-xl cursor-pointer hoveer:text-primary hover:border-primary"
                height={50}
                width={50}
                icon={icon.faIcon}
                onClick={() => {
                    setIconSelected(icon.faIcon);
                    setOpenIconWindow(false)
                }}
                />

            ))}
            </div>
        </div>
    )
}

export default IconsWindow