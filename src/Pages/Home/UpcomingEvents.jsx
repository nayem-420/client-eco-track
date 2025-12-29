import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const eventsData = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    date: "December 15, 2024",
    time: "9:00 AM - 12:00 PM",
    location: "Cox's Bazar Beach",
    description:
      "Join us for a community beach cleanup to protect marine life and keep our shores clean.",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=500",
    category: "Cleanup",
  },
  {
    id: 2,
    title: "Tree Plantation Campaign",
    date: "December 20, 2024",
    time: "7:00 AM - 11:00 AM",
    location: "Ramna Park, Dhaka",
    description:
      "Plant trees with us and contribute to a greener future for our city and planet for lifestyle tips.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500",
    category: "Plantation",
  },
  {
    id: 3,
    title: "Eco-Friendly Workshop",
    date: "December 25, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "EcoHub Center, Gulshan",
    description:
      "Learn sustainable living practices, DIY eco-products, and zero-waste lifestyle tips.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500",
    category: "Workshop",
  },
  {
    id: 4,
    title: "River Cleaning Initiative",
    date: "January 5, 2025",
    time: "8:00 AM - 1:00 PM",
    location: "Buriganga River, Dhaka",
    description:
      "Help clean our rivers and raise awareness about water pollution and conservation.",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=500",
    category: "Cleanup",
  },
];

const UpcomingEvents = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl font-bold text-green-700 mb-3"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🌿 Upcoming Events
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our eco-friendly events and make a positive impact on the
            environment. Together we can create a sustainable future!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {eventsData.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative h-48 overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {event.category}
                </motion.div>
              </motion.div>

              <div className="p-5">
                <motion.h3
                  className="text-xl font-bold text-gray-800 mb-3 line-clamp-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={
                    isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                  }
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {event.title}
                </motion.h3>

                <motion.div
                  className="space-y-2 mb-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendarAlt className="mr-2 text-green-600" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2 text-green-600" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    {event.location}
                  </div>
                </motion.div>

                <motion.p
                  className="text-sm text-gray-600 mb-4 line-clamp-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {event.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
