import { Link, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import { FaRightFromBracket } from "react-icons/fa6";

const ActivityDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState(null);
  const [note, setNote] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["activity-detail", id, user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/my-activities/challenge/${id}?email=${user?.email}`
      );
      return result.data;
    },
    enabled: !!user?.email && !!id,
  });

  const completeDayMutation = useMutation({
    mutationFn: async ({ day, note }) => {
      return await axiosSecure.post(`/my-activities/${id}/complete-day`, {
        email: user?.email,
        day,
        note,
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(["activity-detail", id]);
      Swal.fire({
        icon: "success",
        title: "Great Job!",
        text: response.data.message,
        timer: 2000,
      });
      setNote("");
      setSelectedDay(null);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error.response?.data?.error || "Failed to mark day",
      });
    },
  });

  const handleCompleteDay = () => {
    if (!selectedDay) {
      Swal.fire({
        icon: "warning",
        title: "Select a Day",
        text: "Please select which day you want to mark as completed",
      });
      return;
    }

    completeDayMutation.mutate({ day: selectedDay, note });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Error: {error?.response?.data?.error || "Failed to load activity"}
          </span>
        </div>
        <Link to="/dashboard/my-activities" className="btn btn-outline mt-4">
          ← Back to Activities
        </Link>
      </div>
    );
  }

  // No data state
  if (!data || !data.challenge || !data.userProgress) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Thanks for joined this challenge</span>
        </div>
        <Link to="/dashboard/my-activities" className="btn btn-outline mt-4">
          ← Back to Activities
        </Link>
      </div>
    );
  }

  const { challenge, userProgress } = data;
  const completedDays = userProgress?.completedDays || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link to="/dashboard/my-activities">My Activities</Link>
          </li>
          <li>{challenge?.title || "Challenge"}</li>
        </ul>
      </div>

      {/* Header Card */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <figure className="h-48">
          <img
            src={challenge?.imageUrl || "/placeholder.jpg"}
            alt={challenge?.title || "Challenge"}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h1 className="text-4xl font-bold">{challenge?.title}</h1>
          <p className="text-base-content/70">{challenge?.description}</p>
          <div className="badge badge-primary">{challenge?.category}</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Progress Stats */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4"> Your Progress</h2>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  {userProgress?.totalDaysCompleted || 0} /{" "}
                  {challenge?.duration || 0} Days
                </span>
                <span className="font-semibold">
                  {userProgress?.progressPercentage || 0}%
                </span>
              </div>
              <progress
                className="progress progress-primary w-full h-4"
                value={userProgress?.progressPercentage || 0}
                max="100"
              ></progress>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-primary/10 rounded-lg p-3">
                <div className="stat-title text-xs">Points Earned</div>
                <div className="stat-value text-2xl text-primary">
                  {userProgress?.pointsEarned || 0}
                </div>
              </div>

              <div className="stat bg-secondary/10 rounded-lg p-3">
                <div className="stat-title text-xs">Current Streak</div>
                <div className="stat-value text-2xl text-secondary">
                  {userProgress?.currentStreak || 0} 
                </div>
              </div>

              <div className="stat bg-accent/10 rounded-lg p-3">
                <div className="stat-title text-xs">Days Remaining</div>
                <div className="stat-value text-2xl text-accent">
                  {userProgress?.daysRemaining || 0}
                </div>
              </div>

              <div className="stat bg-success/10 rounded-lg p-3">
                <div className="stat-title text-xs">Longest Streak</div>
                <div className="stat-value text-2xl text-success">
                  {userProgress?.longestStreak || 0}
                </div>
              </div>
            </div>

            {userProgress?.isCompleted && (
              <div className="alert alert-success mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Congratulations! Challenge Completed! 🎉</span>
              </div>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4"> Achievements</h2>

            {!userProgress?.achievements ||
            userProgress.achievements.length === 0 ? (
              <p className="text-base-content/50">
                Complete days to unlock achievements!
              </p>
            ) : (
              <div className="space-y-3">
                {userProgress.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-warning/10 p-3 rounded-lg"
                  >
                    <span className="text-3xl">🏅</span>
                    <div>
                      <p className="font-semibold">{achievement}</p>
                      <p className="text-xs text-base-content/60">Unlocked</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complete Day Section */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4"> Mark Day Complete</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Day</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedDay || ""}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              <option value="" disabled>
                Choose a day
              </option>
              {Array.from(
                { length: challenge?.duration || 0 },
                (_, i) => i + 1
              ).map((day) => (
                <option
                  key={day}
                  value={day}
                  disabled={completedDays.includes(day)}
                >
                  Day {day} {completedDays.includes(day) ? <FaRightFromBracket></FaRightFromBracket> : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Add a Note (Optional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="What did you do today?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={handleCompleteDay}
            className="btn btn-primary mt-4"
            disabled={!selectedDay || completeDayMutation.isPending}
          >
            {completeDayMutation.isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Mark as Complete"
            )}
          </button>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">📅 Daily Progress</h2>

          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {Array.from({ length: challenge?.duration || 0 }, (_, i) => {
              const day = i + 1;
              const isCompleted = completedDays.includes(day);
              const dayNote = userProgress?.notes?.find((n) => n.day === day);

              return (
                <div
                  key={day}
                  className={`tooltip ${isCompleted ? "tooltip-success" : ""}`}
                  data-tip={
                    dayNote
                      ? dayNote.note
                      : isCompleted
                      ? "Completed"
                      : `Day ${day}`
                  }
                >
                  <div
                    className={`
                      aspect-square flex items-center justify-center rounded-lg
                      font-semibold text-sm
                      ${
                        isCompleted
                          ? "bg-success text-success-content"
                          : "bg-base-200"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Link to="/dashboard/my-activities" className="btn btn-outline">
          ← Back to Activities
        </Link>
        <Link
          to={`/challenges/${id}/leaderboard`}
          className="btn btn-secondary"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default ActivityDetails;
