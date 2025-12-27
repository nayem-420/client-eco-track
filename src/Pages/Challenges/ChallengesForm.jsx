import React from 'react';

const ChallengesForm = () => {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 shadow-md rounded-lg bg-base-200">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Challenge
        </h2>

        <form className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            required
          />

          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Category</option>
            <option>Waste Reduction</option>
            <option>Energy Conservation</option>
            <option>Water Conservation</option>
            <option>Sustainable Transport</option>
            <option>Green Living</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            rows="2"
            required
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="duration"
              placeholder="Duration (days)"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="target"
              placeholder="Target"
              className="input input-bordered w-full"
              required
            />
          </div>

          <input
            name="impactMetric"
            type="text"
            placeholder="Impact Metric (e.g., kg plastic saved)"
            className="input input-bordered w-full"
            required
          />

          <input
            name="createdBy"
            type="email"
            placeholder="Created By (Email)"
            className="input input-bordered w-full"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              className="input input-bordered w-full"
              required
            />
            <input
              type="date"
              name="endDate"
              className="input input-bordered w-full"
              required
            />
          </div>

          <input
            name="imageUrl"
            type="text"
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            View Details
          </button>
        </form>
      </div>
    );
};

export default ChallengesForm;