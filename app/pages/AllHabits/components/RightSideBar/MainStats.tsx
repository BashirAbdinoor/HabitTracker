import { useGlobalContextProvider } from "@/app/types/contextAPI";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { defaultColor, darkModeColor } from "@/colors";

function MainStats() {
const {darkModeObject} = useGlobalContextProvider();
const {isDarkMode} = darkModeObject;


  const statsInfo = [
    { id: 1, num: 7, subTitle: "Best streaks" },
    { id: 2, num: 10, subTitle: "Perfect days" },
  ];

  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after the component has mounted (client-side rendering)
  useEffect(() => {
    setIsClient(true);
  }, []);

  
return (
    <div 
    style={{
        backgroundColor: isDarkMode ? darkModeColor.backgroundSlate : defaultColor.backgroundSlate
    }}
    className="flex mx-4 flex-col gap-6 justify-center items-center mt-20 bg-slate-50 rounded-xl p-5 pt-7">
      <span 
                className="font-bold text-xl cursor-pointer hover:text-primary"
                style={{
                    color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                }}>
        Statistics
      </span>

      {/* Render the PieChart only on the client */}
      <div className="relative pt-3">
        {isClient && <CircularProgressBar progress={89} />} {/* Conditionally render */}
        <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="font-bold text-xl text-primary"> 89% </span>
          <span style={{
                    color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                }}
                className="text-[11px]">{`Today's Progress`}</span>
        </div>
      </div>

      {/* Best streaks and Perfect days */}
      <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
        {statsInfo.map((singleItem) => (
          <div className="flex items-center gap-3" key={singleItem.id}>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-[12px]">
              <span style={{
                    color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                }}
                    className="flex flex-col font-bold"> {singleItem.num} </span>
              <span 
    
                style={{
                    color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                }}
                > {singleItem.subTitle} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CircularProgressBarProps {
  progress: number; // progress in percentage
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const data = [
    { name: "completed", value: progress },
    { name: "remaining", value: 100 - progress },
  ];
  const COLORS = [defaultColor.default, "#edf2f4"]; // Adjust colors for better visibility

  return (
    <PieChart
      width={200}
      height={160}
      margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
    >
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={180}
        endAngle={-180} // Fixed angle for proper 50% arc
        innerRadius={66}
        outerRadius={progress === 100 ? 80 : 78}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MainStats;
