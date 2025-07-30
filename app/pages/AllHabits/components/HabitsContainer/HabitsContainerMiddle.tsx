
import React, { useEffect, useState } from 'react';
import { useGlobalContextProvider } from '@/app/types/contextAPI';
import EmptyPlaceholder from '@/assets/emptyPlaceholder';
import { getCurrentDayName } from '@/utils/allHabitsUtils/dateFunctions'; 
import { textToIcon } from '../IconsWindow/IconData';

import HabitCard from "../HabitCard";
import HabitsCompleted from '@/app/pages/AllHabits/HabitsCompleted';
import TargetIcon from '@/assets/targetIcon';

export default function HabitsContainerMiddle() {
  const { allHabitsObject, selectedCurrentDayObject } = useGlobalContextProvider();
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { allHabits, setAllHabits } = allHabitsObject;
  const today = getCurrentDayName(selectedCurrentDate);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch('/api/habits');
        const data = await response.json();
        
        if (response.ok) {
          // NEW: Convert icon strings to proper icons
          const habitsWithIcons = data.habits.map(habit => ({
            ...habit,
            icon: textToIcon(habit.icon) // Convert string to icon
          }));
          setAllHabits(habitsWithIcons);
        } else {
          console.error('Failed to fetch habits:', data.error);
        }
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [setAllHabits]);

  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    setUpdateState(prevState => !prevState); // Trigger re-render when selectedCurrentDate changes
  }, [selectedCurrentDate, allHabits]);

  const filteredHabits = allHabits.filter((habit) => {
  // Convert dates to simple YYYY-MM-DD format for reliable comparison
  const currentDateStr = selectedCurrentDate.split('T')[0];
  const startDateStr = habit.startDate.split('T')[0];
  const endDateStr = habit.endDate.split('T')[0];
  
  // CORRECTED: Check if current date is within range (inclusive)
  const isInRange = currentDateStr >= startDateStr && currentDateStr <= endDateStr;
  
  // Check frequency
  const isScheduledToday = habit.frequency.some(
    (day) => day.name === today && day.isSelected
  );
  
  return isInRange && isScheduledToday;
});

  // Active habits (not completed for selected date)
  const activeHabits = filteredHabits.filter(
    (habit) => !habit.completedDays.some(
      (day) => day.date.split('T')[0] === selectedCurrentDate.split('T')[0]
    )
  );

  // Completed habits
  const completedHabits = filteredHabits.filter(
    (habit) => habit.completedDays.some(
      (day) => day.date.split('T')[0] === selectedCurrentDate.split('T')[0]
    )
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
