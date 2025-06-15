//when you login change the sign in & sign up section to dashboard. if you go back to home while signed in, then don't show signup and signin but just signout.
//get the user details from mongodb & show in dashboard
//logout button in dashboard
// can't go the dashboard unless signed in.
//chose a day to change the habits, say saturday. Then habit can be added or deleted only on saturdays & habit changing date can only be changed on saturday.
//notification on 8pm or chose another time.
//YOu can add adhominom todo lists each day0
// Validate Habit (don't add empty habit & don't duplicate habit.) done
// Habits for somedays show up in everyday. Habits only show up after the day they are created & only the days they are chosen. done
// fix id of habits.

"use client";

import Navbar from "./Components/MainPageComponents/Navbar";
import HeroSection from "./Components/MainPageComponents/heroSection";
// import LoginForm from "./loginForm/page";


export default function Home() {

  return (
    <div className="p-5 poppins">
      <Navbar/>
      <HeroSection/> 
    </div>
  );
}
