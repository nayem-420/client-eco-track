import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaThumbsUp,
  FaUser,
  FaClock,
  FaLeaf,
  FaRegLightbulb,
} from "react-icons/fa";

const tipsData = [
  {
    id: 1,
    title: "Use Reusable Shopping Bags",
    authorName: "Sarah Ahmed",
    upvotes: 245,
    createdAt: "2 hours ago",
    preview:
      "Switch to reusable cloth bags instead of plastic bags. Keep a few in your car so you never forget them at home. One reusable bag can eliminate 1000+ plastic bags over its lifetime!",
    category: "Zero Waste",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    title: "Start Composting Kitchen Waste",
    authorName: "Rakib Hasan",
    upvotes: 189,
    createdAt: "5 hours ago",
    preview:
      "Turn your kitchen scraps into nutrient-rich compost for plants. Use a small compost bin and add fruit peels, vegetable scraps, and coffee grounds. Avoid meat and dairy products.",
    category: "Composting",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    title: "Switch to LED Bulbs",
    authorName: "Nusrat Jahan",
    upvotes: 312,
    createdAt: "1 day ago",
    preview:
      "LED bulbs use 75% less energy than traditional bulbs and last 25 times longer. Replace all your home bulbs gradually. The initial cost pays off within months through electricity savings.",
    category: "Energy Saving",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 4,
    title: "Grow Your Own Herbs",
    authorName: "Fahim Rahman",
    upvotes: 167,
    createdAt: "2 days ago",
    preview:
      "Start a small herb garden on your balcony or windowsill. Mint, basil, and coriander are easy to grow. Fresh herbs reduce packaging waste and add flavor to your meals naturally.",
    category: "Gardening",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 5,
    title: "Carry a Reusable Water Bottle",
    authorName: "Tasnia Khan",
    upvotes: 421,
    createdAt: "3 days ago",
    preview:
      "Invest in a good quality stainless steel water bottle. This simple habit can save hundreds of plastic bottles per year. Keep it filled and with you at all times to avoid buying bottled water.",
    category: "Plastic Free",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
];

const RecentTips = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [upvoted, setUpvoted] = useState([]);

  const handleUpvote = (id) => {
    if (upvoted.includes(id)) {
      setUpvoted(upvoted.filter((tipId) => tipId !== id));
    } else {
      setUpvoted([...upvoted, id]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <FaRegLightbulb className="text-4xl text-yellow-500" />
            <h2 className="text-4xl font-bold text-green-700">
              Recent Community Tips
            </h2>
          </motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover eco-friendly tips shared by our community members. Learn,
            share, and grow together towards a sustainable lifestyle!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {tipsData.map((tip, index) => (
            <motion.div
              key={tip.id}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-green-100"
              variants={cardVariants}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex md:flex-col items-center md:items-start gap-3">
                  <motion.img
                    src={tip.avatar}
                    alt={tip.authorName}
                    className="w-14 h-14 rounded-full border-2 border-green-600"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.button
                    onClick={() => handleUpvote(tip.id)}
                    className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${
                      upvoted.includes(tip.id)
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-600 hover:bg-green-100"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaThumbsUp className="text-lg" />
                    <span className="text-sm font-semibold mt-1">
                      {tip.upvotes + (upvoted.includes(tip.id) ? 1 : 0)}
                    </span>
                  </motion.button>
                </div>

                <div className="flex-1">
                  <motion.span
                    className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full mb-2"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <FaLeaf className="inline mr-1" />
                    {tip.category}
                  </motion.span>

                  <motion.h3
                    className="text-xl font-bold text-gray-800 mb-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={
                      isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }
                    }
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {tip.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-sm mb-3 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {tip.preview}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap items-center gap-4 text-xs text-gray-500"
                    initial={{ y: 10, opacity: 0 }}
                    animate={
                      isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }
                    }
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-1">
                      <FaUser className="text-green-600" />
                      <span className="font-medium">{tip.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-green-600" />
                      <span>{tip.createdAt}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          
        </motion.div>
      </div>
    </section>
  );
};

export default RecentTips;
