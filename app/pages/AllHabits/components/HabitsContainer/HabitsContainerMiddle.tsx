
import React, { useEffect, useState } from 'react';
import { useGlobalContextProvider } from '@/app/types/contextAPI';
import EmptyPlaceholder from '@/assets/emptyPlaceholder';
import { getCurrentDayName } from '@/utils/allHabitsUtils/dateFunctions'; 

import HabitCard from "../HabitCard";
import HabitsCompleted from '@/app/pages/AllHabits/HabitsCompleted';
import TargetIcon from '@/assets/targetIcon';

export default function HabitsContainerMiddle() {
  const { allHabitsObject, selectedCurrentDayObject } = useGlobalContextProvider();
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { allHabits, setAllHabits } = allHabitsObject;
  const today = getCurrentDayName(selectedCurrentDate);

  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    setUpdateState(prevState => !prevState); // Trigger re-render when selectedCurrentDate changes
  }, [selectedCurrentDate, allHabits]);

  const filteredHabits = allHabits.filter((habit) =>
    habit.frequency.some((day) => day.name === today && day.isSelected)
  );

  // Separate active and completed habits
  const activeHabits = allHabits.filter((habit) =>
    habit.frequency.some((day) => day.name === today && day.isSelected) && 
    !habit.completedDays.some((day) => day.date === selectedCurrentDate)
  );

  const completedHabits = allHabits.filter((habit) =>
    habit.completedDays.some((day) => day.date === selectedCurrentDate)
  );

  return (
    <div className="p-3">
      {filteredHabits.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <>
          {/* Active Habits */}
          {activeHabits.length > 0 ? (
            activeHabits.map((singleHabit, index) => (
              <HabitCard key={index} singleHabit={singleHabit} />
            ))
          ) : (
            <TargetIcon/>
          )}

          {/* Completed Habits */}
          <HabitsCompleted
            completedHabits={completedHabits}
            setAllHabits={setAllHabits}
            selectedCurrentDate={selectedCurrentDate}
          />
        </>
      )}
    </div>
  );
}
