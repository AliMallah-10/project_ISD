import React from "react";
import FirstView from "../components/FirstView/FirstView";
import AboutUs from "../components/AboutUs/index";
import BodyCard from "../components/BodyCard/ServicesCard";

function Home() {
  return (
    <div>
      
      <FirstView />
      <BodyCard />
      <AboutUs />
    </div>
  );
}

export default Home;
