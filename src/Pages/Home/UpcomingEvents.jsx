// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../Components/Loading/LoadingSpinner";

// const UpcomingEvents = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: events = [], isLoading } = useQuery({
//     queryKey: ["upcoming-events"],
//     queryFn: async () => {
//       const result = await axiosSecure.get("/events/upcoming");
//       return result.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-10">
//         <LoadingSpinner></LoadingSpinner>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-base-100 rounded-lg shadow-xl p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold flex items-center gap-2">
//            Upcoming Events
//         </h2>
//         <span className="badge badge-secondary">Join Now</span>
//       </div>

//       {events.length === 0 ? (
//         <p className="text-center text-base-content/50 py-8">
//           No upcoming events
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {events.map((event) => (
//             <div
//               key={event._id}
//               className="card bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-lg transition-all duration-200"
//             >
//               <div className="card-body p-4">
//                 <h3 className="card-title text-lg mb-2">{event.title}</h3>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center gap-2 text-base-content/70">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     <span>
//                       {new Date(event.date).toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2 text-base-content/70">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     <span className="truncate">{event.location}</span>
//                   </div>

//                   <p className="text-base-content/60 text-xs leading-relaxed mt-2">
//                     {event.description.length > 80
//                       ? `${event.description.substring(0, 80)}...`
//                       : event.description}
//                   </p>
//                 </div>

//                 <div className="card-actions justify-end mt-4">
//                   <button className="btn btn-primary btn-sm">
//                     Learn More →
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-6 text-center">
//         <button className="btn btn-outline btn-sm">View All Events →</button>
//       </div>
//     </div>
//   );
// };

// export default UpcomingEvents;
