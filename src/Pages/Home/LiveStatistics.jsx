import React from "react";
import { motion } from "framer-motion";

const LiveStatistics = () => {
  const stats = [
    {
      value: "12,500 kg",
      label: "CO₂ Saved",
      hoverColor: "hover:bg-amber-600",
      icon: "🌍",
    },
    {
      value: "3,200 kg",
      label: "Plastic Reduced",
      hoverColor: "hover:bg-purple-400",
      icon: "♻️",
    },
    {
      value: "1,245+",
      label: "Active Members",
      hoverColor: "hover:bg-green-300",
      icon: "👥",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="grid lg:grid-cols-3 text-center gap-3 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`bg-green-50 py-8 rounded-2xl ${stat.hoverColor} transition-colors duration-300 cursor-pointer relative overflow-hidden`}
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background Icon */}
          <motion.div
            className="absolute top-2 right-2 text-6xl opacity-10"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {stat.icon}
          </motion.div>

          {/* Animated Number */}
          <motion.h3
            className="text-3xl font-bold text-green-700"
            variants={numberVariants}
          >
            {stat.value}
          </motion.h3>

          {/* Label with slide up animation */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.2 }}
            className="mt-2 font-medium"
          >
            {stat.label}
          </motion.p>

          {/* Animated underline */}
          <motion.div
            className="w-0 h-1 bg-green-700 mx-auto mt-2"
            whileHover={{ width: "60%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LiveStatistics;
