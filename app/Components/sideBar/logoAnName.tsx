import { log } from "console";
import { GiTargetArrows } from "react-icons/gi";

function logoAnName(){
    return (
        <div className="flex gap-2 items-center sm:justify-start justify-center">
            <span className="text-2xl font-light flex items-center gap-2">
                {/** The Icon */}
                <div className="p-2 rounded-md">
                <GiTargetArrows className="text-white text-4xl height-34 width-34" style={{ color: 'hsl(var(--primary))' }} aria-hidden="true" />
                </div>
                {/** The name of the app */}
                <span className="font-bold text-mainColor" style={{ color: 'hsl(var(--primary))' }}>
                    Habit
                </span>
                <span  className="font-light"> Tracker </span>
            </span>
        </div>
    )
}
export default logoAnName