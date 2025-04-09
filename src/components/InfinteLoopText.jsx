import { motion } from "framer-motion";

const InfiniteLoopText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-900 py-2">
      <motion.div
        className="text-white text-3xl font-bold absolute whitespace-nowrap"
        animate={{ x: ["-100vw", "100vw"] }} // Moves fully from left to right
        transition={{
          repeat: Infinity,
          duration: 5, // Adjust for speed
          ease: "linear"
        }}
      >
        <span>IOT EV SMART PLUG 🚀</span>
      </motion.div>
    </div>
  );
};

export default InfiniteLoopText;
