//when you login change the sign in & sign up section to dashboard.
//get the user details from mongodb & show in dashboard
//logout button in dashboard
// can't go the dashboard unless signed in.
//chose a day to change the habits, say saturday. Then habit can be added or deleted only on saturdays & habit changing date can only be changed on saturday.
//notification on 8pm or chose another time.
//YOu can add adhominom todo lists each day0

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
