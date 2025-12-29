import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Loading/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const MyActivities = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myActivities = [], isLoading } = useQuery({
    queryKey: ["my-activities", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/challenges?email=${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">My Activities</h2>

      {myActivities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">
            You haven't joined any challenges yet!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Challenge Name</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Participants</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myActivities.map((activity, index) => (
                <tr key={activity._id}>
                  <td>{index + 1}</td>
                  <td>{activity.title}</td>
                  <td>
                    <span className="badge badge-primary">
                      {activity.category}
                    </span>
                  </td>
                  <td>{activity.duration} days</td>
                  <td>{activity.participants}</td>
                  <td>{new Date(activity.startDate).toLocaleDateString()}</td>
                  <td>{new Date(activity.endDate).toLocaleDateString()}</td>
                  <td>
                    <div className="btn btn-sm btn-secondary">Complete</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyActivities;
