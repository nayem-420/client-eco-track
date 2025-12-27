import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

const ChallengeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: details, isLoading } = useQuery({
    queryKey: ["challenge-details", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/challenges/${id}`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!details) return <p>No data found</p>;

  const { imageUrl, title, description } = details;

  return (
    <div className="hero bg-base-200 min-h-screen rounded-2xl">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={imageUrl}
          className="w-full max-w-sm rounded-lg shadow-2xl object-cover"
        />
        <div>
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
