import React from "react";
import Banner from "./Banner";
import WhyGoGreen from "./WhyGoGreen";
import HowItWorks from "./HowItWorks";
import Challenges from "../Challenges/Challenges";
import LiveStatistics from "./LiveStatistics";
import UpcomingEvents from "./UpcomingEvents";
import RecentTips from "./RecentTips";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LiveStatistics></LiveStatistics>
      <Challenges showViewMore={true}></Challenges>
      <UpcomingEvents></UpcomingEvents>
      <RecentTips></RecentTips>
      <WhyGoGreen></WhyGoGreen>
      <HowItWorks></HowItWorks>
    </div>
  );
};

export default Home;
