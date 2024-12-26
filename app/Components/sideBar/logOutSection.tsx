import React from "react";
import { faRightFromBracket, FaRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {SignoutButton} from "../singout"

function LogOutSection(){
    const logOutObject = {name: "Log Out", icon: faRightFromBracket};
    return (
        <div className="flex gap-2 items-center ml-8 p-2 mt-28 hover:text-primary transition-all">
            <FontAwesomeIcon width={20} height={20} icon={logOutObject.icon}/>
            <div>
                Signout
            </div>
        </div>
    )
};

export default LogOutSection;