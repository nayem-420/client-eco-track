import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ChallengesForm = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Tanstack Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (challengeData) => {
      const res = await axiosSecure.post("/api/challenges", challengeData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Challenge Added Successfully! 🎉");
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.log("Error:", err);
    },
  });

  // mutation call
  const onSubmit = (data) => {
    const challenge = {
      ...data,
      duration: Number(data.duration),
      participants: 0,
    };
    mutate(challenge);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 shadow-md rounded-lg bg-base-200">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Challenge</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* TITLE */}
        <input
          placeholder="Title"
          className="input input-bordered w-full"
          {...register("title", { required: true })}
        />
        {errors.title && <p className="text-red-500">Title is required</p>}

        {/* CATEGORY */}
        <select
          className="select select-bordered w-full"
          {...register("category", { required: true })}
        >
          <option value="">Select Category</option>
          <option>Waste Reduction</option>
          <option>Energy Conservation</option>
          <option>Water Conservation</option>
          <option>Sustainable Transport</option>
          <option>Green Living</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          rows="2"
          {...register("description", { required: true })}
        ></textarea>

        {/* DURATION + TARGET */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Duration (days)"
            className="input input-bordered w-full"
            {...register("duration", { required: true })}
          />
          <input
            type="text"
            placeholder="Target"
            className="input input-bordered w-full"
            {...register("target", { required: true })}
          />
        </div>

        {/* IMPACT */}
        <input
          placeholder="Impact Metric (e.g., kg plastic saved)"
          className="input input-bordered w-full"
          {...register("impactMetric", { required: true })}
        />

        {/* CREATED BY */}
        <input
          type="email"
          placeholder="Created By (Email)"
          className="input input-bordered w-full"
          {...register("createdBy", { required: true })}
        />

        {/* DATE */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("startDate", { required: true })}
          />
          <input
            type="date"
            className="input input-bordered w-full"
            {...register("endDate", { required: true })}
          />
        </div>

        {/* IMAGE URL */}
        <input
          placeholder="Image URL"
          className="input input-bordered w-full"
          {...register("imageUrl", { required: true })}
        />

        {/* SUBMIT */}
        <button disabled={isPending} className="btn btn-primary w-full">
          {isPending ? "Submitting..." : "Create Challenge"}
        </button>
      </form>
    </div>
  );
};

export default ChallengesForm;