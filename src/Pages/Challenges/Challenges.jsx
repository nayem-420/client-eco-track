import React from "react";
import ChallengesCard from "./ChallengesCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";

const Challenges = ({ showViewMore }) => {
  const axiosSecure = useAxiosSecure();

  const { data: challenges = [], isLoading: loading } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const result = await axiosSecure("/challenges");
      return result.data;
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        All Challenges {challenges.length}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <ChallengesCard
            key={challenge._id}
            challenge={challenge}
          ></ChallengesCard>
        ))}
      </div>
      {showViewMore && (
        <Link to={"/challenges"} className="my-8 flex justify-center">
          <button className="btn-primary">
            View More <FaArrowRightLong />
          </button>
        </Link>
      )}
    </div>
  );
};

export default Challenges;
