import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

const ChallengeDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

  const { data: details, isLoading } = useQuery({
    queryKey: ["challenge-details", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/challenges/${id}`);
      return result.data;
    },
  });

  const handleJoinChallenges = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Join Challenge?",
      text: "Do you want to participate in this challenge?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, join it!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.post(`/challenges/join/${id}`, {
          email: user?.email,
        });

        swalWithBootstrapButtons.fire({
          title: "Success!",
          text: "You have successfully joined the challenge.",
          icon: "success",
        });
          navigate("/dashboard/my-activities");
      } catch (error) {
        console.log(error);
        swalWithBootstrapButtons.fire({
          title: "Error!",
          text: "Failed to join the challenge. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!details) return <p>No data found</p>;

  const {
    title,
    description,
    imageUrl,
    category,
    duration,
    impactMetric,
    participants,
    target,
    startDate,
    endDate,
    createdBy,
  } = details;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-xl overflow-hidden">
          <figure className="relative h-80">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="badge badge-primary badge-lg font-semibold">
                {category}
              </span>
            </div>
          </figure>

          <div className="card-body">
            {/* Title & Description */}
            <h1 className="card-title text-4xl font-bold mb-4">{title}</h1>
            <p className="text-base-content/80 text-lg mb-6">{description}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-sm">Duration</div>
                <div className="stat-value text-2xl text-primary">
                  {duration}
                </div>
                <div className="stat-desc">days</div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4">
                <div className="stat-title text-sm">Participants</div>
                <div className="stat-value text-2xl text-secondary">
                  {participants}
                </div>
                <div className="stat-desc">joined</div>
              </div>

              <div className="stat bg-base-200 rounded-lg p-4 col-span-2">
                <div className="stat-title text-sm">Impact Metric</div>
                <div className="stat-value text-xl text-green-500">
                  {impactMetric}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="divider"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Target Goal</p>
                  <p className="text-base-content/70">{target}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Challenge Period</p>
                  <p className="text-base-content/70">
                    {new Date(startDate).toLocaleDateString()} -{" "}
                    {new Date(endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">Created By</p>
                  <p className="text-base-content/70">{createdBy}</p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Action Button */}
            <div className="card-actions justify-center mt-4">
              <button
                onClick={handleJoinChallenges}
                className="btn btn-primary btn-lg px-12"
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetails;
