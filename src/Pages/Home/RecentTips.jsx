// import React from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

// const RecentTips = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // Fetch recent tips
//   const { data: tips = [], isLoading } = useQuery({
//     queryKey: ["recent-tips"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/tips/recent");
//       return res.data;
//     },
//   });

//   // Upvote mutation
//   const upvoteMutation = useMutation({
//     mutationFn: async (id) => {
//       const res = await axiosSecure.post(`/tips/${id}/upvote`);
//       return res.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["recent-tips"]); // refetch tips after upvote
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-10">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-base-100 rounded-lg shadow-xl p-6 my-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold flex items-center gap-2">
//           💡 Recent Tips
//         </h2>
//         <span className="badge badge-primary">Community</span>
//       </div>

//       {tips.length === 0 ? (
//         <p className="text-center text-base-content/50 py-8">
//           No tips available yet
//         </p>
//       ) : (
//         <div className="space-y-4">
//           {tips.map((tip, index) => (
//             <div
//               key={tip._id}
//               className="card bg-base-200 hover:bg-base-300 transition-all duration-200"
//             >
//               <div className="card-body p-4 flex justify-between items-start gap-4">
//                 {/* Tip content */}
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg mb-2">
//                     {index + 1}. {tip.title}
//                   </h3>
//                   {tip.description && (
//                     <p className="text-sm text-base-content/70 mb-3">
//                       {tip.description}
//                     </p>
//                   )}
//                   <div className="flex items-center gap-4 text-xs text-base-content/60">
//                     <span>{tip.authorName}</span>
//                     <span>
//                       {new Date(tip.createdAt).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Upvote */}
//                 <div className="flex flex-col items-center gap-1">
//                   <button
//                     className="btn btn-circle btn-sm btn-ghost"
//                     onClick={() => upvoteMutation.mutate(tip._id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-primary"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 15l7-7 7 7"
//                       />
//                     </svg>
//                   </button>
//                   <span className="text-sm font-bold text-primary">
//                     {tip.upvotes}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <button className="btn btn-outline btn-sm">View All Tips →</button>
//       </div>
//     </div>
//   );
// };

// export default RecentTips;
