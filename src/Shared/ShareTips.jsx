import { useParams } from "react-router";

const ShareTips = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">
        Share Your Tips for Challenge #{id}
      </h1>
      {showTipModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Share a Tip</h2>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={tipData.title}
                onChange={(e) =>
                  setTipData({ ...tipData, title: e.target.value })
                }
                placeholder="Small actionable title"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                value={tipData.content}
                onChange={(e) =>
                  setTipData({ ...tipData, content: e.target.value })
                }
                placeholder="What tip helped you in this challenge?"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn" onClick={() => setShowTipModal(false)}>
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={() => shareTipMutation.mutate()}
                disabled={shareTipMutation.isPending}
              >
                {shareTipMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareTips;
