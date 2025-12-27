import React from "react";
import ChallengesCard from "./ChallengesCard";

const Challenges = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Challenges</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChallengesCard></ChallengesCard>
      </div>
    </div>
  );
};

export default Challenges;
