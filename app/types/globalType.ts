import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type menuItemType = {
    name: string;
    isSelected: boolean;
    icon : IconProp
  };

export type HabitType = {
  _id: string;
  name: string;
  icon: IconProp;
  frequency: daysOption;
  completedDays: DateOption[]
  activeDropDown: boolean;
  // notification: string;
};

// type FrequencyType = {
//   type: string;
//   days: daysOption[];
// };
export type DateOption = {
  _id: number;
  date: string;
}

export type daysOption= [
  { id: 1, name: "Monday", isSelected: true },
  { id: 2, name: "Tuesday", isSelected: true },
  { id: 3, name: "Wednesday", isSelected: true },
  { id: 4, name: "Thursday", isSelected: true },
  { id: 5, name: "Friday", isSelected: true },
  { id: 6, name: "Saturday", isSelected: true },
  { id: 7, name: "Sunday", isSelected: true },
];